import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Layout } from "./Shared";
import { PRODUCTS, Icons, BRAND } from "./brand";
import logoUrl from "./assets/finfabric_logo.png";
import UdyamScore from "./products/UdyamScore";
import Sahayak from "./products/Sahayak";
import LeadSense from "./products/LeadSense";
import Prahari from "./products/Prahari";
import Sanchay from "./products/Sanchay";

const ORDER = ["udyamscore", "sahayak", "leadsense", "prahari", "sanchay"];
const DESC = {
  udyamscore: "AI-driven MSME Financial Health Card. Aggregates GST, UPI, Account Aggregator, EPFO and utility data into a multidimensional, explainable credit health score for credit-invisible MSMEs.",
  sahayak: "AI avatar wealth companion inside the bank's mobile app. Goal-based, multilingual, hybrid advisory with a warm hand-off to human Relationship Managers for regulated products.",
  leadsense: "Prospect Assist AI. Scores every lead on Intent and Repayment Capacity from transaction behaviour, turning roughly 1% conversion into high-quality, RM-ready leads above 30%.",
  prahari: "12-month default early-warning system. Predicts probability of default with proper imbalanced-data metrics and RAG risk buckets in the loan officer's language.",
  sanchay: "Agentic back-office reconciliation and exception copilot. Auto-matches entries, explains exceptions, drafts resolutions with maker-checker control and a full audit trail.",
};

function Home() {
  const nav = useNavigate();
  return (
    <Layout>
      <div className="topbar">
        <div><div className="crumb">{BRAND.suite.name}</div><h2>IDBI Innovate 2026 Solution Suite</h2></div>
        <span className="pill">5 Products</span>
      </div>
      <div className="wrap">
        <div className="home-hero">
          <img src={logoUrl} alt="FinFabric" style={{ height: 46, marginBottom: 18, filter: "brightness(0) invert(1)" }} />
          <h1>Build. Integrate. Transform.</h1>
          <p>Five production-minded, AWS-native solutions for IDBI Bank. Each is explainable by design,
             human-in-the-loop, and aligned to RBI, SEBI and DPDP. One suite, one integration story.</p>
          <div style={{ marginTop: 18 }}>
            {["AWS-native", "Explainable AI", "Human-in-the-loop", "ULI · OCEN · AA ready", "DPDP-compliant"].map(c => (
              <span key={c} className="chip">{c}</span>
            ))}
          </div>
        </div>
        <div className="grid g3" style={{ marginTop: 24 }}>
          {ORDER.map((k) => {
            const p = PRODUCTS[k];
            return (
              <div key={k} className="prod-card" style={{ borderTopColor: p.accent }} onClick={() => nav("/" + k)}>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 10 }}>
                  <div className="iconbox" style={{ background: p.accent }}>{Icons[k]({ size: 20 })}</div>
                  <div>
                    <div className="pt" style={{ color: p.accent }}>{p.ps}</div>
                    <h3 style={{ margin: 0 }}>{p.name}</h3>
                  </div>
                </div>
                <p>{DESC[k]}</p>
                <button className="btn ghost" style={{ marginTop: 14, background: p.soft, color: p.accent }}>Open prototype</button>
              </div>
            );
          })}
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
        <Route path="/udyamscore" element={<Layout active="udyamscore"><UdyamScore /></Layout>} />
        <Route path="/sahayak" element={<Layout active="sahayak"><Sahayak /></Layout>} />
        <Route path="/leadsense" element={<Layout active="leadsense"><LeadSense /></Layout>} />
        <Route path="/prahari" element={<Layout active="prahari"><Prahari /></Layout>} />
        <Route path="/sanchay" element={<Layout active="sanchay"><Sanchay /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
