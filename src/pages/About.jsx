import React from "react";
import { PageIntro, Join } from "../components/Layout";
import { roadmap } from "../data";
export default function About() {
  return (
    <>
      <PageIntro
        number="03"
        label="About us"
        title={
          <>
            An ambitious idea.
            <br />
            <em>A very human team.</em>
          </>
        }
      >
        <p>
          Founded in October 2025, WiscoHumanoids brings UW–Madison students
          together to build a humanoid robot from scratch — from mechanical
          structure to control systems and perception.
        </p>
      </PageIntro>
      <section className="section principles">
        <div>
          <p className="eyebrow">How we build</p>
          <h2>
            Curiosity first.
            <br />
            <em>Engineering always.</em>
          </h2>
        </div>
        <div>
          {[
            [
              "01",
              "From scratch",
              "No kits. No shortcuts. We design and build the components ourselves, connecting mechanical structure, control systems, and perception.",
            ],
            [
              "02",
              "Learn by building",
              "Any major. No experience required. The club teaches skills from CAD to controls through hands-on work.",
            ],
            [
              "03",
              "Better together",
              "Eight dedicated subteams tackle different parts of one shared challenge. Hardware, software, and operations make the whole possible.",
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
        </div>
      </section>
      <section className="section roadmap">
        <p className="eyebrow">The published first-year plan</p>
        <h2>
          From concept
          <br />
          <em>to autonomy.</em>
        </h2>
        <p className="content-note">
          These dates and milestones are preserved from the original site.
          Completion has not been confirmed; they describe the plan, not
          verified outcomes.
        </p>
        {roadmap.map((p) => (
          <article className="roadmap-phase" key={p.phase}>
            <div>
              <p className="eyebrow">
                {p.phase} / {p.months}
              </p>
              <p>{p.period}</p>
            </div>
            <div>
              <h3>{p.title}</h3>
              <ul>
                {p.milestones.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
      <Join />
    </>
  );
}
