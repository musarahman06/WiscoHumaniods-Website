import React from "react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { DISCORD, EMAIL } from "../data";
export const navigation = [
  ["Home", "/"],
  ["Subteams", "/subteams"],
  ["About", "/about"],
  ["Sponsors", "/sponsors"],
  ["Outreach", "/outreach"],
];
export function Join({
  title = (
    <>
      Good at something?
      <br />
      <em>Curious about everything?</em>
    </>
  ),
  text = "Any major. No experience required. We’ll teach you everything from CAD to controls. The only prerequisite is curiosity.",
}) {
  return (
    <section className="join section">
      <div>
        <p className="eyebrow">An open invitation</p>
        <h2>{title}</h2>
      </div>
      <div>
        <p className="lead">{text}</p>
        <a className="button" href={DISCORD} target="_blank" rel="noreferrer">
          Join the Discord <span>↗</span>
        </a>
        <a className="text-link" href={`mailto:${EMAIL}`}>
          Email the team ↗
        </a>
      </div>
    </section>
  );
}
export function PageIntro({ number, label, title, children }) {
  return (
    <section className="page-intro section">
      <p className="eyebrow">
        {number} / {label}
      </p>
      <h1>{title}</h1>
      <div className="intro-copy">{children}</div>
    </section>
  );
}
export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
    const title =
      navigation.find(([, path]) => path === pathname)?.[0] || "Page not found";
    document.title = `${title} — WiscoHumanoids`;
  }, [pathname]);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <Link to="/" className="brand" aria-label="WiscoHumanoids home">
          <img src="/assets/logo.png" alt="" />
          <span>
            Wisco<span>Humanoids</span>
            <small>UNIVERSITY OF WISCONSIN–MADISON</small>
          </span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
        <nav
          id="navigation"
          aria-label="Main navigation"
          className={open ? "open" : ""}
        >
          {navigation.map(([label, path]) => (
            <NavLink end to={path} key={path}>
              {label}
            </NavLink>
          ))}
          <a
            className="nav-join"
            href={DISCORD}
            target="_blank"
            rel="noreferrer"
          >
            Join the build ↗
          </a>
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer>
        <div className="footer-top">
          <div>
            <Link className="footer-brand" to="/">
              Wisco<em>Humanoids.</em>
            </Link>
            <p>
              UW–Madison Humanoid Robotics.
              <br />
              Built from scratch. Built together.
            </p>
          </div>
          <div>
            <p className="eyebrow">Explore</p>
            {navigation.map(([label, path]) => (
              <Link key={path} to={path}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <p className="eyebrow">Get in touch</p>
            <a href={DISCORD} target="_blank" rel="noreferrer">
              Discord ↗
            </a>
            <a href={`mailto:${EMAIL}`}>{EMAIL} ↗</a>
            <p>Madison, Wisconsin</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} WiscoHumanoids</span>
          <span>NO KITS. NO SHORTCUTS.</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
