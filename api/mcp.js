import { readFileSync } from "fs";
import { join } from "path";
import { portfolioSummary } from "./llms-content.js";

const MAX_URI_LENGTH = 512;

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

function jsonRpcResponse(id, result) {
  return {
    jsonrpc: "2.0",
    id: id ?? null,
    result,
  };
}

function jsonRpcError(id, code, message) {
  return {
    jsonrpc: "2.0",
    id: id ?? null,
    error: { code, message },
  };
}

function toolError(id, message) {
  return jsonRpcResponse(id, {
    content: [{ type: "text", text: message }],
    isError: true,
  });
}

function readResource(uri) {
  const safeUri = typeof uri === "string" ? uri.slice(0, MAX_URI_LENGTH) : "";
  if (safeUri.includes("agent.md")) {
    const agentPath = join(process.cwd(), "client/public/agent.md");
    return { uri: safeUri, mimeType: "text/markdown", text: readFileSync(agentPath, "utf8") };
  }
  return {
    uri: safeUri || "https://akhilneelam.com/llms.txt",
    mimeType: "text/markdown",
    text: portfolioSummary,
  };
}

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, MCP-Protocol-Version");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("MCP-Protocol-Version", "2025-03-26");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method === "GET") {
    res.status(200).json({
      serverInfo,
      capabilities: {
        tools: {},
        resources: {},
      },
      tools: [portfolioTool],
    });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let body = {};
  try {
    body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : typeof req.body === "object" && req.body
          ? req.body
          : {};
  } catch (_error) {
    res.status(400).json(jsonRpcError(null, -32700, "Parse error"));
    return;
  }
  const id = body.id ?? null;

  switch (body.method) {
    case "initialize":
      res.status(200).json(
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
      res.status(200).json(jsonRpcResponse(id, { tools: [portfolioTool] }));
      return;
    case "tools/call":
      if (body.params?.name !== "get_portfolio_summary") {
        res.status(200).json(toolError(id, `Unknown tool: ${body.params?.name ?? "undefined"}`));
        return;
      }

      res.status(200).json(
        jsonRpcResponse(id, {
          content: [{ type: "text", text: portfolioSummary }],
          isError: false,
        })
      );
      return;
    case "resources/list":
      res.status(200).json(
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
    case "resources/read": {
      const uri = body.params?.uri;
      if (typeof uri !== "string" || uri.length > MAX_URI_LENGTH) {
        res.status(200).json(toolError(id, "Invalid or missing resource URI"));
        return;
      }
      res.status(200).json(
        jsonRpcResponse(id, {
          contents: [readResource(uri)],
        })
      );
      return;
    }
    default:
      res.status(400).json(jsonRpcError(id, -32601, "Method not found"));
  }
}
