# Cognite Labs — IDBI Innovate 2026 Solution Suite

Five production-minded, AWS-native solutions for IDBI Bank, built for **IDBI Innovate 2026**.
Each is explainable-by-design, human-in-the-loop, and aligned to RBI / SEBI / IRDAI / DPDP.

**Team Lead:** Aditya Tayal · **Team:** Cognite Labs

> This is a single React web suite hosting working prototypes for all five problem statements.
> Each product has its own route and can be demoed independently.

| # | Product | Problem Statement | Route |
|---|---------|-------------------|-------|
| 01 | **Sahayak** | Digital Wealth Management (AI Avatar) | `/sahayak` |
| 02 | **LeadSense** | Prospect Assist AI (Lead Generation) | `/leadsense` |
| 03 | **UdyamScore** | MSME Financial Health Card | `/udyamscore` |
| 04 | **Prahari** | 12-Month Default Early-Warning System | `/prahari` |
| 05 | **Sanchay** | Agentic Back-Office Reconciliation (Open Track) | `/sanchay` |

## What each product does

- **Sahayak** — Avatar-based (voice+text), multilingual, goal-based wealth advisory inside the mobile app. Hybrid: AI advises on vanilla products; regulated/complex cases become qualified leads for human RMs.
- **LeadSense** — Scores every prospect on **Intent × Repayment Capacity** from transaction behaviour, turning ~1% conversion into a >30% quality-first RM queue.
- **UdyamScore** — Aggregates GST, UPI, Account Aggregator, EPFO and utility data into a multidimensional, explainable MSME health score with RAG verdict. ULI/OCEN/AA-ready.
- **Prahari** — Predicts probability of default **12 months in advance** with proper imbalanced-data metrics (AUC/Recall/KS) and RAG risk buckets in the loan officer's language.
- **Sanchay** — Agentic reconciliation copilot: auto-matches Nostro/suspense/GL entries, explains exceptions, drafts resolutions, keeps maker-checker control + immutable audit.

## Tech stack

- **Frontend:** React 19 + Vite + Recharts, custom IDBI-themed design system
- **Target production stack:** AWS (Bedrock, SageMaker, ECS/Fargate, Lambda, API Gateway, S3, Glue, RDS), integrating Account Aggregator, GSTN, ULI/OCEN
- All prototypes use synthetic/mock data. No real customer data is used.

## Run locally

```bash
npm install
npm run dev      # dev server
npm run build    # production build
npm run preview  # serve the build
```

## Deploy

The suite is a static SPA — deploy `dist/` to any static host (Vercel, Netlify, AWS S3+CloudFront, GitHub Pages).

## Note on data & compliance

Every screen is powered by synthetic data for demonstration. Production deployment assumes
consent-based data access (AA / DPDP), human-in-the-loop decisioning, and RBI-aligned model governance.

---
Built for IDBI Innovate 2026 · Powered by AWS · Platform by Hack2Skill
