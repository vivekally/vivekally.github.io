import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Shell from "./components/Shell";
import Setup from "./pages/p1/Setup";
import Skills from "./pages/p1/Skills";
import Runner from "./pages/p1/Runner";
import Health from "./pages/p1/Health";
import Branding from "./pages/p1/Branding";
import Dashboard from "./pages/p2/Dashboard";
import Ask from "./pages/p2/Ask";
import Graph from "./pages/p2/Graph";
import Ingest from "./pages/p2/Ingest";
import Org from "./pages/p3/Org";
import CompanyBrain from "./pages/p3/CompanyBrain";
import Impact from "./pages/p3/Impact";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<Shell />}>
        <Route path="/phase-1" element={<Navigate to="/phase-1/setup" replace />} />
        <Route path="/phase-1/setup" element={<Setup />} />
        <Route path="/phase-1/skills" element={<Skills />} />
        <Route path="/phase-1/runner" element={<Runner />} />
        <Route path="/phase-1/health" element={<Health />} />
        <Route path="/phase-1/branding" element={<Branding />} />
        <Route path="/phase-2" element={<Navigate to="/phase-2/dashboard" replace />} />
        <Route path="/phase-2/dashboard" element={<Dashboard />} />
        <Route path="/phase-2/ask" element={<Ask />} />
        <Route path="/phase-2/graph" element={<Graph />} />
        <Route path="/phase-2/ingest" element={<Ingest />} />
        <Route path="/phase-3" element={<Navigate to="/phase-3/org" replace />} />
        <Route path="/phase-3/org" element={<Org />} />
        <Route path="/phase-3/company-brain" element={<CompanyBrain />} />
        <Route path="/phase-3/impact" element={<Impact />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
