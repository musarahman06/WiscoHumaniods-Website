import React from "react";
import { useState } from "react";
import { PageIntro, Join } from "../components/Layout";
import { teams, DISCORD } from "../data";
import { teamModel } from "../landingSystems";
import RobotViewer from "../components/RobotViewer";
export default function Subteams() {
  const [filter, setFilter] = useState("All");
  const [previewId, setPreviewId] = useState(teams[0].id);
  const previewTeam = teams.find((team) => team.id === previewId);
  const showModel = (id) => {
    setPreviewId(id);
    document
      .getElementById("team-models")
      .scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
  };
  const categories = ["All", "Hardware", "Software", "Support"];
  return (
    <>
      <PageIntro
        number="02"
        label="Subteams"
        title={
          <>
            Eight teams.
            <br />
            <em>One robot.</em>
          </>
        }
      >
        <p>
          Every part of the humanoid is built by a dedicated subteam. Find yours
          — whether you want to machine metal, train vision models, or run the
          show.
        </p>
        <p className="eyebrow">No experience required. We teach everything.</p>
      </PageIntro>
      <section className="section team-model-showcase" id="team-models">
        <div className="team-model-view">
          <RobotViewer active={teamModel[previewId]} />
        </div>
        <div className="team-model-copy">
          <p className="eyebrow">Explore the original 3D scenes</p>
          <h2>{previewTeam.name}</h2>
          <p className="lead">{previewTeam.description}</p>
          <div
            className="team-model-selectors"
            aria-label="Select a team model"
          >
            {teams.map((team) => (
              <button
                key={team.id}
                aria-pressed={previewId === team.id}
                onClick={() => showModel(team.id)}
              >
                {team.name}
              </button>
            ))}
          </div>
          <p className="content-note">
            Original robot and procedural scenes recovered from the club
            website. Manipulation shares the original arms and hands model.
          </p>
        </div>
      </section>
      <section className="section directory">
        <div className="filter-bar" aria-label="Filter subteams">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
            >
              {c}{" "}
              <span>
                {c === "All"
                  ? teams.length
                  : teams.filter((t) => t.category === c.toUpperCase()).length}
              </span>
            </button>
          ))}
          <span className="eyebrow" role="status">
            {filter === "All"
              ? 8
              : teams.filter((t) => t.category === filter.toUpperCase())
                  .length}{" "}
            teams
          </span>
        </div>
        <div className="team-grid">
          {teams
            .filter(
              (t) => filter === "All" || t.category === filter.toUpperCase(),
            )
            .map((t) => (
              <article className="team-card" id={t.id} key={t.id}>
                <div className="card-meta">
                  <span className="eyebrow">{t.number}</span>
                  <span className="eyebrow">{t.category}</span>
                </div>
                <h2>{t.name}</h2>
                <p>{t.description}</p>
                <div className="tags">
                  {t.skills.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <button
                  className="team-model-link"
                  onClick={() => showModel(t.id)}
                >
                  View 3D system ↗
                </button>
                <a
                  className="text-link"
                  href={DISCORD}
                  target="_blank"
                  rel="noreferrer"
                >
                  Join {t.name} <span>↗</span>
                </a>
              </article>
            ))}
        </div>
      </section>
      <Join
        title={
          <>
            Not sure where you fit?
            <br />
            <em>Join anyway.</em>
          </>
        }
        text="Most members switch teams as they learn. Join the Discord, meet everyone, and find your fit."
      />
    </>
  );
}
