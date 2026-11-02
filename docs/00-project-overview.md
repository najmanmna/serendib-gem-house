# Serendib Gem House — Project Overview

**Document:** 00-project-overview.md  
**Project:** Serendib Gem House Website  
**Document Status:** Approved — Business Requirements  
**Version:** 1.0

---

## 1. Project Introduction

Serendib Gem House is an online gemstone business based in Sri Lanka.

The business offers a selection of loose gemstones, including spinels, garnets, sapphires and other varieties, across different price ranges.

The objective is to establish a professional online presence through a premium, trustworthy and easy-to-use gemstone catalogue.

The website will allow customers to explore available gemstones, view detailed product information and prices, and contact Serendib Gem House to make purchase enquiries.

The website will initially target customers in Sri Lanka.

**Mission:** to make fine gemstones accessible and affordable for everyone.

## 2. Primary Website Objective

The primary purpose of the website is to serve as an online gemstone catalogue and customer enquiry platform.

The website is NOT intended to operate as a traditional e-commerce store at launch.

Customers should be able to:

- Browse the available gemstone collection.
- Search and filter gemstones.
- View individual gemstone details and photographs.
- Check product prices in LKR.
- Enquire about purchasing a gemstone.
- Request an in-person inspection.
- Request gemstone certification.
- Contact the business through WhatsApp or website forms.

All purchases will be handled manually through customer enquiries.

## 3. Business Identity

| Attribute | Details |
|---|---|
| Business name | Serendib Gem House |
| Business model | Online gemstone business |
| Primary market | Sri Lanka |
| Primary currency | Sri Lankan Rupees (LKR) |
| Website language | English |
| Brand positioning | Premium yet accessible |
| Physical showroom | No permanent showroom |
| Inspections | By appointment |

The brand must not be positioned exclusively around Sri Lankan gemstones. The inventory may include gemstones from Sri Lanka, Madagascar and other origins.

Gemstone origin must only be published when it is known and sufficiently verified.

## 4. Target Customers

The website should cater to:

- Individuals interested in purchasing gemstones.
- First-time gemstone buyers.
- Gemstone enthusiasts and collectors.
- Customers looking for affordable gemstones.
- Customers interested in premium gemstones.
- Jewellery makers and other potential gemstone buyers.

The website should be approachable to first-time buyers while maintaining a professional presentation suitable for experienced gemstone customers.

## 5. Product Catalogue

### 5.1 Initial Categories

The initial gemstone categories are:

1. Spinel
2. Garnet
3. Sapphire
4. Other Gemstones

The category structure must be flexible enough to accommodate additional gemstone types in the future.

### 5.2 Product Identification

Every gemstone must have a unique Product ID.

Product IDs should be automatically generated and remain consistent throughout the product's lifetime.

### 5.3 Product Information

Product attributes must be flexible and optional, allowing administrators to select the relevant information for each gemstone.

Initial supported attributes:

- Product name
- Product ID
- Gemstone type
- Carat weight
- Shape / Cut
- Colour
- Origin
- Treatment
- Price
- Dimensions
- Description
- Images
- Videos
- Availability status

Additional attributes should be supported in the future without requiring a complete redesign of the catalogue.

At least one product image is required.

Prices must be displayed publicly for listed products.

### 5.4 Product Availability

Each product must have one of the following statuses:

**Available**
- Display the regular product information.
- Show the price.
- Allow purchase enquiries.

**Reserved**
- Display a RESERVED label.
- Customers may still enquire about the gemstone.
- Availability must be confirmed by the administrator.

**Sold**
- Keep the product visible in the public catalogue.
- Display a prominent SOLD OUT overlay.
- Disable purchase and reservation requests.

Sold gemstones should remain in the catalogue to demonstrate the business's previous collections and experience.

### 5.5 Product Photography

Each gemstone must support multiple photographs.

Administrators should be able to:

- Upload multiple images.
- Select a primary image.
- Reorder images.
- Replace images.
- Remove images.

Product videos should be optional.

The product detail page should provide an attractive image gallery with zoom functionality.

## 6. Pricing and Promotions

All product prices must initially be displayed in LKR.

The website must support:

- Regular selling prices.
- Optional promotional prices.
- Original price display when a discount is active.
- SALE labels for discounted products.

Administrators must be able to manage promotional pricing through the CMS.

No customer-facing checkout or payment gateway is required at launch.

## 7. Customer Purchasing Process

Purchases will be enquiry-based.

The expected process is:

1. Customer discovers a gemstone.
2. Customer views the gemstone details and price.
3. Customer submits a purchase enquiry or contacts the business through WhatsApp.
4. Administrator confirms product availability.
5. Customer and administrator discuss the purchase.
6. Payment and collection/delivery arrangements are agreed.
7. The administrator updates the product availability.

The initial payment methods will be bank transfer or an agreed in-person payment arrangement.

## 8. Inspection and Certification

### 8.1 In-person Inspection

Customers must be able to request an in-person gemstone inspection.

Inspections will be arranged by appointment in Colombo District.

The website must not imply that a permanent retail showroom or walk-in service is available.

### 8.2 Gemstone Certification

Certification will be optional.

Customers may request certification for an additional cost.

The business will coordinate the certification process and confirm the laboratory, applicable fees and expected turnaround before proceeding.

The website must clearly distinguish certified gemstones from gemstones that have not been certified.

## 9. Delivery and Collection

The business intends to support:

- Islandwide delivery.
- In-person collection or handover arrangements.

Courier delivery must only be confirmed after obtaining written confirmation that the selected courier accepts loose gemstones and provides suitable liability and insurance terms.

The website should not promise unrestricted gemstone delivery before these arrangements are confirmed.

## 10. Customer Communication

The website must provide two primary communication methods:

1. WhatsApp
2. Website enquiry forms

WhatsApp product enquiries should automatically include the relevant product name and Product ID.

### 10.1 Website Forms

The website should support:

- General enquiries.
- Purchase enquiries.
- Inspection requests.
- Certification requests.

Forms should collect only the information necessary for the particular enquiry.

### 10.2 Email Notifications

When a customer submits a website enquiry:

- Store the enquiry in the administration system.
- Send an email notification to the business administrator.
- Send an acknowledgement email to the customer.

The customer email should confirm receipt of the enquiry, not imply that a purchase or reservation has been accepted.

### 10.3 Enquiry Management

Administrators must be able to view and manage enquiries through the admin dashboard.

Initial enquiry statuses:

- New
- Contacted
- In Discussion
- Completed
- Cancelled

Relevant enquiries should reference the associated gemstone Product ID.

## 11. Public Contact Information

The website should display:

- Business WhatsApp number.
- Business email address.
- General location: Colombo, Sri Lanka.
- Instagram profile link.
- Website contact form.

Exact contact details will be configured separately.

A private residential address must not be published.

## 12. Inventory and Administration

The website must include a secure private administration interface.

Administrators should be able to:

- Add new gemstones.
- Edit existing gemstones.
- Delete gemstone records.
- Upload and manage product images.
- Upload optional videos.
- Manage gemstone categories.
- Update prices.
- Apply promotional pricing.
- Change availability statuses.
- Select homepage featured gemstones.
- View and manage customer enquiries.

Only authorised administrators should have access to the management interface.

Customers do not need accounts or registration.

## 13. Homepage Product Management

Homepage product selection will be managed manually by administrators.

Potential homepage sections include:

- Featured Gemstones.
- New Arrivals.
- Special Offers.

Administrators should control which gemstones appear in these sections.

## 14. Search and Filtering

The public catalogue must support:

**Search**
- Gemstone name.
- Product ID.

**Filters**
- Gemstone type.
- Price range.
- Colour.
- Shape / Cut.
- Carat weight.
- Origin.

**Sorting**
- Newest.
- Price: Low to High.
- Price: High to Low.

Filtering must work correctly even when some optional product attributes are not populated.

## 15. Brand Positioning and Content

Serendib Gem House should communicate:

- Trustworthiness.
- Carefully selected gemstones.
- Quality and transparency.
- Professional, knowledgeable service.
- Accessibility across different price ranges.

The website must avoid unsupported claims regarding gemstone origin, treatment, natural status, quality or certification.

## 16. SEO and Search Engine Visibility

SEO must be considered from the initial development stage.

The website should support:

- Unique page titles and meta descriptions.
- Product-specific metadata.
- Search-engine-friendly URLs.
- XML sitemap.
- Robots.txt.
- Open Graph metadata.
- Social sharing previews.
- Appropriate structured data.
- Google Search Console integration readiness.

Product pages should be designed to be indexable by search engines.

## 17. Initial Website Language

The website will launch in English only.

The architecture should remain flexible enough to support Sinhala and Tamil in a future phase.

## 18. Explicitly Excluded from Initial Launch

The following features are not required for the initial release:

- Online shopping cart.
- Online checkout.
- Payment gateway integration.
- Customer registration and login.
- Customer account dashboard.
- Customer review and rating system.
- Blog or news section.
- Announcements management.
- International currency support.
- Multilingual content management.

These features may be considered in future development phases.

## 19. Future Expansion

The website should be designed with future growth in mind.

Potential future capabilities include:

- Full e-commerce functionality.
- Online payment integration, subject to provider approval.
- Customer accounts.
- Customer reviews and testimonials.
- Sinhala and Tamil language support.
- International sales.
- USD pricing.
- Additional gemstone categories.
- Additional product specifications.
- Advanced marketing and analytics.

Future expansion must not unnecessarily complicate the initial implementation.

## 20. Operational Items Requiring Confirmation

The following business arrangements must be verified before the corresponding services are activated:

1. Correct business registration and applicable NGJA licensing/trading arrangements.
2. Courier acceptance, insurance and liability conditions for loose gemstones.
3. Available certification laboratories, fees and turnaround times.
4. Business bank account and payment instructions.
5. Business email and transactional email delivery configuration.

These operational checks should be tracked separately from website development.

## 21. Project Success Criteria

The initial website will be considered successful when:

- Customers can browse the gemstone catalogue without registration.
- Every listed gemstone has a unique Product ID.
- Product information and images display correctly.
- Customers can search, filter and sort gemstones.
- Product availability is clearly communicated.
- Customers can submit purchase, inspection and certification enquiries.
- WhatsApp enquiries include the relevant Product ID.
- Admin and customer email notifications work correctly.
- Administrators can manage products and enquiries without editing code.
- The website is responsive across desktop, tablet and mobile.
- The website has appropriate SEO foundations.
- The overall design communicates trust, quality and professionalism.

---

**End of Document**

**Document ownership:** Serendib Gem House  
**Project status:** Requirements approved — Ready for brand identity and website planning.