# Integration Milestones — SDU Boutique

> Run each milestone as a **separate agent session**. Each file is a self-contained prompt.
> Read `docs/AGENT_RULES.md` before every milestone.

---

## Execution order

Milestones MUST run in order. Each depends on the previous.

### Phase 0 — Foundation
| # | File | What it does | Target |
|---|------|-------------|--------|
| M00 | `M00-reconcile-firestore-schema.md` | Update dashboard types + seed script to match new unified schema | Dashboard |
| M01 | `M01-seed-firestore.md` | Populate Firestore with current hardcoded website content | Dashboard |

### Phase 1 — Landing Page Firebase Setup
| # | File | What it does | Target |
|---|------|-------------|--------|
| M02 | `M02-firebase-setup-landing.md` | Add Firebase SDK, create useContent hook, loading states | Landing page |

### Phase 2 — Landing Page Data-Driven (one section at a time)
| # | File | What it does | Target |
|---|------|-------------|--------|
| M03 | `M03-hero-data-driven.md` | HeroSection reads from Firestore | Landing page |
| M04 | `M04-hadara-data-driven.md` | HadaraSection reads from Firestore | Landing page |
| M05 | `M05-experience-data-driven.md` | ExperienceSection reads from Firestore | Landing page |
| M06 | `M06-identity-data-driven.md` | IdentitySection reads from Firestore | Landing page |
| M07 | `M07-destinations-data-driven.md` | DestinationsSection reads from Firestore | Landing page |
| M08 | `M08-heritage-data-driven.md` | HeritageSection reads from Firestore | Landing page |
| M09 | `M09-vision-massage-data-driven.md` | VisionSection + MassageSection (identical layout) | Landing page |
| M10 | `M10-room-data-driven.md` | RoomSection reads from Firestore | Landing page |
| M11 | `M11-footer-data-driven.md` | FooterSection reads from Firestore | Landing page |
| M12 | `M12-navbar-global-data-driven.md` | NavBar + siteConfig reads global from Firestore | Landing page |
| M13 | `M13-contact-data-driven.md` | ContactPage reads from Firestore | Landing page |

### Phase 3 — Dashboard Schema Alignment
| # | File | What it does | Target |
|---|------|-------------|--------|
| M14 | `M14-dashboard-types-config.md` | Rewrite types/content.ts + lib/config.ts to new schema | Dashboard |
| M15 | `M15-dashboard-hero-hadara-editors.md` | Hero + Hadara section editors | Dashboard |
| M16 | `M16-dashboard-experience-identity-destinations-editors.md` | Experience + Identity + Destinations editors | Dashboard |
| M17 | `M17-dashboard-heritage-vision-massage-editors.md` | Heritage + Vision + Massage editors | Dashboard |
| M18 | `M18-dashboard-room-footer-global-contact-editors.md` | Room + Footer + Global + Contact editors | Dashboard |

### Phase 4 — Dashboard UI/UX Overhaul
| # | File | What it does | Target |
|---|------|-------------|--------|
| M19 | `M19-dashboard-login-redesign.md` | Login page with luxury brand design | Dashboard |
| M20 | `M20-dashboard-layout-redesign.md` | Sidebar, navigation, and home page redesign | Dashboard |
| M21 | `M21-dashboard-section-list-redesign.md` | Section list + editor pages UI overhaul | Dashboard |
| M22 | `M22-firebase-storage-upload.md` | Image upload to Firebase Storage | Dashboard |

### Phase 5 — Dashboard Embedded Preview
| # | File | What it does | Target |
|---|------|-------------|--------|
| M23 | `M23-embedded-preview.md` | Iframe preview of website with section navigation | Dashboard |
| M24 | `M24-inline-section-editing.md` | Click section in preview → open editor panel | Dashboard |

### Phase 6 — Polish & Deploy
| # | File | What it does | Target |
|---|------|-------------|--------|
| M25 | `M25-performance-security-deploy.md` | Performance, security rules, final deployment | Both |

---

## Before each milestone

1. Read `docs/AGENT_RULES.md`
2. Read `docs/FIRESTORE_SCHEMA.md`
3. Skim `docs/APP_MAP.md` for file locations
4. Read the milestone file completely before making any changes
5. Verify INPUTS are present
6. Complete all OUTPUTS and check the verification checklist
