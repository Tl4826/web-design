# Lab 5 — Next.js practice starter

**Status: provisional starter, not a completed assignment.** The original two-part lab instructions at https://basic.web-programming.io.vn/labs/lab5__build_website_with_nextjs/ could not be retrieved. The routes and design here are illustrative, not verified requirements. Compare with the lecturer's instructions before submitting.

## Start locally

Use Node.js 22 or newer.

```sh
cd lab5
npm install
npm run dev
```

Open http://localhost:3000. To check production compilation, run `npm run build`, then `npm run start`.

## What to study

- App Router: app/page.js, app/about/page.js and app/projects/page.js create URL routes.
- Root layout: app/layout.js wraps every page.
- Components: Header, Footer and ProjectCard are reused.
- Props: ProjectCard receives project data from the parent component.
- CSS: app/globals.css sets typography, responsive layout and focus styles.

## Verification

- [ ] Obtain and compare Part 1 and Part 2 instructions.
- [ ] Add any missing assignment-specific features.
- [ ] Install dependencies and commit the generated package-lock.json.
- [ ] Run production build and check all three routes.
- [ ] Confirm the deployment method required by the lecturer.

Lab 4 is kept separate from this folder.
