# Engleasy Guided Learning

## Phase 2–3 Independent Product Audit

**Version reviewed:** 0.1  
**Launch verdict:** **Do not launch publicly in the current configured state.** The experience shell is promising, but the conversion path is incomplete and several current behaviors can create false completion, lost form work, broken trust, and a dead end before payment.

This is an audit, not an implementation plan. No product code was changed.

## Evidence and limitations

The audit covers all source, content, configuration, metadata, tests, and the previously verified Arabic/English mobile and desktop journeys. The production Google Forms, Fathom replay, payment page, WhatsApp number, analytics IDs, course facts, and final fonts are absent. Those missing assets are themselves launch findings; their contents and performance could not be audited. A fresh local browser pass was blocked by the browser’s local-target policy, so no workaround was attempted. Performance estimates are therefore architectural, not Lighthouse measurements.

## Executive scorecard

| Discipline | Score | Panel verdict |
|---|---:|---|
| UX research | 6/10 | The guided model is clear, but embedded forms, forced transitions, and vague outcomes create beginner confusion. |
| CRO | 4/10 | CTA discipline is good; proof, offer clarity, registration integrity, and payment continuity are not launch-ready. |
| StoryBrand | 6/10 | The learner is usually the hero and Engleasy the guide, but Step 3 becomes organization-focused before the learner’s desired outcome is concrete. |
| Direct response copy | 5/10 | Calm and credible, but often generic. It does not carry enough specificity, curiosity, or risk reduction. |
| Behavioral psychology | 6/10 | Progressive commitment and rewards create momentum; broken promises and forced motion can erase it. |
| Marketing strategy | 3/10 | Intermediate actions are tracked, but the actual enrollment outcome and offer decision are underdesigned. |
| Visual design | 7/10 shell / 5/10 launch | Spacing and restraint are strong. Missing fonts, generic symbols, and third-party embeds will weaken the premium impression. |
| Performance | 8/10 shell / unverified integrated | First-party code is small. Third-party forms, video, pixels, and fonts will dominate real performance. |
| SEO | 5/10 | Localized URLs and basic schema exist; the page is JS-dependent and social/schema coverage is incomplete. |
| Software architecture | 6/10 | Sensible modules and configuration exist, but full rerenders, duplicated sources of truth, and hardcoded language logic limit reliability and scale. |

## Likely abandonment map

These ranges are heuristic risk estimates—not measured analytics.

| Transition | Estimated abandonment risk | Why |
|---|---:|---|
| Reel → placement start | 20–35% | Generic message scent; little evidence the experience is specifically for the visitor. |
| Placement start → completion | 35–55% | Long embedded form, nested scrolling, unclear result delivery, and no immediate value confirmation. |
| Workshop start → finish | 25–45% | The promise is broad and the time commitment is intentionally unstated. |
| Course explanation → registration | 35–55% | Missing schedule, format, price/process, instructor trust, evidence, and objection handling. |
| Registration → payment/enrollment | 50–80% | Current flow can declare success without a submission and can end with no payment action. |

# Severity-ranked findings

## Critical

### C1 — The configured product cannot complete its core journey

- **Problem:** Placement, workshop, registration, payment, WhatsApp, and analytics configuration values are empty.
- **Why it matters:** A visitor sees “content is being prepared,” cannot receive the promised value, and reaches no enrollment mechanism.
- **Proposed solution:** Treat a launch configuration checklist as a release gate. Validate every required URL/ID at build time and fail production builds when critical values are empty.
- **Expected impact:** Very high; converts a demonstrator into an operable enrollment journey.
- **Development effort:** Small.

### C2 — Registration can be marked “received” when nothing was submitted

- **Problem:** The “I submitted my registration” button changes state and fires `registration_submitted` without evidence from Google Forms.
- **Why it matters:** It creates false analytics, false reassurance, lost leads, and a serious trust failure when Engleasy never receives the form.
- **Proposed solution:** For Version 1, change the claim to a neutral confirmation and require the Google Form to redirect to a controlled completion URL or use a submission bridge. Until reliable confirmation exists, never say “received.”
- **Expected impact:** Very high; protects leads, analytics integrity, and trust.
- **Development effort:** Medium.

### C3 — The journey dead-ends before enrollment

- **Problem:** With no payment URL, the final state contains no next action. Even with a URL, enrollment is tracked on payment-link click rather than successful payment.
- **Why it matters:** The business objective is paid enrollment, not form completion. The highest-intent visitor can be abandoned at the most valuable moment.
- **Proposed solution:** Define registration → payment → payment success → welcome as an explicit state machine. Track enrollment only from a verified success callback/return page. Always state what happens next and when.
- **Expected impact:** Very high; directly increases completed enrollments.
- **Development effort:** Medium–Large, depending on provider.

### C4 — “Discover your real level” does not deliver a visible level

- **Problem:** Step 1 promises a meaningful result but only says Engleasy will later explain how and when it is delivered.
- **Why it matters:** The first value exchange breaks. A learner gives effort and data but receives uncertainty, reducing reciprocity and trust before the workshop.
- **Proposed solution:** Show the result immediately or state a precise, truthful delivery mechanism and timeframe before the form: for example, “Your level appears after submission” or “We send it on WhatsApp within X hours.”
- **Expected impact:** Very high; improves placement completion and downstream trust.
- **Development effort:** Medium.

### C5 — Qualified visitors lack enough information to choose the course

- **Problem:** Step 3 omits verified course format, group size, schedule, level fit, teaching method, feedback model, instructor identity, price/payment process, start date, and evidence.
- **Why it matters:** Calm copy cannot substitute for decision information. A qualified learner still cannot judge fit, legitimacy, affordability, or logistics.
- **Proposed solution:** Add only the minimum decision-critical facts, progressively disclosed in the same step. Use concrete proof from real classes and answer the top objections before the registration action.
- **Expected impact:** Very high; likely the largest course-registration lift after fixing the dead end.
- **Development effort:** Medium; mostly content and verified business inputs.

### C6 — Language switching or accordion rerenders can destroy form progress

- **Problem:** Every state change replaces `root.innerHTML`, destroying and recreating embedded iframes. Switching language, collapsing a step, or rerendering can reload Google Forms and lose unsubmitted answers.
- **Why it matters:** Low-literacy users may not understand why their answers vanished. This is a high-frustration abandonment trigger.
- **Proposed solution:** Preserve mounted iframe nodes and update only changed UI regions. Prevent destructive collapse while a form is in progress or warn nonintrusively before discarding it.
- **Expected impact:** Very high; prevents catastrophic form abandonment.
- **Development effort:** Medium.

### C7 — Embedded experiences are not truly localized

- **Problem:** One placement URL and one registration URL serve both languages. The parent application can switch language, but Google Form copy and direction do not automatically follow.
- **Why it matters:** A fully Arabic visitor can suddenly encounter an English or incorrectly directed form at the hardest interaction point.
- **Proposed solution:** Configure embed URLs per locale and audit every question, validation message, confirmation screen, workshop caption, and payment page in both languages.
- **Expected impact:** Very high for Arabic completion and accessibility.
- **Development effort:** Medium.

### C8 — Tracking and third-party embeds have no consent or privacy layer

- **Problem:** GA, Meta, and TikTok load immediately when IDs are present. There is no consent handling, privacy notice, data-use explanation, or terms link near forms/payment.
- **Why it matters:** This creates compliance exposure and undermines trust, especially when collecting personal data and payment information.
- **Proposed solution:** Establish the applicable legal basis, implement consent-aware loading where required, and provide concise localized privacy/terms links without turning the page into a footer-heavy site.
- **Expected impact:** High trust and risk reduction; avoids a launch-blocking compliance problem.
- **Development effort:** Medium.

## High

### H1 — The opening message is too generic and may not match the Reel

- **Problem:** “Your English journey starts here” could belong to any academy and does not continue the visitor’s specific Instagram problem.
- **Why it matters:** Weak message scent causes immediate exits before the first commitment.
- **Proposed solution:** Match the hero to the Reel’s promise and audience problem: understanding English but freezing when speaking, inconsistent study, or not knowing the true starting point.
- **Expected impact:** High improvement in placement starts.
- **Development effort:** Small.

### H2 — CTA labels do not always describe the next screen

- **Problem:** “Start learning with us” opens a registration form; it does not start learning. “I completed the level check” and “I finished the workshop” are administrative confirmations.
- **Why it matters:** CTA-surprise increases anxiety and distrust. Administrative wording spends momentum instead of extending it.
- **Proposed solution:** Use next-step labels such as “Find my group” or “See available groups,” and make confirmations factually precise.
- **Expected impact:** High registration-click lift and lower hesitation.
- **Development effort:** Extra small.

### H3 — Step 3 is benefit-light and proof-free

- **Problem:** “Clear learning rhythm,” “supportive feedback,” and “a group” are generic claims without mechanism or evidence.
- **Why it matters:** The paid bridge feels reasonable but not compelling. Visitors cannot see why Engleasy is different from free content or another academy.
- **Proposed solution:** Explain the specific mechanism: what practice occurs, who corrects it, how often, and what a real class looks like. Support it with authentic class evidence.
- **Expected impact:** High conversion impact.
- **Development effort:** Medium.

### H4 — The largest mobile task is a nested iframe

- **Problem:** Forms use up to 70vh/620px inside the page, creating nested scrolling and placing the completion confirmation below a long third-party surface.
- **Why it matters:** Nested scrolling is difficult for low-literacy mobile users and can make the next action appear missing.
- **Proposed solution:** Test the real forms on 320–390px devices. Shorten fields aggressively, use a clear end-state, and ensure the parent action becomes visible without requiring users to understand nested scroll behavior.
- **Expected impact:** High reduction in placement and registration abandonment.
- **Development effort:** Medium.

### H5 — Completion transitions are forced and can disorient users

- **Problem:** Rewards wait 1.4 seconds, replace the page, and smoothly scroll to the next card. Reduced-motion users still receive a 600ms delay, and inline smooth scrolling overrides the CSS motion preference.
- **Why it matters:** Users with cognitive, vestibular, or screen-reader needs can lose context; impatient users experience artificial delay.
- **Proposed solution:** Keep reinforcement brief but let the next step appear in place, respect reduced motion in JavaScript, and preserve focus/context.
- **Expected impact:** Moderate–high UX and accessibility improvement.
- **Development effort:** Small.

### H6 — Dynamic updates are not announced and keyboard focus is lost

- **Problem:** The live region is never populated. Full rerenders remove the focused element; completion and language changes do not move focus predictably.
- **Why it matters:** Screen-reader and keyboard users may not know that a step unlocked or where they are after an action.
- **Proposed solution:** Announce completion/unlock messages, preserve or deliberately place focus, add a skip link, and test the complete journey with keyboard and a screen reader.
- **Expected impact:** High accessibility improvement and lower confusion.
- **Development effort:** Medium.

### H7 — Low-contrast locked states are hard to read

- **Problem:** Small gray text, disabled opacity, and 0.68–0.86rem labels can fall below practical contrast/readability thresholds.
- **Why it matters:** Beginners and users with low vision need the journey map most; visually suppressing it too strongly makes the product harder to understand.
- **Proposed solution:** Verify WCAG contrast numerically, keep locked content readable, and communicate lock state with text/icon rather than opacity alone.
- **Expected impact:** Moderate–high accessibility and comprehension improvement.
- **Development effort:** Small.

### H8 — Premium typography is not actually shipped

- **Problem:** BC Novatica Cyr, Montserrat, IBM Plex Sans Arabic, and Noto Sans Arabic are named but not bundled. Most users will see Arial or Tahoma.
- **Why it matters:** Typography carries most of this minimalist design. Fallback rendering weakens hierarchy and the premium brand promise.
- **Proposed solution:** License/self-host the selected fonts, subset by language, preload only critical weights, and define metric-compatible fallbacks to avoid CLS.
- **Expected impact:** High perceived-quality lift; moderate trust benefit.
- **Development effort:** Small–Medium.

### H9 — Workshop accessibility and analytics are self-reported

- **Problem:** “Started” means poster clicked and “finished” means the visitor clicked a button. Captions, transcript, player events, and actual progress are unverified.
- **Why it matters:** Accessibility may fail, and the funnel cannot distinguish a meaningful workshop experience from a skipped video.
- **Proposed solution:** Use supported player events, provide localized captions/transcript, and keep a manual fallback only when API events are unavailable.
- **Expected impact:** High insight quality; moderate conversion improvement.
- **Development effort:** Medium.

### H10 — Analytics do not optimize toward the actual business outcome

- **Problem:** Vendor events are mostly custom; `course_enrollment` fires on a payment-link click. There is no verified purchase/enrollment success, value, currency, group, or source context.
- **Why it matters:** Paid platforms will optimize toward weak proxies and reporting can overstate revenue conversion.
- **Proposed solution:** Define a measurement plan with standard `Lead`, `CompleteRegistration`, and verified `Purchase/Enroll` events, deduplication IDs, language, campaign, course/group, value, and currency.
- **Expected impact:** High marketing efficiency and decision quality.
- **Development effort:** Medium.

### H11 — Third parties will dominate real performance

- **Problem:** The first open step contains a Google Form; video and three pixels add network, CPU, cookies, and potential layout instability. All configured analytics initialize immediately.
- **Why it matters:** Low-cost Algerian mobile devices and mobile networks magnify latency. A fast shell does not guarantee a fast experience.
- **Proposed solution:** Measure a production build with real embeds on representative devices. Delay nonessential pixels until consent/idle, reserve exact embed dimensions, and load media only when requested.
- **Expected impact:** High mobile completion and ad-landing quality improvement.
- **Development effort:** Medium.

### H12 — SEO content is effectively empty without JavaScript

- **Problem:** Localized HTML contains metadata but the body is only `#app`; all meaningful copy is client-rendered.
- **Why it matters:** Search rendering/indexing is less reliable, link previews cannot use body context, and JS failure produces almost no useful experience.
- **Proposed solution:** Pre-render the initial localized state at build time and hydrate behavior afterward. Keep one content source to avoid drift.
- **Expected impact:** High SEO resilience; moderate accessibility/performance benefit.
- **Development effort:** Medium.

### H13 — Social cards promise an image that does not exist

- **Problem:** `summary_large_image` is declared without `og:image` or `twitter:image`.
- **Why it matters:** Shared links can render weak or inconsistent previews, reducing trust and click-through.
- **Proposed solution:** Create a localized 1200×630 social image and include absolute image URLs, dimensions, type, and alt text; otherwise use a truthful summary card.
- **Expected impact:** Moderate–high social click-through improvement.
- **Development effort:** Small.

### H14 — Course and organization schema are too thin and duplicated

- **Problem:** Schema lacks stable course IDs/URLs, course instances, audience/level, delivery mode, offers, dates, and fuller organization identity. It is duplicated in two HTML files.
- **Why it matters:** Search engines receive little decision context, and duplicated manual data will drift.
- **Proposed solution:** Generate localized JSON-LD from verified configuration. Add only accurate fields—never ratings or claims that cannot be substantiated.
- **Expected impact:** Moderate–high search clarity and maintainability.
- **Development effort:** Medium.

### H15 — Adding a language requires component and build changes

- **Problem:** `ar|en` appears in route parsing and popstate logic; direction logic, Vite inputs, HTML entries, sitemap, schema, and dictionary imports are manual.
- **Why it matters:** This violates the requirement that future languages should require only translation/configuration changes.
- **Proposed solution:** Introduce a locale registry that defines code, direction, metadata, route, content loader, and embed URLs, then generate pages/routes from it.
- **Expected impact:** High scalability and lower localization defect risk.
- **Development effort:** Medium.

### H16 — State restoration contains a real accordion bug

- **Problem:** `Number(value.activeStep) || firstIncomplete` treats valid step `0` as false. A user who reopens Step 1 and reloads can be moved to another step.
- **Why it matters:** “Preserve accordion state” is not consistently true, undermining the resume experience.
- **Proposed solution:** Validate with `Number.isInteger` or nullish logic; add tests for every active step, collapsed state, completion sequence, and version migration.
- **Expected impact:** Moderate–high reliability improvement.
- **Development effort:** Extra small.

### H17 — The build is not reproducible or launch-verified

- **Problem:** There is no lockfile, no CI, and no completed production build/Lighthouse run in this environment. Vite uses a caret range.
- **Why it matters:** Dependency drift or build-only failures can appear at deployment; performance goals remain assumptions.
- **Proposed solution:** Commit a lockfile, pin the toolchain, run unit/e2e/accessibility/build checks in CI, and test the deployed artifact.
- **Expected impact:** High launch reliability.
- **Development effort:** Small–Medium.

### H18 — The product lacks a complete error/recovery path

- **Problem:** There is no explicit handling for blocked iframes, network failure, storage failure, form reload, unavailable video, or payment cancellation.
- **Why it matters:** On unreliable networks, users can be stranded without understanding whether to retry or contact a person.
- **Proposed solution:** Define localized recovery states with one safe next action and preserve progress. Keep WhatsApp support available as the final fallback.
- **Expected impact:** High resilience and trust improvement.
- **Development effort:** Medium.

## Medium

### M1 — The progress language is partly procedural

- **Problem:** “0 of 3 discoveries completed” reintroduces task-counting after intentionally replacing “Step 1 of 3.”
- **Why it matters:** It slightly weakens the transformation framing.
- **Proposed solution:** Use “Your starting point,” “You understand the obstacle,” and “Your next step is ready,” while retaining a screen-reader-friendly numeric value.
- **Expected impact:** Moderate motivation improvement.
- **Development effort:** Extra small.

### M2 — Locked-state wording can feel controlling

- **Problem:** “Locked for now” states a restriction without explaining the benefit.
- **Why it matters:** It can create reactance or confusion.
- **Proposed solution:** Use “Complete the short level check to continue” or a concise equivalent tied to the current action.
- **Expected impact:** Moderate clarity improvement.
- **Development effort:** Extra small.

### M3 — The requested micro-English learning identity is mostly absent in Arabic

- **Problem:** The Arabic journey does not meaningfully include the proposed tiny English reinforcements.
- **Why it matters:** A subtle brand differentiator from the approved strategy is missing.
- **Proposed solution:** Test one paired phrase at reward moments only, such as “Great job — أحسنت,” and remove it if comprehension declines.
- **Expected impact:** Moderate brand/identity effect; uncertain conversion impact.
- **Development effort:** Extra small.

### M4 — Some visual symbols feel generic or ambiguous

- **Problem:** `⌁`, `♡`, text arrows, and a question-mark WhatsApp badge do not form a coherent icon system.
- **Why it matters:** In a sparse interface, weak symbols are conspicuous and can make the product feel less polished.
- **Proposed solution:** Use a tiny, consistent SVG icon set with correct RTL mirroring and accessible labels. Use the recognized WhatsApp mark if brand guidelines allow it.
- **Expected impact:** Moderate perceived-quality and comprehension lift.
- **Development effort:** Small.

### M5 — The language animation fades out but snaps back

- **Problem:** The root fades to 20%, is replaced, and then has the class removed immediately.
- **Why it matters:** The transition is less polished than its 150–250ms requirement suggests and can flash on slower devices.
- **Proposed solution:** Use a two-phase, reduced-motion-aware transition without replacing active form nodes.
- **Expected impact:** Moderate polish improvement.
- **Development effort:** Small.

### M6 — The brand link is an unnecessary destructive interaction

- **Problem:** Clicking the wordmark reloads the current journey and can reload an active iframe.
- **Why it matters:** There is no homepage navigation requirement, and accidental taps can lose form work.
- **Proposed solution:** Render the wordmark as noninteractive branding unless a meaningful, safe destination is required.
- **Expected impact:** Moderate reduction in accidental disruption.
- **Development effort:** Extra small.

### M7 — Configuration has duplicated and unused sources of truth

- **Problem:** Brand colors/fonts are duplicated in CSS; `brand.js` and `canonicalOrigin` are unused; campaign ID is repeated in tracking; metadata/schema are repeated in HTML/content.
- **Why it matters:** Future campaigns will drift and “one configuration change” will not be true.
- **Proposed solution:** Generate CSS variables, analytics context, localized metadata, schema, and route entries from campaign/locale registries.
- **Expected impact:** Moderate maintenance and campaign-launch improvement.
- **Development effort:** Medium.

### M8 — `app.js` owns too many responsibilities

- **Problem:** One module creates all step bodies, renders the app, binds events, controls transitions, changes routes, and tracks analytics.
- **Why it matters:** Changes to one stage can regress another; isolated testing is difficult.
- **Proposed solution:** Separate journey controller/state transitions from view components and side-effect adapters. Preserve the vanilla architecture.
- **Expected impact:** Moderate reliability and testability.
- **Development effort:** Medium.

### M9 — Tests cover happy-path structure, not launch behavior

- **Problem:** Tests do not cover form-node preservation, language switching, focus, reduced motion, route history, analytics payloads, invalid storage, payment success, or real accessibility.
- **Why it matters:** The most valuable risks remain unprotected.
- **Proposed solution:** Add focused unit tests plus end-to-end Arabic/English journey tests, axe checks, and visual snapshots at mobile widths.
- **Expected impact:** Moderate–high defect prevention.
- **Development effort:** Medium.

### M10 — Security and deployment controls are undefined

- **Problem:** Embed URL validation accepts any URL scheme; there is no documented CSP, Permissions Policy, Referrer Policy at server level, or allowed-domain list.
- **Why it matters:** Configuration errors or compromised inputs could create security/privacy exposure.
- **Proposed solution:** Allowlist HTTPS embed/provider origins and deploy strict headers compatible with required frames and analytics.
- **Expected impact:** Moderate risk reduction.
- **Development effort:** Small–Medium.

### M11 — The visible fallback link competes with the primary action

- **Problem:** Every loaded embed displays “Open this content in a new tab,” creating another decision even when the embed works.
- **Why it matters:** It weakens the one-action principle and can eject visitors from the guided journey.
- **Proposed solution:** Reveal the fallback only after an embed error or behind a quiet help disclosure, while retaining keyboard access.
- **Expected impact:** Moderate focus improvement.
- **Development effort:** Small.

### M12 — The sticky blur and delayed layout changes need low-end testing

- **Problem:** `backdrop-filter`, shadows, iframe insertion, reward replacement, and delayed auto-scroll can cost paint time or contribute to CLS.
- **Why it matters:** Premium effects can feel sluggish on low-cost devices.
- **Proposed solution:** Profile representative Android hardware, reserve stable heights, add `scroll-margin`, and remove effects whose benefit is not visible.
- **Expected impact:** Moderate smoothness improvement.
- **Development effort:** Small–Medium.

## Low

### L1 — Several translation keys and the live region are unused

- **Problem:** `continue`, `loading`, `close`, toast copy, and the live region currently add dead surface area.
- **Why it matters:** Dead paths confuse maintenance and imply incomplete behavior.
- **Proposed solution:** Use them intentionally or remove them until needed.
- **Expected impact:** Low product impact; moderate code clarity.
- **Development effort:** Extra small.

### L2 — CSS is compact but difficult to review

- **Problem:** Most component CSS is written as long single-line rules with several hardcoded colors.
- **Why it matters:** Design-system changes and accessibility audits are slower and more error-prone.
- **Proposed solution:** Format by component and move semantic colors/type sizes into tokens.
- **Expected impact:** Low immediate conversion impact; moderate maintenance value.
- **Development effort:** Small.

### L3 — Interaction states are incomplete

- **Problem:** Primary controls have hover/focus but limited active/loading/disabled feedback.
- **Why it matters:** On touch devices, users benefit from immediate confirmation that a tap registered.
- **Proposed solution:** Add restrained pressed and busy states that do not introduce extra motion.
- **Expected impact:** Low–moderate usability improvement.
- **Development effort:** Small.

### L4 — Root no-JavaScript behavior is English-only

- **Problem:** The root fallback always links to English.
- **Why it matters:** A small subset of Arabic visitors receives the wrong fallback.
- **Proposed solution:** Provide both localized links in the no-script fallback.
- **Expected impact:** Low.
- **Development effort:** Extra small.

### L5 — Small metadata details are missing

- **Problem:** No favicon/manifest, `og:site_name`, image metadata, or `og:locale:alternate` is present.
- **Why it matters:** These details affect polish and consistency more than core ranking.
- **Proposed solution:** Add them from shared configuration after the canonical domain and social asset are verified.
- **Expected impact:** Low–moderate trust/search-preview improvement.
- **Development effort:** Small.

# Specialist conclusions

## UX researcher

The strongest UX choice is progressive disclosure with one open accordion and large controls. The most confusing points for beginners are: what the level result actually is, whether the Google Form was truly submitted, why later stages are locked, where to scroll after a long iframe, whether “Start learning” charges them, what happens after registration, and how to recover from a failed embed. The experience is simple at the shell level but becomes cognitively expensive at third-party boundaries.

## CRO specialist

CTA competition is controlled, but the funnel optimizes proxy actions instead of enrollment. The most likely leaks are placement completion, Step 3 decision-making, and registration-to-payment. Trust is underdeveloped precisely where commitment rises. The progress system helps, but progress cannot compensate for missing offer facts or a broken value promise.

## StoryBrand consultant

The student is the hero in Steps 1–2. Engleasy is mostly the guide. In Step 3, messaging shifts too quickly from the learner’s problem to “the Engleasy Intensive Course gives you…”. The bridge should first name the learner’s desired transformation, then identify the missing plan, then present Engleasy as the guide with a concrete process and low-risk next step.

## Direct response copywriter

The tone is admirably calm and avoids hype. Its weakness is not aggressiveness; it is lack of specificity. Generic phrases—“clear learning rhythm,” “supportive feedback,” “start improving”—do not answer “Why this?”, “Why now?”, or “What exactly happens next?” Copy should become more concrete, not louder.

## Behavioral psychologist

Progressive commitment, completion checks, and rewards create consistency. Motivation falls when effort is not reciprocated with a clear level result, when waiting is forced, and when the final decision carries many unanswered risks. The strongest behavioral improvement is to make each completed action produce an immediate, credible benefit and make the next commitment feel smaller than the progress already invested.

## Marketing strategist

The current funnel can report success while producing no student. The north-star event must be verified paid enrollment, with registration as a leading indicator. Course facts, audience fit, source/Reel continuity, and objection answers are marketing infrastructure—not optional sales-page decoration.

## Visual designer

The shell has good white space, restrained color, large radii, and calm hierarchy. It is closer to a polished prototype than an Apple/Linear/Stripe launch because typography is not shipped, icons are typographic symbols, course proof is visually absent, and third-party embeds will disrupt the refined rhythm. The answer is not more decoration; it is better typography, fewer generic symbols, and cleaner integration of real content.

## Performance engineer

First-party source is roughly 44 KB before bundling and contains no heavy framework or imagery—an excellent baseline. Real performance is unknown because the critical form, video, pixels, fonts, and production build are missing. Third-party cost, not code splitting, is the priority. “Lighthouse 100” should not be claimed before measuring the configured production route.

## SEO engineer

Localized URLs, canonical links, `hreflang`, a sitemap, semantic headings, and basic JSON-LD are a solid start. Pre-rendered body content, accurate richer schema, consistent canonical generation, and complete social metadata are the important gaps. SEO claims must wait for the deployed artifact and Search Console validation.

## Software architect

Vanilla modules are appropriate. The main architectural risk is destructive full rerendering around third-party state. The next refactor should not introduce a framework; it should introduce a small locale registry, explicit journey state machine, persistent embed mounts, generated metadata, and tests around user-critical transitions.

# Recommended conversion copy

Copy must be validated against the actual Reel, workshop content, delivery process, and course facts. Bracketed text is a required business decision, not publishable copy.

| Surface | Recommended English | Recommended Arabic |
|---|---|---|
| Hero eyebrow | For Algerian learners who understand more than they can say | للمتعلمين الجزائريين الذين يفهمون أكثر مما يتكلمون |
| Hero title | Know your level. See what is holding you back. Take the right next step. | اعرف مستواك. افهم ما يوقف تقدمك. وخذ الخطوة المناسبة. |
| Hero intro | Start with a short level check. We’ll guide you from there—one clear step at a time. | ابدأ باختبار قصير للمستوى. بعدها سنوجّهك خطوة واضحة في كل مرة. |
| Progress label | Your path to confident speaking | طريقك نحو التحدث بثقة |
| Progress item 1 | Find your starting point | اعرف نقطة بدايتك |
| Progress item 2 | See what blocks your progress | افهم ما يعيق تقدمك |
| Progress item 3 | Choose the right support | اختر التوجيه المناسب لك |
| Step 1 title | Find the right starting point | اعرف نقطة البداية المناسبة لك |
| Step 1 summary | Stop guessing. This short check helps us guide you from the right level. | توقّف عن التخمين. يساعدنا هذا الاختبار القصير على توجيهك من المستوى المناسب. |
| Step 1 reassurance | This is not an exam. A lower level is not a failure—it is simply your starting point. | هذا ليس امتحانًا. المستوى المبتدئ ليس فشلًا، بل هو نقطة بدايتك فقط. |
| Result note | Your result will [appear immediately / arrive on WhatsApp within X hours]. | ستظهر نتيجتك [فورًا / وستصلك عبر واتساب خلال X ساعات]. |
| Step 1 confirmation | I submitted my answers | أرسلت إجاباتي |
| Step 1 reward | Good. Your starting point is clearer now. | أحسنت. أصبحت نقطة بدايتك أوضح الآن. |
| Step 2 title | See why studying more is not always the answer | اكتشف لماذا لا تكون كثرة الدراسة هي الحل دائمًا |
| Step 2 summary | Learn what keeps learners from turning English knowledge into confident speaking. | اكتشف ما يمنع المتعلمين من تحويل معرفتهم بالإنجليزية إلى كلام واثق. |
| Workshop curiosity | If you understand English but freeze when you speak, this will show you what may be missing. | إذا كنت تفهم الإنجليزية لكنك تتوقف عند الكلام، ستكتشف هنا ما قد ينقصك. |
| Workshop play | Show me what keeps me stuck | أريد أن أعرف ما يوقف تقدمي |
| Workshop confirmation | I watched the workshop | شاهدت الورشة |
| Workshop reward | Now you know the obstacle. The next step is practice with guidance and feedback. | الآن فهمت العائق. خطوتك التالية هي التدريب مع التوجيه والتصحيح. |
| Step 3 title | Turn what you know into confident speaking | حوّل ما تعرفه إلى كلام واثق |
| Bridge title | You do not need more random lessons. You need a clear practice plan. | لا تحتاج إلى دروس عشوائية أكثر. تحتاج إلى خطة تدريب واضحة. |
| Bridge body | In the Intensive Course, you [practice mechanism], receive [feedback mechanism], and progress with [verified cadence/group detail]. | في الدورة المكثفة، ستتدرّب عبر [الطريقة]، وتحصل على [نوع التصحيح]، وتتقدم وفق [الإيقاع أو تفاصيل المجموعة]. |
| Fit heading | This course may be right for you if… | قد تناسبك هذه الدورة إذا… |
| Fit item 1 | You understand some English but struggle to speak | كنت تفهم بعض الإنجليزية لكنك تجد صعوبة في الكلام |
| Fit item 2 | You need feedback, not more saved videos | كنت تحتاج إلى التصحيح، لا إلى مزيد من الفيديوهات المحفوظة |
| Fit item 3 | You want a group and schedule that keep you consistent | كنت تريد مجموعة وبرنامجًا يساعدانك على الاستمرار |
| Identity line | Your current level is where you begin—not where you will stay. | مستواك الحالي هو نقطة بدايتك، وليس المكان الذي ستبقى فيه. |
| Course CTA | Find my group | ساعدني في اختيار مجموعتي |
| Registration intro | Tell us your level and availability. We’ll recommend the most suitable group. [No payment is taken in this form.] | أخبرنا عن مستواك ووقتك المناسب. سنقترح عليك المجموعة الأنسب. [لن يتم الدفع داخل هذا النموذج.] |
| Registration confirmation | I submitted the form | أرسلت النموذج |
| Submission title | Your request has been sent | تم إرسال طلبك |
| Submission next step | We’ll contact you on [channel] within [timeframe] with your group and payment details. | سنتواصل معك عبر [القناة] خلال [المدة] بتفاصيل المجموعة والدفع. |
| Payment CTA | Reserve my place securely | احجز مكاني بأمان |
| WhatsApp | Talk to a person on WhatsApp | تحدث مع شخص عبر واتساب |

# Phase 3 — Recommendation ranking

Scoring: conversion impact and ROI are 1–5; difficulty is 1 (easy) to 5 (hard). Rankings prioritize verified paid enrollment over engagement metrics.

## Top 20

| Rank | ID | Recommendation | Impact | Difficulty | ROI |
|---:|---|---|---:|---:|---:|
| 1 | C3 | Complete and verify registration → payment → success → welcome | 5 | 4 | 5 |
| 2 | C2 | Stop claiming/recording submissions without proof | 5 | 3 | 5 |
| 3 | C5 | Add minimum decision-critical course facts, proof, and objection answers | 5 | 2 | 5 |
| 4 | C4 | Deliver a visible level result or precise delivery promise | 5 | 3 | 5 |
| 5 | C1 | Add build-time launch configuration gates | 5 | 1 | 5 |
| 6 | C6 | Preserve iframe/form state across UI and language changes | 5 | 3 | 5 |
| 7 | C7 | Localize every embedded form, workshop asset, and payment surface | 5 | 3 | 5 |
| 8 | H10 | Track verified standard enrollment/purchase events | 5 | 3 | 5 |
| 9 | H1 | Match the hero to the Instagram Reel and learner’s exact problem | 4 | 1 | 5 |
| 10 | H3 | Explain the course mechanism with authentic evidence | 5 | 2 | 5 |
| 11 | H4 | Remove mobile nested-scroll confusion and shorten forms | 4 | 3 | 4 |
| 12 | H2 | Align CTA copy with the actual next action | 4 | 1 | 5 |
| 13 | C8 | Add consent-aware analytics and localized privacy/terms | 4 | 3 | 4 |
| 14 | H11 | Measure and control real third-party performance | 4 | 3 | 4 |
| 15 | H18 | Add localized recovery paths for embed/network/payment failure | 4 | 3 | 4 |
| 16 | H9 | Add captions/transcript and real video events | 4 | 3 | 4 |
| 17 | H6 | Fix focus management and live announcements | 3 | 3 | 4 |
| 18 | H8 | Ship optimized Arabic and English fonts | 3 | 2 | 4 |
| 19 | H12 | Pre-render localized initial content | 3 | 3 | 3 |
| 20 | H17 | Add lockfile, CI, production build, accessibility and Lighthouse gates | 3 | 2 | 4 |

## Remaining recommendations

| Rank | ID | Recommendation | Impact | Difficulty | ROI |
|---:|---|---|---:|---:|---:|
| 21 | H5 | Replace forced delayed scrolling with context-preserving transitions | 3 | 2 | 4 |
| 22 | H7 | Correct contrast and small locked-state typography | 3 | 1 | 4 |
| 23 | H15 | Generate locales/routes from a locale registry | 2 | 3 | 3 |
| 24 | H16 | Fix active Step 0 restoration and expand state tests | 2 | 1 | 5 |
| 25 | H13 | Add accurate localized social-card imagery | 2 | 2 | 3 |
| 26 | H14 | Generate richer verified schema from configuration | 2 | 3 | 2 |
| 27 | M1 | Reframe numeric progress as transformation progress | 2 | 1 | 4 |
| 28 | M2 | Replace unexplained “Locked” wording | 2 | 1 | 4 |
| 29 | M11 | Hide fallback links until they are needed | 2 | 1 | 4 |
| 30 | M6 | Remove the destructive wordmark link | 2 | 1 | 4 |
| 31 | M4 | Replace typographic symbols with a coherent icon set | 2 | 2 | 3 |
| 32 | M5 | Make language transition genuinely two-phase | 1 | 2 | 2 |
| 33 | M9 | Expand end-to-end, accessibility, and visual regression tests | 2 | 3 | 3 |
| 34 | M7 | Consolidate campaign, brand, metadata, and analytics configuration | 2 | 3 | 3 |
| 35 | M8 | Split the journey controller from views and side effects | 2 | 3 | 2 |
| 36 | M10 | Add URL allowlists and deployment security headers | 1 | 2 | 2 |
| 37 | M12 | Profile blur/shadow/CLS on low-end Android devices | 2 | 2 | 3 |
| 38 | M3 | Test one restrained bilingual reward phrase | 1 | 1 | 2 |
| 39 | L3 | Add touch pressed/busy states | 1 | 1 | 3 |
| 40 | L5 | Complete minor metadata and browser-brand assets | 1 | 1 | 2 |
| 41 | L1 | Remove or implement dead translation/live-region paths | 1 | 1 | 2 |
| 42 | L2 | Reformat CSS and move hardcoded values to tokens | 1 | 2 | 1 |
| 43 | L4 | Localize the no-JavaScript root fallback | 1 | 1 | 2 |

# Final answer

## If this product launched tomorrow, what are the five biggest reasons a qualified visitor would still fail to become a student?

1. **They would not receive the promised value from Step 1.** “Discover your real level” currently ends with uncertainty about where and when the result appears.
2. **They would not have enough trustworthy information to choose the Intensive Course.** The experience lacks concrete course facts, authentic proof, instructor confidence, logistics, price/process clarity, and objection answers.
3. **The application could lose their form work or falsely tell them their registration was received.** Full iframe rerenders and self-reported completion make the highest-friction moments unreliable.
4. **The path from registration to paid enrollment is incomplete.** There is no verified submission, payment-success state, or guaranteed next action in the current configuration.
5. **The Arabic learner could encounter a language break at the exact moment commitment rises.** Parent-page localization does not guarantee Arabic Google Forms, captions, payment, validation, or confirmation messages.

The product does not need another week of visual embellishment. It needs a trustworthy value exchange, a concrete course decision, and an unbroken path to verified enrollment.
