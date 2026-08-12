---
version: alpha
name: SABLE Fashion & Apparel
description: A minimalist, high-end e-commerce experience characterized by a monochrome palette, heavy editorial typography, and layered depth effects. The design emphasizes texture, limited-run exclusivity, and architectural silhouettes.
colors:
  primary: "#101010"
  background: "#EFEDE8"
  accent: "#8A8781"
  border: "rgba(16,16,16,0.14)"
  bone: "#EFEDE8"
  ink: "#101010"
  mid: "#8A8781"
  tan_muted: "#DCD9D3"
typography:
  family: "Archivo, system-ui, sans-serif"
  baseSize: "15px"
  lineHeight: "1.6"
  headings:
    weight: "800"
    letterSpacing: "-0.03em"
    transform: "uppercase"
  labels:
    weight: "500"
    size: "10px"
    letterSpacing: "0.22em"
    transform: "uppercase"
spacing:
  maxContainer: "1440px"
  gutter: "clamp(18px, 3.4vw, 44px)"
  navHeight: "96px"
rounded:
  default: "0px"
  button: "0px"
  icon: "50%"
components:
  button_primary:
    bg: "{colors.ink}"
    text: "{colors.bone}"
    font: "{typography.labels}"
    padding: "16px 34px"
  product_card:
    bg: "#E4E1DC"
    aspectRatio: "3/4"
    metaSize: "13.5px"
---

## Overview
SABLE is a high-fashion apparel platform defined by its "Considered Essentials" philosophy. The visual personality is austere yet premium, utilizing a monochrome-adjacent palette (Bone and Ink) to allow product textures to lead. The interface features high density in information but generous whitespace in editorial sections. Layouts shift between rigid grids for commerce and asymmetrical, offset compositions for lookbooks, creating a "layered glass" feel through parallax and depth-based typography.

## Colors
- **Ink (#101010)**: Used for primary text, backgrounds of high-impact sections, and call-to-action buttons.
- **Bone (#EFEDE8)**: The primary site background, providing a warmer, more premium feel than pure white.
- **Mid (#8A8781)**: Used for secondary metadata, descriptions, and labels.
- **Line (rgba(16,16,16,0.14))**: Subtle structural dividers.
- **Muted Tan (#DCD9D3)**: Used for specific editorial backgrounds (The Cloth section).

## Typography
- **Primary Font**: Archivo. A versatile sans-serif that ranges from heavy, tight-tracked headings to airy, wide-tracked labels.
- **Hero Headings**: Clamped sizes reaching up to 300px, font weight 800, leading 0.8. Characterized by negative letter spacing (-0.02em).
- **Interface Labels**: 10px, 500 weight, significant tracking (0.22em), all-caps. Used for category headers and utility text.
- **Body Copy**: 15px/1.6, providing a legible contrast to the high-intensity headings.

## Layout
- **Grid System**: 12-column grid for complex editorial sections; 4-column grid for standard product listings; 3-column grid for category strips.
- **Navigation**: Sticky top bar (96px height) with a 3-part grid (Left: Links, Center: Brand, Right: Utilities).
- **Responsive Behavior**: Transitions from multi-column to single-column stacks below 820px-900px. Margin gutters use fluid clamping (3.4vw) to maintain proportions.

## Elevation & Depth
- **Layering**: The "Hero Sandwich" effect places large-scale typography behind a transparent subject (model) but ahead of the background.
- **Surface**: The site uses `backdrop-filter: blur(10px)` on the sticky navigation to maintain a sense of translucency as it passes over content.
- **Shadows**: Large, soft drop shadows (0 26px 46px rgba(16,16,16,0.22)) are applied specifically to hero assets to lift them off the typography layer.

## Shapes
- **Geometric Rigidity**: Strictly rectangular for almost all containers, images, and buttons.
- **Exceptions**: Circle shapes (border-radius: 50%) are reserved exclusively for functional icons like the "favorite" button on product cards.

## Components
- **Primary Button**: Solid Ink background with a slide-up hover effect (using a #2E2E2E pseudo-element).
- **Ghost Link (btn-line)**: Underlined text where the underline scales from center-right to center-left on hover.
- **Product Card**: Features a gray-scaled image, a favorite toggle, and a "Quick Add" button that slides up from the bottom on hover.
- **Announcement Bar**: A continuous-loop horizontal ticker with a paused state on hover.

## Page Sections
### Navigation
A translucent Bone-colored bar with a 1px border. Navigation items feature an animated underline interaction and wide letter-spacing.

### Hero Section
A high-impact editorial entry. Centered wordmark "SABLE" in massive typography with a model cutout overlapping. Floating labels in the top-left and bottom-right corners define the seasonal context. Primary CTA cluster sits at the bottom-left.

### Category Strip
Three columns with Ink background. Each tile contains a 3:4 greyscale thumbnail, a bold heading, and a directional arrow link that slides right on hover.

### Season Split
A 50/50 split between a text column (Bone background) and a full-height image (Muted Tan background). High-contrast greyscale imagery with a vertical scale parallax effect.

### Service Row
A functional 4-column grid providing store guarantees (Shipping, Returns, etc.) using subtle 12px headings and Mid-tone body text.

### Product Grid
A 4-column display of items. Features include tabular-num prices for alignment and a hover-active "Add to Bag" overlay.

### Lookbook
An asymmetrical 12-column layout. Images use a vertical "reveal" clip-path animation (controlled by the `--p` CSS variable) as they scroll into view. Captions include numeric indices.

### The Cloth / Studio Sections
Material-focused blocks using split layouts. "The Cloth" features an autoplaying muted video of fabric textures, while "The Studio" utilizes an IntersectionObserver-driven counter to animate production statistics.

### Footer
A four-column layout containing an address block, site map, and legal fine print. The brand logo is repeated at 30px for visual closure.

## Motion & Interaction
- **Scroll-Driven Parallax**: Elements move at varying rates (data-speed). Hero model scales slightly while the background text moves upward.
- **Clip-Path Reveals**: Lookbook images unmask vertically as they enter the viewport.
- **Hover States**: Heavy use of `cubic-bezier(.6,0,.2,1)` for smooth, high-end transitions. Buttons use vertical translation; links use scaleX transforms.
- **Load Sequence**: Staggered opacity/translation fades (`.hv.on`) for hero elements on page entry.

## Do's and Don'ts
- **Do**: Use greyscale or extremely muted photography.
- **Do**: Maintain high letter-spacing on all labels and navigation items.
- **Don't**: Use rounded corners on containers or buttons.
- **Don't**: Introduce vibrant primary colors; stay within the Ink/Bone/Tan spectrum.

## Accessibility
- **Focus States**: High-contrast 2px outlines for form inputs.
- **Aria Attributes**: `aria-pressed` for toggle buttons; `aria-hidden="true"` for decorative tickers and wordmarks.
- **Motion Safety**: All transitions and animations are disabled for users who prefer reduced motion via `@media (prefers-reduced-motion: reduce)`.

## Assets
1. Google Font Archivo: https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&amp;display=swap
2. Hero Model: https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@sable-v2/sable/img/model.png
3. Category - Men: https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@sable-v2/sable/img/cat-men.webp
4. Category - Women: https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@sable-v2/sable/img/cat-women.webp
5. Category - Tailoring: https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@sable-v2/sable/img/cat-tailoring.webp
6. Season Main: https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@sable-v2/sable/img/season.webp
7. Lookbook 1: https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@sable-v2/sable/img/look1.webp
8. Lookbook 2: https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@sable-v2/sable/img/look2.webp
9. Fabric Video: https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@sable-v2/sable/img/cloth.mp4
10. Fabric Poster: https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@sable-v2/sable/img/cloth.webp
11. Atelier Hands: https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@sable-v2/sable/img/atelier.webp
12. Product Placeholder: https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg
13. Overshirt: https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@sable-v2/sable/img/p-overshirt.webp
14. Tee: https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@sable-v2/sable/img/p-tee.webp
15. Cardigan: https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@sable-v2/sable/img/p-cardigan.webp
16. Knit: https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@sable-v2/sable/img/p-knit.webp

### Exported Codebase Asset Inventory
1. embed: https://fonts.gstatic.com
   Context: index.html: markup attribute; index.html: absolute url literal
2. other: https://cdn.tailwindcss.com
   Context: index.html: markup attribute; index.html: absolute url literal
3. other: http://www.w3.org/2000/svg
   Context: index.html: absolute url literal
