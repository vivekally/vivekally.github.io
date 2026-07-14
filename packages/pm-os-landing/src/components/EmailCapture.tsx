import { useState } from "react";
import { CONTACT_EMAIL, EMAIL_SIGNUP_ENDPOINT } from "../config";

type Status = "idle" | "sending" | "done" | "error";

// Research-preview email capture. Posts to EMAIL_SIGNUP_ENDPOINT when
// configured (Formspree/Buttondown-compatible form encoding); until then it
// falls back to a pre-filled mailto: draft so no signup is lost.
export default function EmailCapture({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || !value.includes("@")) return;
    if (!EMAIL_SIGNUP_ENDPOINT) {
      const subject = encodeURIComponent("PM OS research preview");
      const body = encodeURIComponent(`Please add me to the PM OS research preview: ${value}`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setStatus("done");
      return;
    }
    try {
      setStatus("sending");
      const res = await fetch(EMAIL_SIGNUP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
        body: new URLSearchParams({ email: value }).toString(),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="email-done" role="status">
        ✓ You're on the list — the guided brain-building interview ships to the preview cohort first.
      </div>
    );
  }

  return (
    <form className={`email-form${compact ? " compact" : ""}`} onSubmit={submit}>
      <input
        type="email"
        required
        placeholder="you@company.com"
        aria-label="Work email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "Joining…" : "Join the research preview"}
      </button>
      {status === "error" && (
        <div className="email-error" role="alert">
          Something hiccuped — email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> instead.
        </div>
      )}
    </form>
  );
}
