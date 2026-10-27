import React from "react";
import { useState } from "react";
import { PageIntro } from "../components/Layout";
import { EMAIL, ORG_ID, sponsors } from "../data";
const inquiry = `mailto:${EMAIL}?subject=Sponsorship%20Inquiry%20-%20WiscoHumanoids`;
export default function Sponsors() {
  const [copy, setCopy] = useState("Copy ID");
  async function copyID() {
    try {
      await navigator.clipboard.writeText(ORG_ID);
      setCopy("Copied ✓");
    } catch {
      setCopy("Select and copy: 35538");
    }
  }
  return (
    <>
      <PageIntro
        number="04"
        label="Sponsors & partners"
        title={
          <>
            Big ideas need
            <br />
            <em>good company.</em>
          </>
        }
      >
        <p>
          Engineering the next frontier of robotics requires resources,
          facilities, and strong partnerships. Help support the hardware,
          compute, and students behind the build.
        </p>
        <a className="button" href={inquiry}>
          Become a sponsor <span>↗</span>
        </a>
      </PageIntro>
      <section className="section sponsor-section">
        <p className="eyebrow">Our community of support</p>
        <h2>
          Current <em>sponsors.</em>
        </h2>
        <div className="sponsor-grid">
          {sponsors.map((s) => (
            <article key={s.name}>
              {s.crest ? (
                <span className="uw-mark" aria-hidden="true">
                  W
                </span>
              ) : (
                <span className="partner-mark" aria-hidden="true">
                  ✳
                </span>
              )}
              <h3>{s.name}</h3>
              {s.sub && <p className="eyebrow">{s.sub}</p>}
            </article>
          ))}
        </div>
        <p className="content-note">
          Sponsor names retained from the original club website.
        </p>
      </section>
      <section className="section sponsor-how">
        <div>
          <p className="eyebrow">How to sponsor</p>
          <h2>
            Support the
            <br />
            <em>next step.</em>
          </h2>
          <div className="org-card">
            <span className="eyebrow">Organization ID</span>
            <strong>{ORG_ID}</strong>
            <button onClick={copyID}>{copy}</button>
            <span className="sr-only" role="status">
              {copy === "Copied ✓"
                ? "Organization ID copied"
                : copy === "Copy ID"
                  ? ""
                  : copy}
            </span>
          </div>
        </div>
        <div>
          {[
            [
              "01",
              "Start a conversation",
              "Email the club with what you’d like your support to fund. Ask for the current sponsorship tiers, benefits, and paperwork.",
            ],
            [
              "02",
              "Reference organization 35538",
              "Include the organization ID on sponsorship correspondence so the university can route support to WiscoHumanoids.",
            ],
            [
              "03",
              "Use the university process",
              "The club’s original site says sponsorships are processed through UW–Madison. Contact the team for the appropriate form and current instructions.",
            ],
          ].map(([n, t, p]) => (
            <article className="rule-row" key={n}>
              <span className="eyebrow">{n}</span>
              <div>
                <h3>{t}</h3>
                <p>{p}</p>
              </div>
            </article>
          ))}
          <div className="tier-note">
            <h3>Sponsorship tiers</h3>
            <p>
              The original site did not publish tier amounts or benefits. Email
              the team for current options and recognition details.
            </p>
            <a className="text-link" href={inquiry}>
              Request sponsorship options ↗
            </a>
          </div>
        </div>
      </section>
      <section className="section sponsor-cta">
        <p className="eyebrow">Let’s build something together</p>
        <h2>
          A partnership with
          <br />
          <em>possibility.</em>
        </h2>
        <a className="button" href={inquiry}>
          Reach out <span>↗</span>
        </a>
        <a className="text-link" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </section>
    </>
  );
}
