import { randomBytes } from "node:crypto";

const PUBLIC_SCOPE = "portfolio.read";

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
        reject(new Error("Invalid JSON body"));
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
    json(res, 400, { error: "invalid_request", error_description: "JSON body required" });
    return;
  }

  const type = body.type || "anonymous";

  if (type === "anonymous") {
    const accessToken = mintPublicToken("portfolio-anon");
    json(res, 200, {
      type: "anonymous",
      access_token: accessToken,
      token_type: "Bearer",
      expires_in: 86400,
      scope: PUBLIC_SCOPE,
      resource: "https://akhilneelam.com/",
      note: "Public portfolio endpoints also accept unauthenticated requests.",
    });
    return;
  }

  if (type === "identity_assertion") {
    const assertionType = body.assertion_type || "verified_email";
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (assertionType !== "verified_email") {
      json(res, 400, {
        error: "unsupported_assertion_type",
        error_description: "Only verified_email is supported on this portfolio.",
      });
      return;
    }

    if (!email || !email.includes("@")) {
      json(res, 400, {
        error: "invalid_request",
        error_description: "email is required for verified_email registration.",
      });
      return;
    }

    const claimToken = mintPublicToken("portfolio-claim");
    const userCode = claimToken.slice(-8).toUpperCase();

    json(res, 200, {
      type: "identity_assertion",
      assertion_type: "verified_email",
      claim_token: claimToken,
      user_code: userCode,
      verification_uri: "https://akhilneelam.com/api/agent/claim",
      verification_uri_complete: `https://akhilneelam.com/api/agent/claim?user_code=${userCode}`,
      expires_in: 3600,
      interval: 5,
      claim_instructions:
        "Email akhil_neelam@berkeley.edu with the user_code to complete claim, or POST /api/agent/claim.",
      scope: PUBLIC_SCOPE,
    });
    return;
  }

  json(res, 400, {
    error: "unsupported_identity_type",
    error_description: "Supported types: anonymous, identity_assertion",
  });
}
