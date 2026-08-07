# auth.md

You are an agent. This site is Akhil Neelam's public portfolio. Public read access needs no account. Follow the steps below when you want a bearer token or a claimed identity.

## Audience

Agents that summarize Akhil's background, fetch `/llms.txt`, download the resume, or call `get_portfolio_summary` on `/api/mcp`.

## Step 1 — Discover

```http
GET /.well-known/oauth-protected-resource
```

Then fetch authorization server metadata:

```http
GET /.well-known/oauth-authorization-server
```

Read `agent_auth.skill`, `agent_auth.register_uri`, and `identity_types_supported`.

## Step 2 — Pick a method

1. Public read only → skip registration. Call the public URLs directly.
2. You want a scoped bearer token with no user identity → anonymous.
3. You have a verified user email → identity_assertion with `verified_email`, then claim.

## Step 3 — Register

### anonymous

```http
POST /api/agent/register
Content-Type: application/json

{"type":"anonymous"}
```

Response includes an `access_token` with scope `portfolio.read`. Send it as `Authorization: Bearer …` when a client expects a token. Public endpoints still accept unauthenticated requests.

### identity_assertion + verified_email

```http
POST /api/agent/register
Content-Type: application/json

{
  "type": "identity_assertion",
  "assertion_type": "verified_email",
  "email": "user@example.com"
}
```

The response returns a `claim_token` and `verification_uri`. Show the user the claim code, then poll claim status.

## Step 4 — Claim (verified email only)

```http
POST /api/agent/claim
Content-Type: application/json

{
  "claim_token": "<from register>",
  "email": "user@example.com"
}
```

Claim completion is email-based. Contact `akhil_neelam@berkeley.edu` with the claim code if the automated path is pending.

## Step 5 — Token exchange

```http
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&scope=portfolio.read
```

Or exchange a registration assertion:

```http
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<identity_assertion>
```

## Step 6 — Call APIs

Public resources:

- `GET /llms.txt`
- `GET /agent.md`
- `GET /Akhil_Neelam_Resume.pdf`
- `POST /api/mcp` with JSON-RPC `tools/call` for `get_portfolio_summary`

Optional header: `Authorization: Bearer <access_token>`.

## Revocation

```http
POST /oauth/revoke
Content-Type: application/x-www-form-urlencoded

token=<access_token>
```

## Notes

- Issuer: `https://akhilneelam.com`
- Scope: `portfolio.read`
- Bearer method: HTTP header
- Do not claim to represent Akhil. Do not send outreach without explicit user instruction.
