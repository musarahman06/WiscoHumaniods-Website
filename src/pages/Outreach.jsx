import React from "react";
import { PageIntro, Join } from "../components/Layout";
import { EMAIL } from "../data";
const photos = [
  ["outreach-2.jpg", "Demonstrating the robotic arm at a community event"],
  ["outreach-1.jpg", "Our DIY robotic hand — built from scratch"],
  ["outreach-3.jpg", "Public demo of a humanoid platform"],
  ["outreach-4.jpg", "The team at our outreach table"],
];
export default function Outreach() {
  return (
    <>
      <PageIntro
        number="05"
        label="Outreach"
        title={
          <>
            Engineering is
            <br />
            <em>for everyone.</em>
          </>
        }
      >
        <p>
          WiscoHumanoids is about sharing what we learn. We bring our work to
          classrooms, engineering expos, and public events across Wisconsin to
          show students what they can build.
        </p>
        <a
          className="button"
          href={`mailto:${EMAIL}?subject=Outreach%20Event%20Inquiry`}
        >
          Invite us to your event <span>↗</span>
        </a>
      </PageIntro>
      <section className="section outreach-mission">
        <p className="eyebrow">Inspire. Educate. Build.</p>
        <h2>
          The best way to learn?
          <br />
          <em>Pass it on.</em>
        </h2>
        <p className="lead">
          At expos and school visits, students can hold a 3D-printed hand, watch
          a robotic arm move, and ask us anything. Our members share the parts,
          the process, and the curiosity behind the robot.
        </p>
      </section>
      <section id="gallery" className="section gallery-section">
        <p className="eyebrow">From the original club gallery</p>
        <h2>
          Out in <em>the world.</em>
        </h2>
        <div className="gallery">
          {photos.map(([file, caption]) => (
            <figure key={file}>
              <img loading="lazy" src={`/assets/${file}`} alt={caption} />
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="video-block">
          <p className="eyebrow">In motion / Club demo</p>
          <video
            controls
            preload="none"
            poster="/assets/outreach-3.jpg"
            aria-label="WiscoHumanoids original outreach demonstration"
            src="https://media.base44.com/videos/public/6ac9c09abd39b35589745a75/b71036ed2_641DEBCF-1E8A-4DE4-A25E-20AC53BD214E.mp4"
          />
          <p className="content-note">
            Original club video. Spoken audio and captions have not been
            verified.
          </p>
        </div>
      </section>
      <Join
        title={
          <>
            Bring the build
            <br />
            <em>to your community.</em>
          </>
        }
        text="Hosting a school visit, STEM fair, or community event in the Madison area? Email the team with your event, date, and audience to discuss a visit."
      />
    </>
  );
}
