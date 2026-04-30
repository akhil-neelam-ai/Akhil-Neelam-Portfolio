import type { Express, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

const agentDiscoveryLinks = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</agent.md>; rel="service-doc"; type="text/markdown"',
  '</llms.txt>; rel="describedby"; type="text/markdown"',
  '</health.json>; rel="status"; type="application/json"',
  '</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
].join(", ");

const serverInfo = {
  name: "Akhil Neelam Portfolio",
  version: "1.0.0",
};

const portfolioTool = {
  name: "get_portfolio_summary",
  description:
    "Return a concise machine-readable summary of Akhil Neelam's portfolio, projects, public links, and contact information.",
  inputSchema: {
    type: "object",
    properties: {
      section: {
        type: "string",
        enum: ["all", "profile", "projects", "contact"],
      },
    },
    additionalProperties: false,
  },
};

function resolvePublicFile(relativePath: string) {
  const candidates = [
    path.resolve(process.cwd(), "client", "public", relativePath),
    path.resolve(process.cwd(), "dist", relativePath),
    path.resolve(process.cwd(), "dist", "public", relativePath),
  ];

  return candidates.find((candidate) => fs.existsSync(candidate));
}

function readPublicText(relativePath: string) {
  const filePath = resolvePublicFile(relativePath);

  if (!filePath) {
    return undefined;
  }

  return fs.readFileSync(filePath, "utf-8");
}

function estimateMarkdownTokens(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return String(Math.ceil(words * 1.25));
}

function sendPublicFile(
  relativePath: string,
  contentType: string,
  res: Response
) {
  const filePath = resolvePublicFile(relativePath);

  if (!filePath) {
    res.status(404).type("text/plain").send(`${relativePath} not found`);
    return;
  }

  res.setHeader("Content-Type", contentType);

  if (contentType.startsWith("text/markdown")) {
    const markdown = fs.readFileSync(filePath, "utf-8");
    res.setHeader("x-markdown-tokens", estimateMarkdownTokens(markdown));
  }

  res.sendFile(filePath);
}

function portfolioSummary() {
  return (
    readPublicText("llms.txt") ||
    "# Akhil Neelam\n\nUC Berkeley Haas MBA candidate, founder, product builder, and technology-for-impact operator.\n"
  );
}

function jsonRpcResponse(id: unknown, result: unknown) {
  return {
    jsonrpc: "2.0",
    id: id ?? null,
    result,
  };
}

function jsonRpcError(id: unknown, code: number, message: string) {
  return {
    jsonrpc: "2.0",
    id: id ?? null,
    error: { code, message },
  };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use((req, res, next) => {
    if (req.path === "/" || req.path === "/index.html") {
      res.setHeader("Link", agentDiscoveryLinks);
    }

    next();
  });

  app.get("/", (req, res, next) => {
    const accept = req.headers.accept?.toLowerCase() || "";

    if (!accept.includes("text/markdown")) {
      next();
      return;
    }

    sendPublicFile("llms.txt", "text/markdown; charset=utf-8", res);
  });

  app.get("/llms.txt", (_req, res) => {
    sendPublicFile("llms.txt", "text/markdown; charset=utf-8", res);
  });

  app.get("/agent.md", (_req, res) => {
    sendPublicFile("agent.md", "text/markdown; charset=utf-8", res);
  });

  app.get("/health.json", (_req, res) => {
    sendPublicFile("health.json", "application/json; charset=utf-8", res);
  });

  app.get("/.well-known/api-catalog", (_req, res) => {
    sendPublicFile(
      ".well-known/api-catalog",
      'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
      res
    );
  });

  app.get("/api/mcp", (_req, res) => {
    res.json({
      serverInfo,
      capabilities: {
        tools: {},
        resources: {},
      },
      tools: [portfolioTool],
    });
  });

  app.post("/api/mcp", (req, res) => {
    const body = typeof req.body === "object" && req.body ? req.body : {};
    const id = body.id ?? null;

    switch (body.method) {
      case "initialize":
        res.json(
          jsonRpcResponse(id, {
            protocolVersion: "2025-03-26",
            capabilities: {
              tools: {},
              resources: {},
            },
            serverInfo,
          })
        );
        return;
      case "tools/list":
        res.json(jsonRpcResponse(id, { tools: [portfolioTool] }));
        return;
      case "tools/call":
        if (body.params?.name !== "get_portfolio_summary") {
          res.json(jsonRpcError(id, -32602, "Unknown tool"));
          return;
        }

        res.json(
          jsonRpcResponse(id, {
            content: [
              {
                type: "text",
                text: portfolioSummary(),
              },
            ],
            isError: false,
          })
        );
        return;
      case "resources/list":
        res.json(
          jsonRpcResponse(id, {
            resources: [
              {
                uri: "https://akhilneelam.com/llms.txt",
                name: "Portfolio summary",
                mimeType: "text/markdown",
              },
              {
                uri: "https://akhilneelam.com/agent.md",
                name: "Agent guide",
                mimeType: "text/markdown",
              },
            ],
          })
        );
        return;
      case "resources/read":
        res.json(
          jsonRpcResponse(id, {
            contents: [
              {
                uri: body.params?.uri || "https://akhilneelam.com/llms.txt",
                mimeType: "text/markdown",
                text: portfolioSummary(),
              },
            ],
          })
        );
        return;
      default:
        res.status(400).json(jsonRpcError(id, -32601, "Method not found"));
    }
  });

  // Resume download endpoint
  app.get("/api/resume", (req, res) => {
    const resumePath = path.resolve(
      process.cwd(),
      "attached_assets",
      "Akhil_Neelam_Resume_1768006822069.pdf"
    );

    if (fs.existsSync(resumePath)) {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=Akhil_Neelam_Resume.pdf"
      );
      const fileStream = fs.createReadStream(resumePath);
      fileStream.pipe(res);
    } else {
      res.status(404).json({ message: "Resume not found" });
    }
  });

  return httpServer;
}
