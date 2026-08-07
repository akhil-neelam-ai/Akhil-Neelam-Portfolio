import { next } from "@vercel/functions";
import { portfolioSummary } from "./api/llms-content.js";

const agentDiscoveryLink = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</agent.md>; rel="service-doc"; type="text/markdown"',
  '</auth.md>; rel="service-doc"; type="text/markdown"',
  '</llms.txt>; rel="describedby"; type="text/markdown"',
  '</health.json>; rel="status"; type="application/json"',
  '</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"; type="application/json"',
  '</.well-known/oauth-authorization-server>; rel="oauth-authorization-server"; type="application/json"',
].join(", ");

function estimateMarkdownTokens(markdown) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return String(Math.ceil(words * 1.25));
}

export const config = {
  matcher: "/",
};

export default async function middleware(request) {
  const accept = request.headers.get("accept")?.toLowerCase() || "";

  if (accept.includes("text/markdown")) {
    return new Response(portfolioSummary, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "Content-Type": "text/markdown; charset=utf-8",
        "x-markdown-tokens": estimateMarkdownTokens(portfolioSummary),
        Link: agentDiscoveryLink,
      },
    });
  }

  return next({
    headers: {
      Link: agentDiscoveryLink,
    },
  });
}
