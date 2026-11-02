# Serendib Gem House — Product Detail Page Specification

**Document:** `05-product-details.md`  
**Status:** Initial specification  
**Version:** 1.0

---

## 1. Overview

Every published gemstone must have its own dedicated product detail page.

The page should provide customers with sufficient information to understand the gemstone, inspect its photographs, review its specifications and enquire about purchasing or arranging an inspection.

The experience should feel like viewing a gemstone in a premium online gallery rather than browsing a conventional e-commerce product page.

### Primary objectives

- Present each gemstone professionally.
- Display accurate product information.
- Showcase real gemstone photography.
- Make pricing and availability clear.
- Explain certification and inspection options.
- Encourage direct customer enquiries.
- Provide a straightforward WhatsApp enquiry experience.

## 2. URL Structure

Recommended URL:

`/gemstones/blue-sapphire-sgh-0001`

### URL requirements

- Lowercase and SEO-friendly.
- Include a descriptive gemstone slug.
- Include the unique Product ID.
- Remain stable after publication.
- Changing the product name must not unnecessarily break existing URLs.
- Old URLs should redirect to the current URL if a slug change is unavoidable.

## 3. Desktop Page Layout

Use a two-column editorial layout.

**Left column:**
- Main gemstone photograph.
- Thumbnail gallery.
- Optional product video.

**Right column:**
- Breadcrumb navigation.
- Availability badge.
- Product name.
- Product ID.
- Price and promotional pricing.
- Short product description.
- Key gemstone specifications.
- Purchase enquiry button.
- Inspection request button.
- Certification information where applicable.

The layout should have generous spacing and a balanced visual hierarchy.

## 4. Mobile Page Layout

On mobile, stack the page vertically in this order:

1. Breadcrumb navigation.
2. Availability status.
3. Product name and Product ID.
4. Image gallery.
5. Price.
6. Product description.
7. Specifications.
8. Purchase enquiry.
9. Inspection request.
10. Certification information.
11. Additional product information.
12. Related gemstones.

Keep the WhatsApp enquiry action easy to access without covering important product information.

## 5. Breadcrumb Navigation

Display a simple breadcrumb above the main product content.

Example:

Home / Gemstones / Sapphire / Blue Sapphire

Requirements:
- All parent items should be clickable.
- Current product name should be the final item.
- Use small, muted Inter typography.
- Avoid oversized or decorative breadcrumb elements.

## 6. Product Header

The product header should include:

- Availability status.
- Gemstone name.
- Product ID.

### Product name

- Cormorant Garamond.
- Large editorial heading.
- Deep navy.
- Clear and readable.

### Product ID

- Small muted Inter text.
- Example: `Product ID: SGH-0001`.

### Availability

Use the approved status badges:

- AVAILABLE
- RESERVED
- SOLD OUT

Maintain consistent badge colours and styling throughout the website.

## 7. Product Image Gallery

Gemstone photography is one of the most important elements of the detail page.

### Main image

- Large image display.
- Pure white background.
- Square aspect ratio where practical.
- `object-fit: contain`.
- No cropping or distortion.
- Accurate gemstone colour representation.

### Thumbnail gallery

- Display thumbnails beneath the main image.
- Clearly identify the active image.
- Clicking a thumbnail changes the main image.
- Smooth image switching.
- Responsive thumbnail layout.

### Image interactions

- Optional desktop zoom or lightbox for inspecting gemstone details.
- Touch-friendly mobile gallery.
- Keyboard-accessible gallery controls.
- Appropriate image alt text.
- No unnecessary decorative frames.

### Image management

Administrators should be able to:
- Upload multiple images.
- Choose the main image.
- Reorder images.
- Replace or remove images.
- Add descriptive alternative text.

### Videos

- Optional video support.
- Display videos separately from image thumbnails or clearly distinguish them.
- Videos should not autoplay with sound.
- Use optimised delivery.

If only one image is available, the gallery should still look complete and balanced.

## 8. Product Pricing

Display the gemstone price clearly in LKR.

Example:

`LKR 125,000`

### Pricing hierarchy

- Prominent Inter typography.
- Deep navy.
- Positioned near the product name and primary information.

### Promotional pricing

When an active sale is configured:

- Display a subtle aqua SALE badge.
- Display the current sale price prominently.
- Show the original price beneath it with a strikethrough.
- Use consistent styling with catalogue cards.

Do not display an inactive or expired promotional price.

### Price availability

A price is required for published products.

If a product price needs to be revised, the administrator must update it manually.

## 9. Product Description

Provide a short, informative description of the gemstone.

The description should explain relevant characteristics without making unsupported claims.

Possible content:
- Gemstone type.
- Colour and appearance.
- Cut and visual characteristics.
- Weight.
- Origin, when verified.
- Treatment information, when verified.
- Other distinguishing features.

### Content rules

- Avoid exaggerated marketing language.
- Do not claim a gemstone is untreated without reliable confirmation.
- Do not claim a specific origin without sufficient verification.
- Do not make unsupported investment or resale-value claims.
- Avoid generic descriptions that do not reflect the actual gemstone.

## 10. Gemstone Specifications

Display available gemstone attributes in a clean specification grid.

### Possible fields

| Attribute | Example |
|---|---|
| Gemstone | Sapphire |
| Weight | 2.15 ct |
| Colour | Blue |
| Shape/Cut | Oval |
| Origin | Sri Lanka |
| Treatment | Unheated / Heated / Unknown |
| Dimensions | 8.2 × 6.1 × 4.0 mm |
| Certification | Certified / Not certified / Pending |

### Presentation

- Two-column specification grid on desktop.
- Two columns on mobile where space permits.
- One column on narrower screens when necessary.
- Subtle separators.
- Clear labels and values.
- Hide unavailable optional attributes.

The grid must adapt to different gemstone types and optional attributes.

Do not force every gemstone to have the same specifications.

## 11. Origin and Treatment Information

Origin and treatment are important gemstone details.

### Origin

- Display only when known and sufficiently verified.
- Do not automatically assign Sri Lankan origin based on the business location.
- Origin can include Sri Lanka, Madagascar or other countries as appropriate.
- Unknown origin should remain unspecified.

### Treatment

Possible values:
- Heated.
- Unheated.
- Other disclosed treatment.
- Unknown.

Treatment information must be accurate and transparent.

Never automatically treat missing information as proof of an untreated gemstone.

## 12. Certification Information

Certification is optional and may involve an additional customer cost.

### Certification states

Support the following states:

- Certified.
- Not certified.
- Certification available on request.
- Certification pending.

Only display the relevant state.

### If already certified

Where documentation exists, optionally display:
- Issuing laboratory.
- Certificate reference.
- Issue date.
- Relevant verification link.
- Certificate document or image.

### If certification is requested

Explain that:
- Certification is optional.
- It may involve additional fees.
- The laboratory, cost and turnaround must be confirmed before proceeding.
- The customer must approve the arrangement.

Do not imply that every gemstone is certified.

Do not use laboratory logos or claim independent certification without appropriate supporting documentation.

## 13. Availability Behaviour

### Available gemstones

Display:
- AVAILABLE badge.
- Price.
- WhatsApp Enquiry.
- Request an Inspection.

### Reserved gemstones

Display:
- RESERVED badge.
- Price.
- Enquiry option.

Include a short notice:

"This gemstone is currently reserved. Please contact us to confirm its latest availability."

Inspection requests may be accepted as enquiries but must not imply the reservation is available for purchase.

### Sold gemstones

Display:
- SOLD OUT badge.
- Prominent SOLD OUT image overlay.
- Product name.
- Product ID.
- Original listed price.

Disable:
- Purchase enquiry.
- Inspection request.
- Any action suggesting that the gemstone is available for sale.

Display a message:

"This gemstone has been sold. You are welcome to contact us about similar gemstones."

Provide a link to the gemstone catalogue or WhatsApp contact for similar products.

Do not remove sold product pages from the website.

## 14. Purchase Enquiry

The primary action is WhatsApp Enquiry.

### Button

- Full width.
- Deep navy background.
- White text.
- Subtle corner rounding.
- Clear WhatsApp icon.

### Automatic WhatsApp message

Example:

Hello, I am interested in purchasing this gemstone.

Product: Blue Sapphire  
Product ID: SGH-0001  
Listed Price: LKR 125,000  
Product URL: [Product URL]

Could you please provide more information?

### Behaviour

- Open the official WhatsApp conversation link.
- Use the configured business WhatsApp number.
- Pre-fill the product-specific message.
- Keep the customer free to edit the message before sending.

The website must not imply that clicking the WhatsApp button completes a purchase.

## 15. Inspection Request

Provide a secondary action:

**Request an Inspection**

Customers can request an in-person inspection by appointment in Colombo District.

### Inspection form fields

- Name.
- Email.
- WhatsApp/contact number.
- Product ID (automatically populated).
- Preferred date.
- Preferred time.
- Additional message.

### Important information

Display a short note:

"In-person gemstone inspections are available by appointment in Colombo District. Please contact us to arrange a suitable time and location."

Do not publish a permanent shop address or imply walk-in availability.

Submitting an inspection request does not confirm an appointment.

The business must contact the customer to confirm the arrangement.

## 16. Certification Request

Allow customers to enquire about obtaining certification.

### Form fields

- Name.
- Email.
- Contact number.
- Product ID.
- Preferred laboratory, if known.
- Additional message.

The business should confirm:
- Available laboratory.
- Certification fee.
- Expected turnaround.
- Any transport or handling arrangements.

Certification should proceed only after the customer approves the proposed arrangements.

## 17. Additional Information Sections

Where appropriate, include expandable information sections.

Suggested sections:

- Gemstone Details.
- Origin and Treatment.
- Certification Information.
- Inspection and Purchase.
- Delivery Information.

Use clean accordion components with subtle separators.

Do not show empty sections.

## 18. Related Gemstones

Display up to four related gemstones near the bottom of the page.

### Selection rules

- Prefer products from the same gemstone category.
- Exclude the current product.
- Prioritise available products.
- Include other categories if insufficient related products exist.
- Use the approved product card design.

Related gemstones should help customers continue browsing.

## 19. WhatsApp and Floating Contact Button

The public website includes a floating WhatsApp contact button.

On product detail pages:
- Use the general WhatsApp message for general enquiries.
- Use product-specific messaging for the product enquiry button.
- Avoid overlapping the floating button with fixed or sticky page controls.

On mobile, ensure floating elements do not cover the primary enquiry buttons or essential content.

## 20. SEO and Social Sharing

Each published product page should have:

- Unique page title.
- Unique meta description.
- Canonical URL.
- Open Graph title and description.
- Product image for social sharing.
- Appropriate structured data where applicable.

### Suggested title format

`Blue Sapphire | Serendib Gem House`

### Suggested description

`Explore this Blue Sapphire gemstone at Serendib Gem House. View its specifications, listed price and availability, or contact us for an enquiry.`

Descriptions should be generated from actual product data and not contain invented characteristics.

Only publish appropriate product structured data based on accurate information. Do not imply online checkout or stock guarantees.

## 21. Performance and Accessibility

- Optimised image delivery.
- Responsive image sizes.
- Lazy-load secondary images.
- Load the primary product image with suitable priority.
- Avoid unnecessary scripts.
- Keyboard-accessible gallery controls.
- Accessible buttons and forms.
- Appropriate image alternative text.
- Clear form validation and submission feedback.
- Respect reduced-motion settings.
- Ensure readable text contrast.

## 22. Final Product Detail Page Principles

Every gemstone detail page must:

1. Showcase the actual gemstone clearly.
2. Display accurate and verified information.
3. Make pricing and availability transparent.
4. Explain optional certification honestly.
5. Provide clear enquiry and inspection options.
6. Work consistently across desktop and mobile.
7. Remain accessible after a gemstone is sold.
8. Encourage direct customer communication.

**Implementation principle:** Use a reusable dynamic product detail template. Every gemstone should use the same core layout while displaying only the attributes and media available for that particular product.