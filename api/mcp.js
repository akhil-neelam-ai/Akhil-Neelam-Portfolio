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

const portfolioSummary = `# Akhil Neelam

> UC Berkeley Haas MBA candidate, founder, product builder, and technology-for-impact operator.

Akhil Neelam is a full-time MBA student at the UC Berkeley Haas School of Business pursuing product management and product marketing roles in technology. His work spans AI products, public-sector technology, education technology, civic engagement, and gender equality.

Featured work includes AI-powered census automation at Uniblox, the Women Politicians Repository with CGAP and J.P. Morgan, a WhatsApp learning bot supporting learning continuity during COVID-19, and an AI-based learning solution pilot with the Government of Andhra Pradesh.

Side projects include Daily Newsletter Briefing via Alexa, CalEvents Discovery, MirrorMe virtual try-on, starred, and Write Like a Human.

Public links:
- Website: https://akhilneelam.com/
- Resume: https://akhilneelam.com/Akhil_Neelam_Resume.pdf
- LinkedIn: https://linkedin.com/in/akhilneelam
- GitHub: https://github.com/akhil-neelam-ai
- Email: akhil_neelam@berkeley.edu
`;

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
        res.status(200).json(jsonRpcError(id, -32602, "Unknown tool"));
        return;
      }

      res.status(200).json(
        jsonRpcResponse(id, {
          content: [
            {
              type: "text",
              text: portfolioSummary,
            },
          ],
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
    case "resources/read":
      res.status(200).json(
        jsonRpcResponse(id, {
          contents: [
            {
              uri: body.params?.uri || "https://akhilneelam.com/llms.txt",
              mimeType: "text/markdown",
              text: portfolioSummary,
            },
          ],
        })
      );
      return;
    default:
      res.status(400).json(jsonRpcError(id, -32601, "Method not found"));
  }
}
