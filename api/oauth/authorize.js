function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

export default function handler(req, res) {
  if (req.method === "OPTIONS") {
    json(res, 204, {});
    return;
  }

  // Public portfolio: implicit public client, no interactive consent UI.
  json(res, 200, {
    issuer: "https://akhilneelam.com",
    authorization_endpoint: "https://akhilneelam.com/oauth/authorize",
    message:
      "This portfolio issues public portfolio.read tokens via /oauth/token or /api/agent/register. No interactive consent page is required for public read access.",
    token_endpoint: "https://akhilneelam.com/oauth/token",
    documentation: "https://akhilneelam.com/auth.md",
  });
}
