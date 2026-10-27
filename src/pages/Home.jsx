import React from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import RobotViewer from "../components/RobotViewer";
import { Join } from "../components/Layout";
import { DISCORD } from "../data";
import { landingSystems as systems } from "../landingSystems";
export default function Home() {
  const [active, setActive] = useState("assembled");
  const story = useRef(null);
  useEffect(() => {
    const sections = [
      ...story.current.querySelectorAll("article[data-system]"),
    ];
    let frame;
    const update = () => {
      frame = undefined;
      const center = innerHeight * (innerWidth <= 760 ? 0.7 : 0.5);
      if (story.current.getBoundingClientRect().top > center) {
        setActive("assembled");
        return;
      }
      const nearest = sections.reduce((best, section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - center);
        return !best || distance < best.distance ? { section, distance } : best;
      }, null);
      if (nearest) setActive(nearest.section.dataset.system);
    };
    const schedule = () => {
      if (frame === undefined) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return (
    <>
      <section className="hero section">
        <div className="hero-meta">
          <span className="eyebrow">
            <i /> Student-built. Wisconsin-driven.
          </span>
          <span className="eyebrow">EST. 2025 / MADISON, WI</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>
              Building
              <br />
              humanoids.
              <br />
              <em>
                Beyond any
                <br />
                frontier.
              </em>
            </h1>
            <p>
              We’re UW–Madison students engineering a humanoid robot from
              scratch. Made to move, think, and interact with the world.
            </p>
            <div className="actions">
              <a
                className="button"
                href={DISCORD}
                target="_blank"
                rel="noreferrer"
              >
                Join the build <span>↗</span>
              </a>
              <Link className="text-link" to="/about">
                Meet WiscoHumanoids →
              </Link>
            </div>
          </div>
          <div className="hero-robot">
            <div className="robot-crosshair" />
            <RobotViewer />
            <span className="figure-label">FIG. 01 — THE HUMANOID</span>
            <span className="model-note">
              ORIGINAL CLUB MODEL
              <br />
              DESIGNED FROM SCRATCH
            </span>
          </div>
        </div>
        <div className="hero-bottom">
          <span className="eyebrow">Hardware × Software × Human curiosity</span>
          <a href="#inside" className="eyebrow">
            Explore the systems ↓
          </a>
        </div>
      </section>
      <div className="statement">
        <span>NO KITS.</span>
        <span>NO SHORTCUTS.</span>
        <span>JUST ENGINEERING.</span>
        <span className="statement-dot">✳</span>
      </div>
      <section className="section story-heading" id="inside">
        <p className="eyebrow">Anatomy of an ambitious idea</p>
        <h2>
          One robot.
          <br />
          <em>A world of systems.</em>
        </h2>
        <p className="lead">
          Scroll to take the robot apart, system by system. Each part has a team
          bringing it to life.
        </p>
      </section>
      <section className="system-story section" ref={story}>
        <div className="sticky-model">
          <RobotViewer active={active} />
          <div className="system-controls" aria-label="Robot system views">
            <button
              aria-pressed={active === "assembled"}
              onClick={() => setActive("assembled")}
            >
              Full robot
            </button>
            {systems.map((s, i) => (
              <button
                aria-label={s.label}
                aria-pressed={active === s.id}
                key={s.id}
                onClick={() => {
                  setActive(s.id);
                  document.getElementById(s.id).scrollIntoView({
                    behavior: matchMedia("(prefers-reduced-motion: reduce)")
                      .matches
                      ? "instant"
                      : "smooth",
                    block: "center",
                  });
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
          <p className="eyebrow model-caption">
            {active === "assembled"
              ? "Assembled view"
              : systems.find((s) => s.id === active)?.label}{" "}
            / Original model · Scroll to deconstruct
          </p>
        </div>
        <div className="system-articles">
          <div
            data-system="assembled"
            className="assembly-marker"
            aria-hidden="true"
          />
          {systems.map((s) => (
            <article id={s.id} data-system={s.id} key={s.id}>
              <p className="eyebrow">{s.label}</p>
              <h3>{s.name}</h3>
              <p>{s.body}</p>
              <div className="tags">
                {s.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <Link
                to={s.teamId ? `/subteams#${s.teamId}` : "/subteams"}
                className="text-link"
              >
                {s.team} ↗
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="section team-callout">
        <p className="eyebrow">The people behind the parts</p>
        <h2>
          Eight teams.
          <br />
          <em>One shared ambition.</em>
        </h2>
        <div>
          <p className="lead">
            Machine metal. Train vision models. Build a community. Find the part
            of the robot that speaks to you.
          </p>
          <Link className="button outline" to="/subteams">
            Explore the subteams <span>↗</span>
          </Link>
        </div>
      </section>
      <Join />
    </>
  );
}
