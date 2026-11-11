---
slug: beacon
title: one sidebar for 60 destinations
lang: en
tab: [cases]
featured: true
year: 2026
status: draft
---

# One sidebar for 60 destinations

**TL;DR** — A commercial real-estate brokerage asked us to redesign the internal portal its brokers use to decide who to call. In a 5-day Impact Week I turned roughly 60 navigation destinations into one grouped sidebar, merged 7+ AI assistants into one, and replaced two conflicting scores with one score per building. The client asked to keep going: the work continued as a Traction Lab.

| | |
|---|---|
| **Scope** | Responsive web platform (15 screens) and a mobile app concept (14 screens) |
| **Team** | Impact Week: Tech Lead, Solutions Architect and me. Traction Lab: Growth (POD Lead), PM, Tech Lead, Software Engineer and me. |
| **Role** | UX/UI Designer (senior on the project), owner of the product spec |
| **Status** | Proposal validated with the client; continued as a Traction Lab |
| **Year** | 2026 |

## Challenge
Brokers open the portal every morning to answer one question: **who is most likely to sell, and why now?** The portal made that hard. It had grown into a catalogue of tools:

- about **60 places to go**: 13 tabs, a drawer with 36 links and 22 tiles;
- **7+ AI assistants** with different names;
- **two scores** that disagreed for the same contact.

We had **5 days** to show a direction the client could react to. The brokers are on the phone all day and not technical, so anything new had to feel familiar.

## My role
I owned the product spec and the design, from the first walkthrough to the prototype. I defined the navigation, the information architecture and the success tests, designed the web platform and the mobile concept, and built the interactive prototype. The Tech Lead and Solutions Architect shaped the technical proposal. In the Traction Lab I worked with Growth, the PM and engineering on the next iteration.

## Research
1. **Three recorded walkthroughs** of the current portal by the main broker (~90 minutes). I turned them into a gap analysis with every request, its timestamp and a priority (P1–P3).
2. **Workshops and design reviews** with the client during the week.
3. **Five orientation documents** the client shared after the first review. Version 3.0 of the prototype follows them.

## Decisions

**1. Today became the place where the day starts.**
Because: the broker's first question is "who do I call first", not "which tool do I open".
Ruled out: three menus as the first view. They kept the catalogue feeling and pushed the answer one click further away.

**2. One sidebar replaced 13 tabs and a launcher.**
Grouped in the broker's own order: Today, Dashboard, Prospecting, Channels, Marketing. Every destination appears once; views are tabs inside a page, never extra sidebar items.
Because: the same destination appeared in up to three places.

**3. One assistant, everywhere.**
Seven assistants became one, available beside every page.
Ruled out: the assistant as a separate area outside the daily flow. Brokers would have to leave their work to use it, and they wouldn't.

**4. One score per building, one rank per person.**
Because: two scores for the same contact made brokers distrust both.

**5. Trust on every claim.**
Each fact shows how reliable it is: Verified, Single source, Stale or Disputed, always with color, word and icon.
Because: brokers repeat this information out loud on calls. A claim should never look more certain than its evidence.

**6. Keep their vocabulary.**
We changed the structure, not the words. Labels and order stayed the ones the brokers already use.

## Validation
- **Success tests I defined** for the first client call, on a 1440 × 900 screen and with no guidance: reach the first owner to call in 1 click and under 10 seconds; log an unanswered call in 2 clicks; find any area from the sidebar on the first try.
- **Client workshops and design reviews.** The prototype went through three versions (1.0, 2.0 and 3.0), each documented with what changed and why.
- **Internal design review:** 69 screenshots, 13 screens, light and dark, 3 breakpoints. It caught a trust contradiction: a "Verified" card next to a disputed fact. Fixed before the client saw it.

## Results
- **Observed:** after the Impact Week, the client asked to continue. The project became a Traction Lab, and the client sent orientation documents that shaped version 3.0.
- **Expected:** the success tests above are the targets for the first release.
- **Measured:** none yet. The project moved to development after my time at Designli.

## Learnings
[draft — confirm or rewrite in your words]
- Writing down the success tests on day one made every review shorter: we argued about the tests, not about taste.
- The walkthrough recordings were worth more than any brief. The best ideas came from what the broker did, not what he asked for.

---
*Client names, brand, colors and data have been changed. All rights belong to Designli and its client.*
