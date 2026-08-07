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

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    json(res, 204, {});
    return;
  }

  if (req.method === "GET") {
    const url = new URL(req.url, "https://akhilneelam.com");
    const userCode = url.searchParams.get("user_code");
    json(res, 200, {
      claim_uri: "https://akhilneelam.com/api/agent/claim",
      user_code: userCode,
      instructions:
        "POST claim_token and email to complete. Or email akhil_neelam@berkeley.edu with your user_code.",
      contact: "akhil_neelam@berkeley.edu",
    });
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

  const claimToken = body.claim_token || body.claimToken;
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!claimToken) {
    json(res, 400, {
      error: "invalid_request",
      error_description: "claim_token is required",
    });
    return;
  }

  json(res, 200, {
    status: "authorization_pending",
    claim_token: claimToken,
    email: email || null,
    message:
      "Claim received. Email akhil_neelam@berkeley.edu with your user_code to finish ownership. Public portfolio.read access remains available without claim.",
    poll_interval: 5,
  });
}
