# DNS-AID for akhilneelam.com

Publish these custom DNS records in Squarespace Domains → **DNS** → **Custom records**.

Nameservers today: `ns-cloud-a1`–`a4.googledomains.com`.

## Records

| Type | Host | Data |
|------|------|------|
| HTTPS | `_index._agents` | `1 akhilneelam.com. alpn="h2,h3" port=443` |
| SVCB | `_index._agents` | `1 akhilneelam.com. alpn="h2,h3" port=443 mandatory=alpn,port` |
| HTTPS | `_mcp._agents` | `1 akhilneelam.com. alpn="h2,h3" port=443` |
| SVCB | `_mcp._agents` | `1 akhilneelam.com. alpn="h2,h3" port=443 mandatory=alpn,port` |
| TXT | `_index._agents` | `agents=portfolio:mcp` |

BIND zone file: `dns-aid.zone`.

## DNSSEC

Confirm DNSSEC is on for the domain in Squarespace. Validating resolvers should return a `DNSKEY` for `akhilneelam.com` after enablement.

## Verify

```bash
dig HTTPS _index._agents.akhilneelam.com +short
dig SVCB _mcp._agents.akhilneelam.com +short
dig DNSKEY akhilneelam.com +dnssec
```

Or rescan: `POST https://isitagentready.com/api/scan` with `{"url":"https://akhilneelam.com"}` and check `checks.discoverability.dnsAid.status`.
