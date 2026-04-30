import { next } from "@vercel/functions";

const agentDiscoveryLink = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</agent.md>; rel="service-doc"; type="text/markdown"',
  '</llms.txt>; rel="describedby"; type="text/markdown"',
  '</health.json>; rel="status"; type="application/json"',
  '</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
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
    const llmsUrl = new URL("/llms.txt", request.url);
    const response = await fetch(llmsUrl, {
      headers: { Accept: "text/markdown" },
    });
    const text = await response.text();

    return new Response(text, {
      status: response.ok ? 200 : response.status,
      headers: {
        "Cache-Control": "public, max-age=0, must-revalidate",
        "Content-Type": "text/markdown; charset=utf-8",
        "x-markdown-tokens": estimateMarkdownTokens(text),
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
