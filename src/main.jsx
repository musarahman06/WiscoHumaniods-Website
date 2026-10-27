import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout, { PageIntro } from "./components/Layout";
import Home from "./pages/Home";
import Subteams from "./pages/Subteams";
import About from "./pages/About";
import Sponsors from "./pages/Sponsors";
import Outreach from "./pages/Outreach";
import "./styles.css";
function NotFound() {
  return (
    <PageIntro
      number="404"
      label="Outside the blueprint"
      title={
        <>
          This part
          <br />
          <em>isn’t here.</em>
        </>
      }
    >
      <p>
        The page you’re looking for may have moved. Let’s get you back to the
        build.
      </p>
      <Link to="/" className="button">
        Return home <span>→</span>
      </Link>
    </PageIntro>
  );
}
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="subteams" element={<Subteams />} />
        <Route path="about" element={<About />} />
        <Route path="sponsors" element={<Sponsors />} />
        <Route path="outreach" element={<Outreach />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
