import { randomBytes } from "node:crypto";

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        const params = new URLSearchParams(raw);
        resolve(Object.fromEntries(params.entries()));
      }
    });
    req.on("error", reject);
  });
}

function mintPublicToken(prefix) {
  return `${prefix}.${randomBytes(24).toString("base64url")}`;
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    json(res, 204, {});
    return;
  }

  if (req.method !== "POST") {
    json(res, 405, { error: "method_not_allowed" });
    return;
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    json(res, 400, { error: "invalid_request" });
    return;
  }

  const grantType = body.grant_type || "client_credentials";
  const supported = new Set([
    "client_credentials",
    "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "urn:workos:agent-auth:grant-type:claim",
  ]);

  if (!supported.has(grantType)) {
    json(res, 400, {
      error: "unsupported_grant_type",
      error_description: `Supported: ${[...supported].join(", ")}`,
    });
    return;
  }

  if (grantType === "urn:workos:agent-auth:grant-type:claim") {
    json(res, 400, {
      error: "authorization_pending",
      error_description:
        "Claim is still pending. Email akhil_neelam@berkeley.edu with your user_code, then retry.",
    });
    return;
  }

  json(res, 200, {
    access_token: mintPublicToken("portfolio"),
    token_type: "Bearer",
    expires_in: 86400,
    scope: body.scope || "portfolio.read",
    resource: "https://akhilneelam.com/",
  });
}
