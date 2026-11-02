# Serendib Gem House — Design System

**Document:** `03-design-system.md`  
**Status:** Initial design system approved  
**Brand:** Serendib Gem House  
**Version:** 1.0

---

## 1. Design Philosophy

The Serendib Gem House website should communicate elegance, trust, quality and professionalism through a refined editorial design.

The visual experience should feel like a premium gemstone gallery rather than a conventional online shopping template.

### Core principles

- Refined and minimal visual presentation.
- Generous whitespace and carefully balanced layouts.
- High-quality gemstone photography as the primary visual focus.
- Clear typography and strong content hierarchy.
- Subtle interactions rather than excessive animations.
- Consistent design across all pages and screen sizes.
- Premium appearance without unnecessary visual complexity.
- Easy navigation and straightforward customer enquiries.

Avoid excessive gradients, decorative elements, heavy shadows, oversized rounded cards and generic e-commerce styling.

## 2. Brand Colours

Use the approved brand palette consistently throughout the website.

| Colour | Hex | Usage |
|---|---|---|
| Deep Navy | `#071D3B` | Primary text, headings, buttons, footer |
| Aqua | `#12B9DC` | Brand accent, highlights, interactive states |
| White | `#FFFFFF` | Main page backgrounds and product photography |
| Pale Blue | `#EAF5FA` | Occasional background sections |
| Light Grey | `#E5E7EB` | Subtle borders and separators |
| Muted Grey | `#64748B` | Secondary information and supporting text |

### Colour application

- White should be the predominant website background.
- Deep navy is the primary text and interface colour.
- Aqua should be used selectively.
- Pale blue can distinguish occasional sections without overwhelming the layout.
- The footer and major contact CTA sections should use deep navy.
- Maintain accessible contrast for text and controls.
- Avoid introducing additional brand colours without a clear functional reason.

## 3. Typography

### Font families

**Headings:** Cormorant Garamond  
**Body and interface:** Inter

Use Cormorant Garamond for expressive editorial headings and Inter for practical information and interface elements.

### Typography hierarchy

| Element | Font | Treatment |
|---|---|---|
| Hero heading | Cormorant Garamond | Semibold, 600, large editorial |
| Page headings | Cormorant Garamond | Semibold, 600, large |
| Section headings | Cormorant Garamond | Semibold, 600, medium-large |
| Product names | Cormorant Garamond | Semibold, 600 |
| Body text | Inter | Regular, 400 |
| Navigation | Inter | Regular, 400 |
| Product specifications | Inter | Small, muted |
| Product IDs | Inter | Small, muted |
| Prices | Inter | Prominent, medium/semibold |
| Buttons | Inter | Medium, 500 |

Headings use Cormorant Garamond at semibold (600) so they sit comfortably alongside the solid serif lettering of the logo. Do not use italic emphasis in headings; keep headings upright and let scale and whitespace provide emphasis.

Avoid using decorative typography for product specifications, prices, navigation or functional interface elements.

## 4. Layout and Spacing

### General layout

- Use a spacious editorial layout.
- Centre main content within a maximum width of approximately 1,360px.
- Maintain balanced side margins.
- Use generous vertical spacing between major sections.
- Use consistent horizontal and vertical spacing throughout the website.
- Keep content widths appropriate for readability.

### Section transitions

Use whitespace and occasional background changes instead of decorative dividers.

### Border radius

Use subtle corner rounding of approximately 4–6px for:

- Buttons
- Product cards
- Image containers
- Form fields
- Status badges

Avoid excessive rounding and pill-shaped interface elements, except where a specific functional design requires it.

### Borders and shadows

- Prefer whitespace over visible borders.
- Use light grey borders (`#E5E7EB`) only where separation is necessary.
- Avoid heavy shadows.
- Product cards should not have visible borders or shadows.

## 5. Header and Navigation

### Desktop header

- Clean white background.
- Brand logo positioned on the left.
- Main navigation on the right.
- Prominent navy WhatsApp button.
- Subtle bottom border.
- Sticky positioning.
- Header compacts slightly when scrolling.

### Navigation links

- Inter, regular weight.
- Sentence case.
- Deep navy text.
- Subtle aqua hover state.
- Thin aqua underline for the active page.

### Navigation structure

1. Home
2. Gemstones
3. About Us
4. How to Buy
5. Contact

### Mobile navigation

- Compact header.
- Responsive menu.
- Clear navigation links.
- Prominent WhatsApp contact option.
- Touch-friendly spacing.

## 6. Buttons and Interactive Elements

### Primary button

- Deep navy background.
- White text.
- Subtle 4–6px radius.
- Inter medium weight.
- Smooth hover transition.

### Secondary button

- White background.
- Deep navy text.
- Thin navy border.
- Same radius as the primary button.

### Accent usage

Aqua can be used for subtle interactive highlights and selected states.

### Interaction principles

- Clear hover and focus states.
- Keyboard accessibility.
- Touch-friendly controls.
- Smooth but restrained transitions.
- No excessive movement or decorative effects.
- Respect reduced-motion preferences.

## 7. Hero Section

### Layout

- Split editorial layout.
- Text and CTAs on the left.
- Large gemstone photograph on the right.
- Stack vertically on mobile.

### Typography

- Large Cormorant Garamond heading.
- Deep navy text.
- Upright semibold heading, no italic emphasis.
- Supporting copy in Inter.

### Image

- Single statement gemstone photograph from actual inventory.
- Pure white background.
- Contained image presentation.
- Clean rectangular shape.
- No decorative frame or heavy shadow.

### Buttons

- Primary: Browse Gemstones.
- Secondary: WhatsApp Us.

### Dimensions and animation

- Spacious hero, but not full-screen.
- Pure white background.
- Subtle fade and upward movement on initial appearance.
- Approximately 600–800ms animation duration.
- Respect reduced-motion settings.

## 8. Product Catalogue

### Catalogue layout

- Maximum content width: approximately 1,360px.
- Desktop: four-column product grid.
- Smaller desktop/tablet: three columns where appropriate.
- Mobile: two columns where space permits.
- Comfortable spacing between cards.

### Filter sidebar

- Desktop width: approximately 250px.
- Left-aligned beside the product grid.
- Collapsible on desktop.
- Mobile uses a slide-out filter drawer.
- Filter groups use expandable accordions.
- Category group initially expanded.
- Other groups initially collapsed.

### Filter groups

1. Category
2. Price
3. Colour
4. Carat weight
5. Shape/cut
6. Origin

### Filter controls

**Category**
- All Gemstones
- Spinel
- Garnet
- Sapphire
- Other Gemstones

**Price**
- Minimum and maximum LKR inputs.
- Blank fields mean no limit.
- Prevent invalid minimum values exceeding maximum values.

**Colour**
- Selectable circular colour swatches with labels.
- Multiple selections allowed.
- Initial options: Blue, Red, Pink, Purple, Green, Yellow, White, Black and Other.

**Carat weight**
- Minimum and maximum decimal inputs.
- Blank fields mean no limit.
- Only filter products with recorded weights.

**Shape/cut**
- Selectable visual options.
- Initial options: Oval, Round, Cushion, Pear, Emerald, Marquise, Radiant, Princess and Other.
- Multiple selections allowed.
- Options must remain extensible.

**Origin**
- Initial options: Sri Lanka and Madagascar.
- Only verified gemstone origins should be displayed as filterable values.

### Active filters

- Display selected filters as removable chips above the grid.
- Provide a Clear All action.
- Removing one filter must preserve all other selections.

### Sorting

Position sorting above the product grid, aligned to the right.

Options:
- Newest first (default).
- Price: Low to High.
- Price: High to Low.

Sorting must preserve active filters.

### Catalogue heading

- Large Cormorant Garamond heading.
- Short supporting description in Inter.
- Left aligned.
- Editorial presentation.

### Loading and empty states

**Loading**
- Skeleton product cards.
- Pale grey placeholders.
- Subtle shimmer or pulse.
- Respect reduced-motion preferences.

**No results**
- Centred message: "No gemstones found".
- Brief explanation.
- Clear All Filters action.
- Optional understated WhatsApp enquiry link.

### Pagination

- Initially display 12 products.
- Use a Load More button.
- Load additional products without page navigation.
- Preserve current filters and sorting.
- Display the number of products currently shown.
- Hide Load More when all matching products are displayed.

## 9. Product Cards

### Overall appearance

- Minimal editorial card.
- White background.
- No visible border or shadow.
- Subtle 4–6px corner rounding.
- Entire card clickable.
- Comfortable spacing between cards.
- Consistent vertical alignment.

### Image presentation

- Square aspect ratio (1:1).
- Pure white background.
- `object-fit: contain`.
- No cropping, stretching or distortion.
- Centre the gemstone.
- Use real product photography.
- Preserve the accurate appearance and colour of the gemstone.
- Maintain consistent image dimensions.

### Image interaction

- Subtle zoom on hover.
- Approximate scale: 1.03–1.05.
- Smooth transition around 300ms.
- No layout changes.
- No hover zoom on touch devices.
- Respect reduced-motion preferences.

### Product information hierarchy

1. Sale tag or Sold out overlay on image, when relevant.
2. Category.
3. Product name.
4. Specifications.
5. Price.

Product cards do not show the Product ID, for a cleaner, more minimal card. The Product ID is shown on the product detail page.

### Product name

- Cormorant Garamond, semibold (600), matching the headings.
- Deep navy.
- Maximum two lines.
- Longer names truncated with an ellipsis.
- Prices are pinned to the bottom of the card so they align across a row.

Above the name, a small uppercase line shows the category.

### Product ID

- Not shown on product cards.
- Shown on the product detail page as small muted text beneath the product name.
- Example: `SGH-0001`.
- No prominent badge or decorative treatment.

### Specifications

Display available attributes on one compact line.

Example:

`2.15 ct · Oval · Blue`

- Use muted Inter typography.
- Separate values with middle dots.
- Omit unavailable attributes.
- Avoid empty placeholders.

### Price

- Prominent typography.
- Deep navy.
- LKR currency format with comma separators.
- Example: `LKR 125,000`.
- No unnecessary decimal places for whole-rupee prices.

### Sale pricing

- Small aqua SALE badge.
- Current sale price displayed prominently.
- Original price underneath in smaller muted struck-through text.
- No loud ribbons or oversized promotional graphics.
- Only display SALE when a genuine promotional price is configured.

### Availability on product cards

Product cards do not show Available or Reserved badges.

- Available is the default and needs no label.
- Reserved status is communicated on the product detail page, alongside the enquiry options.
- Sold products show a SOLD OUT overlay on the image.
- A small SALE tag appears at the top-left of the image only when a genuine promotional price is active.

**Sold products**
- Remain visible in the catalogue.
- Prominent SOLD OUT overlay on image.
- Retain name and price.
- No purchase or inspection actions.

**Reserved products**
- No badge on the card; reserved status is shown on the product detail page.
- No image overlay.
- Retain price and specifications.
- Enquiries remain possible, subject to availability confirmation.

### Card hover feedback

- The gemstone image zooms gently.
- A slim navy "View details" bar slides up over the bottom of the image.
- The arrow beside the price fills navy.
- No card background or text colour change.
- No card borders, frames or shadows around the image.

## 10. Product Detail Pages

### Layout

- Two-column desktop layout.
- Image gallery on the left.
- Product information on the right.
- Mobile: image gallery first, details underneath.

### Image gallery

- Large main image.
- Thumbnail gallery below or alongside it.
- Clear active-thumbnail state.
- Smooth image switching.
- Contain images without cropping.
- Optional video support.
- Accessible controls.

### Product information

- Product name.
- Product ID.
- Availability status.
- Price and promotional pricing, if applicable.
- Gemstone specifications.
- Description.
- Origin and treatment information where verified and available.

### Specification presentation

- Clean specification grid.
- Two columns on desktop.
- Two columns on mobile where space permits; otherwise one.
- Subtle separators.
- Hide missing optional attributes.

### Enquiry actions

Stacked, full-width buttons:

1. Primary: WhatsApp Enquiry.
2. Secondary: Request an Inspection.

For sold products, disable or replace purchase/inspection actions with a clear sold-out message.

WhatsApp messages should include:
- Product name.
- Product ID.
- Product page URL.

## 11. Enquiry and Contact Interface

### Forms

Use consistent form styling throughout the website.

- White background.
- Clear labels.
- Inter typography.
- Subtle borders.
- 4–6px radius.
- Clear required-field indicators.
- Accessible validation messages.
- Clear submission and error states.

### Enquiry types

- General enquiry.
- Purchase enquiry.
- Inspection request.
- Certification request.

### Submission feedback

Show clear success and error messages.

A successful submission should confirm receipt, not imply that a purchase or reservation has been accepted.

## 12. Other Public Pages

### About Us

- Editorial heading.
- Clean text layout.
- Emphasis on gemstone selection, transparency and customer assistance.
- Avoid exaggerated or unsupported quality claims.

### How to Buy

- Clear three-step process:
  1. Browse
  2. Enquire
  3. Purchase
- Present viewing in person as an optional extra for customers in Colombo (by appointment), not as a main step.
- Explain viewing arrangements.
- Explain optional certification.
- Explain payment and delivery arrangements.
- Avoid implying that courier delivery is automatically available for loose gemstones.

### Contact

- Clear contact information.
- WhatsApp contact CTA.
- Business email.
- General location: Colombo, Sri Lanka.
- Instagram link.
- General enquiry form.

## 13. Homepage Visual Structure

The homepage should follow this order:

1. Hero section.
2. Featured Gemstones (initially four manually selected products).
3. Shop by Gemstone category cards.
4. Brand mission, with the three brand assurances.
5. Navy contact CTA.
6. How to Buy process.
7. Footer.

### Homepage category cards

- Four photographic category cards.
- Spinel, Garnet, Sapphire and Other Gemstones.
- Use real gemstone photography.
- Consistent presentation.

### Featured products

- Four manually selected gemstones initially.
- Four columns on desktop.
- Two columns on mobile.
- Reuse the approved product card component.

## 14. Footer

- Deep navy background.
- White and muted text.
- Aqua accents.
- Four-column desktop layout.
- Responsive stacked layout on mobile.

Suggested groups:

1. Brand introduction and logo.
2. Explore.
3. Gemstone categories.
4. Contact and social links.

Do not include newsletter, blog or announcement links at launch.

## 15. Animation and Motion

Use restrained animation throughout the website.

### Scroll reveal

- Subtle fade-in.
- Slight upward movement.
- Approximately 600–800ms where appropriate.
- Product cards may use a very slight stagger.

### Page navigation

- Instant navigation.
- No artificial page fade or slide transitions.

### Product interactions

- Subtle image zoom.
- Smooth hover transitions.

### Accessibility

Respect `prefers-reduced-motion`. Animations should never prevent access to content or functionality.

## 16. Responsive Design

Support:

- Large desktop.
- Standard desktop.
- Tablet.
- Mobile.

### Responsive rules

- Four-column catalogue on desktop.
- Three columns on smaller desktop/tablet where appropriate.
- Two columns on mobile.
- Sidebar becomes a mobile filter drawer.
- Hero stacks vertically on mobile.
- Product detail gallery appears above product information.
- Header becomes a mobile navigation menu.
- Buttons and form controls remain touch-friendly.
- Prevent horizontal overflow.
- Preserve image aspect ratios and readable typography.

## 17. Accessibility and Quality

- Semantic HTML.
- Keyboard-accessible navigation and controls.
- Visible keyboard focus states.
- Appropriate image alternative text.
- Accessible form labels and error messages.
- Sufficient colour contrast.
- Reduced-motion support.
- No interaction that relies exclusively on hover.
- Responsive layouts must remain usable with browser zoom.

## 18. Technical Design Tokens

Suggested initial CSS variables:

```css
:root {
  --color-navy: #071D3B;
  --color-aqua: #12B9DC;
  --color-white: #FFFFFF;
  --color-pale-blue: #EAF5FA;
  --color-border: #E5E7EB;
  --color-muted: #64748B;

  --font-heading: "Cormorant Garamond", serif;
  --font-body: "Inter", sans-serif;

  --radius-small: 5px;
  --radius-card: 5px;

  --container-width: 1360px;
  --catalogue-sidebar-width: 250px;

  --transition-fast: 200ms ease;
  --transition-standard: 300ms ease;
}
```

These are initial design tokens. They may be adjusted during implementation to maintain consistency and responsive behaviour.

## 19. Final Design Direction

The finished Serendib Gem House website should feel like a carefully curated online gemstone gallery.

The gemstone photography should remain the centre of attention. Typography, whitespace, colours and interactions should support the products rather than compete with them.

The design must be premium, approachable, trustworthy, responsive and practical for a catalogue-first gemstone business.

**Implementation principle:** Build reusable components and centralised design tokens. Avoid one-off styling decisions that create inconsistencies between pages.