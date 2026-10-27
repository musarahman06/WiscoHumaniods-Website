# WiscoHumanoids

A responsive UW–Madison Humanoids club website reconstructed from the public site at https://wisco-bot-build.base44.app/ on October 27, 2026.

## Run locally

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

The production output is `dist/`. This is a static React application. Configure the host to serve `index.html` for application routes. Netlify (`public/_redirects`) and Vercel (`vercel.json`) rewrite configurations are included. The repository is not automatically published to GitHub Pages; that host needs an appropriate SPA routing configuration.

## Pages and behavior

- `/`: original 3D robot, scroll-driven system highlights, keyboard-accessible system selectors, subteam and join paths.
- `/subteams`: all eight original subteams with hardware/software/support filters.
- `/about`: mission, principles, and original first-year roadmap.
- `/sponsors`: original sponsor names, sponsorship inquiry, organization ID 35538 with copy feedback.
- `/outreach`: original gallery, original remote video with native controls, and email contact.
- Other paths: accessible not-found page within the shared navigation/footer.

Shared club links and directory data live in `src/data.js`. Layout, robot rendering, and each page are separate components. Reduced-motion preferences disable animated transitions and model easing. Model loading and WebGL failures have a content fallback.

## Recovered assets and source limits

The public site's HTML, JavaScript bundle, and CSS were inspected before implementation. The GitHub repository supplied by the owner was empty when inspected. There was no original source checkout or package manifest to preserve, so this is a fresh React/Vite reconstruction using the original site's React Router and Three.js approach, with patched dependency releases.

- `public/assets/robot.glb`: original public club model, recovered without modification. Its hierarchy remains assembled; highlights target the actual part groups.
- `public/assets/logo.png`: original club logo.
- `public/assets/outreach-*.jpg`: original gallery images, resized and compressed for web delivery.
- Newsreader, Space Grotesk, and IBM Plex Mono: the original font families, loaded from Google Fonts with system fallbacks.
- The outreach video remains at its original public Base44 URL, loaded only on request. Download/self-host it if that URL will be retired. Audio and captions have not been verified.

No authentication feature was exposed in the public club experience. The deployed Base44 bundle contained platform auth/providers and analytics, but the editable Base44 project, backend configuration, and credentials were unavailable. Those proprietary platform internals cannot be faithfully migrated from a public bundle and were not recreated or pointed at an unrelated app. If the club has private/member functionality, export its source/configuration before integrating it.

## Content requiring club confirmation

- The subteams directory lists eight teams; the original About page said nine. This rebuild follows the actual eight-team directory.
- The Oct 2025–Sep 2026 roadmap is retained as a published plan. Its old “in progress/upcoming” labels are omitted because completion is unverified.
- Sponsor names are preserved from the original site: College of Engineering, Department of Electrical and Computer Engineering, Department of Mechanical Engineering, and OpenAI. Current agreements and sponsor brand assets have not been independently verified. Names are shown as text; no replacement corporate logos or official university crest were fabricated.
- Sponsorship tiers, amounts, and benefits were absent from the published data and rendered sponsors page. The site asks visitors to contact the club for current options rather than inventing tiers.
- Existing subteam descriptions are retained, including technical claims. Hardware specifications, activity metrics, and old member counts were not added as independently verified achievements.
- Discord: https://discord.gg/u6P5wu8ywc. Email: wiscohumanoids@gmail.com. Organization ID: 35538. These are the original published contact details.

## Manual QA checklist

- [ ] Open all five routes directly and refresh each; verify host SPA rewrites.
- [ ] Check 390px mobile, tablet, and desktop layouts; confirm no horizontal overflow.
- [ ] Open/close the mobile menu, press Escape, and navigate with the keyboard.
- [ ] Scroll the robot story and use each system selector; verify the robot stays assembled and the selected system highlights.
- [ ] Try reduced motion and a browser without WebGL; verify readable content and the image/model-download fallback.
- [ ] Filter all subteam categories and confirm 3 hardware, 4 software, and 1 support team.
- [ ] Copy organization ID 35538 and verify clipboard content and status feedback.
- [ ] Verify the Discord invite, mail links, gallery, and video on the final host.
- [ ] Open an unknown URL and return home from the not-found page.
- [ ] Confirm roadmap progress, sponsors, and sponsorship options with club leadership before publishing updates.
