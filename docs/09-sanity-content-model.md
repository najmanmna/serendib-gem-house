# Serendib Gem House — Sanity Content Model (Revision)

**Document:** `09-sanity-content-model.md`  
**Version:** 1.1

## 1. Overview

Sanity will manage only content that requires regular business updates or administrative management.

Static informational pages will be maintained directly in the Next.js codebase.

### Content managed through Sanity

| Document | Purpose |
|---|---|
| Product | Gemstone listings and inventory |
| Category | Gemstone categories |
| Site Settings | Business contact information and global settings |
| Homepage | Homepage content and featured products |
| Enquiry | Customer enquiries |
| Enquiry Note | Private administrator notes |
| Enquiry History | Enquiry status changes |

### Content managed through Next.js

| Page | Management |
|---|---|
| About Us | Static Next.js page |
| How to Buy | Static Next.js page |
| Contact | Next.js page using contact details from Site Settings |

About Us and How to Buy will not have Sanity schemas.

## 2. Product Schema

**Document type:** `product`

Stores individual gemstone listings.

Fields:

- Product ID.
- Product name.
- Slug.
- Description.
- Category reference.
- Regular price.
- Optional sale price.
- Optional promotion dates.
- Currency.
- Gemstone type.
- Weight.
- Colour.
- Shape/cut.
- Origin.
- Treatment.
- Dimensions.
- Certification information.
- Availability.
- Product images.
- Optional videos.
- Featured status.
- Created date.
- Updated date.
- SEO information.

Product ID format: `SGH-0001`.

Requirements:
- Automatically generated.
- Unique and permanent.
- Never reused.
- Not editable through normal product editing.

## 3. Category Schema

**Document type:** `category`

Fields:

- Category name.
- Slug.
- Description.
- Category image.
- Display order.
- Active status.
- SEO information.

Initial categories:

- Spinel.
- Garnet.
- Sapphire.
- Other Gemstones.

## 4. Site Settings Schema

**Document type:** `siteSettings`

Use one primary settings document.

Fields:

- Business name.
- Main logo.
- White logo.
- Default SEO title.
- Default SEO description.
- Default social sharing image.

Do not store API keys or private credentials here.

Business contact details (WhatsApp number, email, Instagram URL) and the general location are not managed in Sanity. They are set once in the Next.js codebase (`src/lib/site-config.ts`) and used throughout the website from there.

## 5. Homepage Schema

**Document type:** `homepage`

Use one singleton document.

Fields:

### Hero
- Heading.
- Supporting description.
- Hero image.
- Primary CTA label and destination.
- Secondary CTA label and destination.

### Brand introduction
- Section heading.
- Description.
- Optional image.

### Category section
- Section heading.
- Supporting text.

Category cards retrieve their information from Category documents.

### Featured products
- Section heading.
- Supporting text.
- References to selected Product documents.

Initially display four featured gemstones.

### How to Buy introduction
- Section heading.
- Supporting text.

The actual four buying steps are maintained in Next.js.

### Contact CTA
- Heading.
- Description.
- Button label.

## 6. Enquiry Schema

**Document type:** `enquiry`

Fields:

- Enquiry reference.
- Enquiry type.
- Customer name.
- Customer email.
- Customer phone.
- Related product reference.
- Product ID snapshot.
- Subject.
- Message.
- Preferred inspection date.
- Preferred inspection time.
- Status.
- Submission timestamp.

Enquiry types:

- General.
- Purchase.
- Inspection.
- Certification.

Statuses:

- New.
- Contacted.
- In Discussion.
- Completed.
- Cancelled.

Enquiry documents must remain private and accessible only to authorised administrators.

## 7. Enquiry Note Schema

**Document type:** `enquiryNote`

Fields:

- Related enquiry.
- Note.
- Administrator identity.
- Created date.

Notes are private and must never appear on the public website.

## 8. Enquiry History Schema

**Document type:** `enquiryHistory`

Fields:

- Related enquiry.
- Previous status.
- New status.
- Administrator identity.
- Change date.
- Optional description.

Use this to maintain a history of important enquiry changes.

## 9. Static Next.js Pages

### About Us

Route: `/about`

Maintain the following directly in the Next.js codebase:

- Page heading.
- Brand introduction.
- Business story.
- Business values.
- Supporting images.

Content should communicate trust and transparency without making unsupported claims.

### How to Buy

Route: `/how-to-buy`

Maintain the following directly in the Next.js codebase:

- Page introduction.
- Four buying steps.
- Enquiry instructions.
- Inspection arrangements.
- Certification information.
- Delivery information.
- Contact CTA.

These details should reflect the actual business policies.

### Why static content?

- No need for frequent editing.
- Easier implementation.
- No unnecessary CMS complexity.
- Consistent design and layout.
- Content changes can be made through GitHub and deployed through GitHub Actions.

## 10. Reusable Sanity Objects

Recommended reusable objects:

- Pricing.
- Gemstone Specifications.
- Certification.
- SEO.
- Social Link.
- Hero Section.
- Product Image.

Do not create reusable objects for static page content unless they are genuinely needed elsewhere.

## 11. Relationships

- Product → Category.
- Homepage → Featured Products.
- Enquiry → Product.
- Enquiry Note → Enquiry.
- Enquiry History → Enquiry.

Use Sanity references rather than duplicating entire documents.

Store snapshots where historical information needs to remain unchanged, such as Product ID and product name at enquiry submission.

## 12. Final Sanity Studio Navigation

```text
Serendib Gem House
│
├── Products
├── Categories
├── Featured Products
│
├── Enquiries
│   ├── All Enquiries
│   └── Enquiry Notes / History
│
├── Website Content
│   ├── Homepage
│   └── Business Settings
```

About Us and How to Buy are excluded from Studio.

## 13. Final Content Management Principle

Sanity should only manage content that benefits from being editable through the CMS.

Next.js should manage stable informational pages and their layouts.

This keeps the CMS lean and avoids introducing unnecessary content-management complexity.