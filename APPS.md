# FinFabric — Live Product Sites

Each product is a standalone, deployable web app with a real computation engine (no hardcoded results).

| Product | Problem Statement | Live URL | Engine |
|---------|-------------------|----------|--------|
| UdyamScore | PS-03 MSME Health | https://finfabric-udyamscore.vercel.app | Weighted 6-dimension scoring, live what-if |
| Sahayak | PS-01 Wealth | https://finfabric-sahayak.vercel.app | Live MF NAVs (mfapi.in) + SIP/goal math |
| LeadSense | PS-02 Lead Gen | https://finfabric-leadsense.vercel.app | Intent + Capacity dual model |
| Prahari | PS-04 Default | https://finfabric-prahari.vercel.app | Logistic 12-month PD model |
| Sanchay | PS-05 Open | https://finfabric-sanchay.vercel.app | Fuzzy ledger matching engine |

Source for each app: `apps/<name>/` (index.html + engine.js + style.css). Pure static, deploy to any host.
The older single-suite prototype remains in `src/` (React SPA).
