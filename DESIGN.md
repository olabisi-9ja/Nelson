---
name: Nelson
description: Bespoke luxury footwear built for excellence
colors:
  obsidian: "#0a0a0a"
  ink: "#111111"
  charcoal: "#1a1a1a"
  stone: "#262626"
  ivory: "#f4f1ea"
  cream: "#e8e4d9"
  warm-white: "#faf9f6"
  gold: "#c5a059"
  gold-light: "#d9b978"
  chrome: "#a8b0bc"
  leather: "#6b4423"
  leather-light: "#8a5a36"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  none: "0px"
  sm: "2px"
  md: "4px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.obsidian}"
    rounded: "{rounded.sm}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.gold-light}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.gold}"
    rounded: "{rounded.sm}"
    padding: "16px 32px"
---

# Design System: Nelson

## 1. Overview

**Creative North Star: "Minimalist Wolverine"**

The design system is a bold, high-contrast visual identity designed for bespoke luxury. It rejects generic SaaS and startup aesthetics in favor of a raw, craftsmanship-focused layout. The theme features a light-themed, asymmetrical grid structure on the homepage (`bg-warm-white`) that acts as a museum showcase for the physical footwear. The inner pages utilize a deep, premium dark layout (`bg-obsidian`) to house workflows like the custom order experience. Spacing is fluid, layouts are asymmetric, and content visibility is never gated.

**Key Characteristics:**
- High-contrast, typography-driven layouts.
- Rejection of generic SaaS shadows and rounded cards.
- Dark theme for custom order tools, light theme for brand storytelling.

## 2. Colors

Nelson uses a split-theme strategy: the homepage is a high-contrast warm-white ground with obsidian and gold type, while utility and order pages use a deep mineral theme.

### Primary
- **Gold** (#c5a059): Used for primary CTAs, active states, and highlights.

### Neutral
- **Warm White** (#faf9f6): Ground color for the homepage storytelling.
- **Obsidian** (#0a0a0a): Dark background for inner pages, and crisp body text on the homepage.
- **Charcoal** (#1a1a1a): Surface fill for panels and dark layout containers.

### Named Rules
**The High-Contrast Ground Rule.** Body text must always meet a minimum 4.5:1 contrast ratio. Muted gray text is strictly forbidden; text must be crisp obsidian on light pages, or warm-white on dark pages.
**The Gold Accent Rule.** Gold is a highlight, not a paint bucket. Keep gold usage to <=10% of any view to preserve its premium, exclusive feel.

## 3. Typography

**Display Font:** Inter, sans-serif
**Body Font:** Inter, sans-serif

Typography is clean, highly structured, and heavy. Display titles are bold and tightly tracked, while body copy is spacious and clean.

### Hierarchy
- **Display** (900, clamp(2.5rem, 7vw, 4.5rem), 1): Used for main page H1s.
- **Headline** (700, clamp(1.75rem, 4vw, 2.5rem), 1.2): Section H2s.
- **Title** (600, 1.25rem, 1.4): Components and secondary headings.
- **Body** (400, 1rem, 1.6): Long prose, maximum length 70ch.
- **Label** (500, 0.75rem, 0.15em, uppercase): Eyebrows, buttons, and short labels.

### Named Rules
**The Display Tracking Floor Rule.** Tightly tracked titles must never go below -0.04em tracking to prevent letter overlap.
**The Balance Rule.** All H1s and H2s must use text-wrap: balance to prevent awkward line wraps.

## 4. Elevation

Nelson is a flat, material-driven design system. Depth is conveyed strictly through borders, flat background shifts, and sharp edges. Shadows are entirely prohibited.

### Named Rules
**The Flat-By-Default Rule.** Surfaces must remain flat. There are no box shadows, drop shadows, or layered glass blurs. We build visual hierarchy with sharp boundaries and contrasting background fills.

## 5. Components

Components follow the "Sharp and Restrained" visual philosophy.

### Buttons
- **Shape:** Sharp corners, 2px radius (rounded-sm).
- **Primary:** Gold background with obsidian text, padding 16px 32px.
- **Hover:** Gold-light background.
- **Secondary:** Transparent background with gold border and text.

### Cards / Containers
- **Corner Style:** 4px radius (rounded-md).
- **Background:** Charcoal (#1a1a1a) or Ivory (#f4f1ea) depending on theme.
- **Border:** 1px solid border matching the theme.

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical layouts for product showcases.
- **Do** maintain a strict flat aesthetic without shadows.
- **Do** center background videos and crop out black margins using CSS.

### Don't
- **Don't** use SaaS template elements (like rounded icons above headings, glassmorphic cards).
- **Don't** use neon, purple gradients, or generic startup colors.
- **Don't** write body text in light gray; keep contrast high and crisp.
