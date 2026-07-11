import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Layout, Topbar } from "./Shared";
import UdyamScore from "./products/UdyamScore";
import Sahayak from "./products/Sahayak";
import LeadSense from "./products/LeadSense";
import Prahari from "./products/Prahari";
import Sanchay from "./products/Sanchay";

const PRODUCTS = [
  { to: "/udyamscore", tag: "PROBLEM STATEMENT 03", name: "UdyamScore", desc: "AI-driven MSME Financial Health Card. Aggregates GST, UPI, Account Aggregator, EPFO and utility data into a multidimensional, explainable credit health score for credit-invisible MSMEs." },
  { to: "/sahayak", tag: "PROBLEM STATEMENT 01", name: "Sahayak", desc: "AI avatar wealth companion inside the bank's mobile app. Goal-based, multilingual, hybrid advisory with warm hand-off to human Relationship Managers for regulated products." },
  { to: "/leadsense", tag: "PROBLEM STATEMENT 02", name: "LeadSense", desc: "Prospect Assist AI. Scores every lead on Intent × Repayment Capacity from transaction behaviour — turning ~1% conversion into high-quality, RM-ready leads above 30%." },
  { to: "/prahari", tag: "PROBLEM STATEMENT 04", name: "Prahari", desc: "12-month default early-warning system. Predicts probability of default with proper imbalanced-data metrics and RAG risk buckets in the loan officer's language." },
  { to: "/sanchay", tag: "OPEN TRACK 05", name: "Sanchay", desc: "Agentic back-office reconciliation & exception copilot. Auto-matches entries, explains exceptions, drafts resolutions with maker-checker control and full audit trail." },
];

function Home() {
  const nav = useNavigate();
  return (
    <Layout>
      <Topbar crumb="Cognite Labs" title="IDBI Innovate 2026 — Solution Suite" pill="5 Products" />
      <div className="wrap">
        <div className="home-hero">
          <h1>Build. Integrate. Transform.</h1>
          <p>Five production-minded, AWS-native solutions for IDBI Bank — each explainable-by-design,
             human-in-the-loop, and aligned to RBI / SEBI / DPDP. One suite, one integration story.</p>
          <div style={{ marginTop: 18 }}>
            <span className="chip">AWS-native</span>
            <span className="chip">Explainable AI</span>
            <span className="chip">Human-in-the-loop</span>
            <span className="chip">ULI · OCEN · AA ready</span>
            <span className="chip">DPDP-compliant</span>
          </div>
        </div>
        <div className="grid g3" style={{ marginTop: 24 }}>
          {PRODUCTS.map((p) => (
            <div key={p.to} className="prod-card" onClick={() => nav(p.to)}>
              <div className="pt">{p.tag}</div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <button className="btn ghost" style={{ marginTop: 14 }}>Open prototype →</button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/udyamscore" element={<Layout><UdyamScore /></Layout>} />
        <Route path="/sahayak" element={<Layout><Sahayak /></Layout>} />
        <Route path="/leadsense" element={<Layout><LeadSense /></Layout>} />
        <Route path="/prahari" element={<Layout><Prahari /></Layout>} />
        <Route path="/sanchay" element={<Layout><Sanchay /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
