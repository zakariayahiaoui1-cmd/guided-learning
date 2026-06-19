# Engleasy Guided Learning — Version 0.1

A bilingual, mobile-first conversion journey built with semantic HTML, CSS, vanilla JavaScript, and Vite.

## Configure before launch

Update `src/config/campaign.js` with:

- Embedded placement Google Form URL
- Fathom replay URL
- Embedded registration Google Form URL
- Payment URL
- WhatsApp number
- Campaign/domain values if different

Update `src/config/analytics.js` with the GA4, Meta Pixel, and TikTok Pixel IDs. Replace the organization and course facts in both localized HTML files with verified production details. Self-host licensed BC Novatica Cyr and IBM Plex Sans Arabic files when the final font assets are available.

Google Forms do not expose reliable submission events to their parent page. Version 0.1 therefore uses explicit learner confirmation buttons for placement and registration completion. The form adapter can later be replaced without changing the journey components.

## Run

```sh
npm install
npm run dev
```

## Verify

```sh
npm test
npm run build
```

Production routes:

- `/guided-learning/ar/`
- `/guided-learning/en/`

## Analytics events

`landing`, `step_opened`, `step_completed`, `workshop_started`, `workshop_finished`, `registration_clicked`, `registration_submitted`, `language_selected`, `language_changed`, and `course_enrollment`.
