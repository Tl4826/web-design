# Web Design and Development

## Lab 1 – GitHub Flow
The original Coming Soon page is maintained in [Tl4826.github.io](https://github.com/Tl4826/Tl4826.github.io).

## Lab 4 – Responsive portfolio
An HTML/Tailwind CSS portfolio with Vite, responsive sections, metadata, favicon and scroll animations.

### Run locally
Requires Node.js 22 (22.12 or newer).
```sh
npm install
npm run dev
npm run build
npm run preview
```

The production output is `dist/`. Enable GitHub Actions as the Pages source in Settings > Pages. The workflow installs dependencies, builds and deploys the output.

### Review checklist
- Check navigation and sections at mobile, tablet and desktop widths.
- Check browser console for errors and reduced-motion support.
- Verify the build and GitHub Pages deployment.
- Add a personal CV, portrait and contact details if desired; none are invented.

## Lab 5 – Next.js
- [Part 1: Pages Router blog](lab5/part1-pages-router/README.md)
- [Part 2: App Router financial dashboard](lab5/part2-dashboard-app/README.md)

See [Lab 5 overview](lab5/README.md) for scope and verification. Each project runs separately from Lab 4. The dashboard needs PostgreSQL and environment configuration; review CI results before submission.
