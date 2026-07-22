# SYNQ

Every venue. Every supplier. Every event. In SYNQ.

SYNQ is a front-end prototype of an AI-powered operating system for the events
industry — connecting organisers, venues, suppliers and clients on one
platform. This is a design/UX prototype: all data is mocked, Nova's responses
are simulated, and there is no live backend.

**Live preview:** https://meganerasmus1.github.io/SYNQ-App-Preview/

## Running locally

```
yarn install
yarn start
```

## What's here

- Marketing landing page, auth + onboarding flow with an animated logo intro
- Mission Control dashboard, Projects, Venues, Supplier Marketplace
- Network (social layer), Messages, Calendar, Files, Reports, Finance
- Nova, the AI assistant, available from anywhere in the app
- Fully responsive, with a dedicated mobile navigation experience

Built with React, Tailwind CSS, Framer Motion and Recharts. Deploys
automatically to GitHub Pages via `.github/workflows/deploy-pages.yml` on
every push to `main`.
