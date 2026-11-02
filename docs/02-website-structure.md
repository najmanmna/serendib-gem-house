# Serendib Crown Gems — Website Structure

**Document:** 02-website-structure.md  
**Version:** 1.0  
**Status:** Approved — Initial Website Structure

---

## 1. Website Overview

The Serendib Crown Gems website will be a catalogue-first website designed to showcase gemstones, provide product information and generate customer enquiries.

The website should have a premium, minimal and editorial design.

The main focus should be on gemstone photography, product discovery and a straightforward enquiry process.

The website will initially contain five primary pages:

1. Home
2. Gemstones
3. About Us
4. How to Buy
5. Contact

Individual gemstone detail pages will be generated dynamically.

---

## 2. Main Navigation

### Desktop Navigation

The main navigation will contain:

- Home
- Gemstones
- About Us
- How to Buy
- Contact

A WhatsApp contact action should also be available in the header.

### Header Behaviour

The header must be sticky.

When visitors scroll down:

- Keep the header visible.
- Transition to a slightly more compact appearance.
- Maintain the brand logo and navigation accessibility.

### Mobile Navigation

On mobile devices:

- Display a compact brand logo.
- Use a mobile navigation menu.
- Provide access to all five main pages.
- Include a WhatsApp contact action.
- Ensure the navigation is easy to use on small screens.

---

## 3. Homepage Structure

The homepage will contain seven main sections.

### Section 1: Hero

**Layout:** Split editorial layout.

The hero should use a two-column composition.

Left side:
- Main brand headline.
- Short introductory text.
- Primary CTA: Explore Gemstones.
- Secondary CTA: Contact Us.

Right side:
- Large, high-quality gemstone photograph.

Design requirements:
- White background.
- Deep navy typography.
- Restrained aqua accents.
- Elegant serif heading.
- Clean sans-serif supporting text.
- Generous whitespace.

Desktop should display the text and photograph side by side.

Mobile should use a vertically stacked layout.

The hero should immediately communicate that Serendib Crown Gems is a gemstone business.

### Section 2: Featured Gemstones

**Layout:** Four-product grid.

Display four manually selected gemstones.

Each product card should include:
- Main product image.
- Product name.
- Relevant specifications.
- Category.
- Price in LKR.
- Link to the individual product page.

Cards stay minimal: no Product ID or Available/Reserved labels (shown on the product page instead). Sold gemstones show a SOLD OUT overlay.

Product selection must be managed through the CMS.

Only products selected as featured by an administrator should appear.

The section should include a link to view the complete gemstone collection.

Desktop:
- Four columns where space allows.

Mobile:
- Two columns.

Product cards must remain visually clean and image-focused.

### Section 3: Shop by Gemstone

**Layout:** Four large photographic category cards.

Display the following categories:

1. Spinel
2. Garnet
3. Sapphire
4. Other Gemstones

Each category card should contain:
- A gemstone photograph.
- Category name.
- A subtle Explore link or arrow.
- Link to the corresponding filtered catalogue.

Use actual gemstone photography wherever available.

Cards should have consistent image proportions and a refined hover interaction.

### Section 4: Brand Mission and Why Serendib Crown Gems

**Layout:** Editorial text with three assurances, beside a photograph composition.

Lead with the brand mission: making fine gemstones accessible and affordable for everyone.

Include:
- A small "Our mission" label and a refined heading.
- One short line expressing the mission.
- Three assurances, each with an icon, a short title and a brief note (these replace a separate assurance band).

The three points should communicate:

1. Carefully selected gemstones.
2. Transparent product information.
3. Personal customer assistance.

Avoid lengthy company descriptions and unsupported quality claims.

### Section 5: Contact CTA

**Layout:** Full-width deep navy section.

Suggested message:

"Looking for something special?"

Supporting text:

"Get in touch and let us help you find the right gemstone."

Include:
- White typography.
- Aqua WhatsApp CTA button.
- Clear and concise supporting text.

The WhatsApp button should open a conversation with Serendib Crown Gems.

### Section 6: How to Buy

**Layout:** Three-step process with a separate optional note.

Display the following purchasing journey:

**Browse**

Explore the available gemstone collection, with photographs, details and prices in LKR.

**Enquire**

Contact Serendib Crown Gems through WhatsApp or a website enquiry form. Availability is confirmed and questions are answered.

**Purchase**

Pay by bank transfer or in person, then receive the gemstone through an arranged delivery or handover.

Each step should include:
- Simple icon.
- Short title.
- Brief description.

**Optional viewing (not a step)**

Viewing a gemstone in person is optional, for customers in Colombo who would like to see it before deciding, by appointment. Present it as a small side note beside the steps, not as part of the main journey.

Include a link to the complete How to Buy page.

This section must clearly communicate that purchasing is enquiry-based and not an instant online checkout process.

### Section 7: Footer

**Layout:** Four-column deep navy footer.

The footer should contain the following areas:

**Column 1 — Brand**

- Brand logo.
- Short brand description.

**Column 2 — Explore**

- Home.
- Gemstones.
- About Us.
- How to Buy.
- Contact.

**Column 3 — Gemstones**

- Spinel.
- Garnet.
- Sapphire.
- Other Gemstones.

**Column 4 — Contact and Social**

- WhatsApp.
- Business email.
- Colombo, Sri Lanka.
- Instagram.

Bottom bar:
- Copyright information.
- Serendib Crown Gems.
- Current year.

The footer must collapse into a clean responsive layout on mobile.

Do not include newsletter subscriptions, blog links or unnecessary footer sections at launch.

---

## 4. Floating WhatsApp Button

A floating WhatsApp button must be available throughout the public website.

Requirements:

- Fixed positioning near the bottom-right corner.
- Remain visible while scrolling.
- Use the official WhatsApp visual identity.
- Avoid covering important page content.
- Adapt positioning for mobile devices.
- Open the business WhatsApp conversation.

On individual gemstone pages, the WhatsApp message should automatically include:

- Product name.
- Product ID.
- Product page URL.

The WhatsApp number will be configured separately.

---

## 5. Gemstone Catalogue Page

**Route:** `/gemstones`

This page will display the complete public gemstone collection.

### Main Elements

- Page heading.
- Short introductory description.
- Search field.
- Filter controls.
- Sorting options.
- Product grid.
- Pagination or another suitable catalogue navigation approach.

### Search

Allow customers to search by:

- Gemstone name.
- Product ID.

### Filters

Support:

- Gemstone type.
- Price range.
- Colour.
- Shape / Cut.
- Carat weight.
- Origin.

Filters must handle optional attributes correctly.

Products must not be excluded simply because certain specifications are unavailable.

### Sorting

Support:

- Newest.
- Price: Low to High.
- Price: High to Low.

### Product Cards

Each product card should display:

- Main photograph.
- Product name.
- Relevant available specifications.
- Price in LKR.

Cards do not show the Product ID or Available/Reserved labels; both appear on the product detail page.

Sold products must remain visible with a SOLD OUT overlay.

---

## 6. Individual Gemstone Detail Page

**Route:** `/gemstones/[slug]`

Every gemstone must have its own dedicated product page.

### Page Structure

1. Breadcrumb navigation.
2. Product image gallery.
3. Product name.
4. Product ID.
5. Price in LKR.
6. Availability status.
7. Gemstone specifications.
8. Product description.
9. Purchase enquiry CTA.
10. Inspection request CTA.
11. Certification request option.
12. Related gemstones, where appropriate.

### Product Gallery

Support:
- Multiple images.
- Main image selection.
- Image navigation.
- Image zoom.
- Optional videos.

### Product Information

Display only the specifications populated by the administrator.

Possible attributes include:

- Gemstone type.
- Carat weight.
- Shape / Cut.
- Colour.
- Origin.
- Treatment.
- Dimensions.
- Additional attributes.

Do not display empty specification labels.

### Product Availability Behaviour

**Available:**
- Show purchase enquiry CTA.
- Show relevant inspection and certification options.

**Reserved:**
- Show RESERVED status.
- Allow customers to enquire about availability.

**Sold:**
- Show SOLD OUT status.
- Disable purchase and reservation requests.
- Keep the product information accessible.

### WhatsApp Enquiry

The WhatsApp enquiry message must include the product name and Product ID automatically.

---

## 7. About Us Page

**Route:** `/about`

The About Us page should introduce Serendib Crown Gems and communicate its business values.

Suggested content:

- Introduction to Serendib Crown Gems.
- Business background.
- Approach to selecting and presenting gemstones.
- Commitment to transparent product information.
- Customer service approach.

Avoid exaggerated or unsupported claims.

The page should use an editorial layout with refined typography and suitable gemstone imagery.

---

## 8. How to Buy Page

**Route:** `/how-to-buy`

This page should explain the complete customer purchasing process.

Suggested sections:

### Step 1: Explore the Catalogue

Browse the gemstone collection and review individual product information and prices.

### Step 2: Make an Enquiry

Contact the business through WhatsApp or the website enquiry form.

### Step 3: Payment

Payment arrangements will be confirmed directly with the customer.

Initial payment methods include bank transfer and agreed in-person payment.

### Step 4: Delivery or Collection

Arrange islandwide delivery where a suitable approved courier is available, or coordinate an in-person handover.

Clearly communicate that delivery arrangements are confirmed individually.

### Optional Extras

These are not part of the main buying process:

- **Viewing in person:** customers in Colombo may view a gemstone before deciding, by appointment.
- **Certification:** can be arranged for an additional cost, subject to laboratory availability.

---

## 9. Contact Page

**Route:** `/contact`

The contact page should provide all available business communication methods.

### Contact Information

- WhatsApp.
- Business email.
- Colombo, Sri Lanka.
- Instagram.

### Contact Form

Include a general enquiry form.

Potential fields:

- Customer name.
- Email address.
- WhatsApp / telephone number.
- Enquiry subject.
- Message.

The form should have appropriate validation and submission feedback.

Customer submissions must be stored and trigger administrator and customer email notifications.

---

## 10. Global Website Elements

The following elements should be shared across public pages:

- Main navigation header.
- Footer.
- Floating WhatsApp button.
- Consistent typography.
- Consistent colour palette.
- Responsive spacing and layout.
- SEO metadata support.

The admin dashboard should use a separate layout and navigation system from the public website.

---

## 11. Responsive Design

The website must support:

- Desktop.
- Laptop.
- Tablet.
- Mobile.

Mobile design must be considered throughout development, not treated as a final adjustment.

Important requirements:

- Responsive navigation.
- Proper image scaling.
- Readable typography.
- Comfortable touch targets.
- Responsive product grids.
- Mobile-friendly filter controls.
- No horizontal overflow.
- Properly positioned WhatsApp actions.

---

## 12. Design Principles

The website must follow the approved brand identity in `01-brand-identity.md`.

Core principles:

1. Premium and minimal.
2. Gemstone photography as the primary visual focus.
3. Elegant serif headings.
4. Clean sans-serif body typography.
5. Deep navy as the dominant brand colour.
6. Aqua as a restrained accent.
7. Generous whitespace.
8. Clear customer journeys.
9. Subtle transitions and interactions.
10. Consistent responsive behaviour.

Avoid unnecessary sections, excessive decoration and complicated interactions.

---

## 13. Out of Scope

The following are not part of the initial website structure:

- Shopping cart.
- Checkout.
