# Serendib Crown Gems — Product Catalogue Specification

**Document:** `04-product-catalogue.md`  
**Status:** Initial specification  
**Version:** 1.0

---

## 1. Catalogue Overview

The Serendib Crown Gems catalogue is a public-facing gemstone inventory designed to let customers discover gemstones, compare available products and submit enquiries.

The catalogue is enquiry-led rather than a conventional e-commerce store.

Customers can:
- Browse all listed gemstones.
- Explore gemstone categories.
- Search by gemstone name or Product ID.
- Filter and sort products.
- View detailed gemstone information.
- Enquire about individual gemstones through WhatsApp or website forms.
- Request inspections and optional certification.

Customer registration, shopping carts, checkout and online payment are outside the initial launch scope.

## 2. Product Identification

Every gemstone must have a unique Product ID.

### Product ID format

Recommended format:

`SGH-0001`

Examples:
- SGH-0001
- SGH-0002
- SGH-0003

### Rules

- Automatically generate Product IDs when products are created.
- IDs must be unique.
- IDs must never be reused.
- IDs must remain unchanged even if a product name, price or category changes.
- Display Product IDs on product detail pages (catalogue cards omit them for a cleaner look).
- Include Product IDs in WhatsApp messages, enquiries and admin records.
- Product IDs should not expose internal supplier information.

## 3. Product Data Structure

The catalogue must support flexible product information because gemstone attributes vary between products.

### Required information

| Field | Requirement |
|---|---|
| Product ID | Automatically generated |
| Product name | Required |
| Price | Required for public listings |
| Currency | LKR |
| Availability | Required |
| Main image | At least one image required for publication |
| Category | Required |
| Publication status | Draft or Published |

A product must not be published unless all required information is valid.

### Optional gemstone information

| Attribute | Example |
|---|---|
| Gemstone type | Spinel |
| Weight | 2.15 |
| Weight unit | Carat |
| Colour | Blue |
| Shape/cut | Oval |
| Origin | Sri Lanka |
| Treatment | Heated / Unheated / Unknown |
| Dimensions | 8.2 × 6.1 × 4.0 mm |
| Description | Natural gemstone description |
| Certification | Available / Not available |
| Certificate details | Issuing laboratory and certificate reference |

Additional attributes should be supported in the future without requiring a complete redesign of the product structure.

### Important data rules

- Do not invent or assume gemstone attributes.
- Unknown origin must remain unspecified.
- Unknown treatment must not be presented as untreated.
- Only verified information should appear as factual product claims.
- Weight should support decimal values.
- Dimensions should support multiple measurements.
- Optional attributes should be hidden when not provided.
- Certification must only be advertised when documentation is actually available.

## 4. Product Categories

Initial categories:

1. Spinel
2. Garnet
3. Sapphire
4. Other Gemstones

### Category behaviour

- Every product must belong to one primary category.
- Categories must be manageable through the admin dashboard.
- Category names and descriptions should be editable.
- Each category can have its own photograph.
- Category cards link to filtered catalogue results.
- Future categories should be addable without changing the core catalogue architecture.

## 5. Product Availability

Every product must have one of three availability statuses.

### Available

- Product is currently available for enquiry.
- WhatsApp Enquiry button enabled.
- Inspection request enabled.

### Reserved

- Product is provisionally reserved.
- Display RESERVED badge.
- Product remains publicly visible.
- Price and specifications remain visible.
- Enquiries are allowed, but customers must be informed that availability requires confirmation.
- Admin can manually update the status.

### Sold

- Product is no longer available.
- Display SOLD OUT badge.
- Show a prominent SOLD OUT overlay on the product image.
- Product remains visible in the public catalogue.
- Product detail page remains accessible.
- Disable purchase and inspection actions.
- Do not delete the product record.

Keeping sold products visible provides a record of previous inventory and demonstrates the range of gemstones handled by the business.

## 6. Product Publication

Products have two separate administrative concepts:

**Publication status**
- Draft
- Published

**Availability status**
- Available
- Reserved
- Sold

This distinction is important.

For example, a gemstone can be:
- Draft + Available
- Published + Available
- Published + Reserved
- Published + Sold

Draft products must never appear publicly.

Published products remain publicly accessible according to their availability status.

## 7. Product Pricing

All launch prices are in Sri Lankan Rupees.

### Standard pricing

Example:

`LKR 125,000`

### Promotional pricing

Products can optionally have:
- Regular price.
- Sale price.
- Promotional start date.
- Promotional end date.

When a valid sale is active:
- Display the sale price prominently.
- Display the original price underneath with a strikethrough.
- Display a subtle aqua SALE badge.

When no valid sale is active, show the regular price only.

### Pricing rules

- Sale price must be lower than the regular price.
- Prices must be non-negative.
- Do not automatically change prices without an admin action.
- Expired promotions should stop displaying automatically.
- All public prices should use consistent LKR formatting.

## 8. Product Images and Media

Gemstone photography is a central part of the catalogue.

### Image requirements

- At least one image for every published product.
- Multiple images supported.
- One image designated as the main image.
- Images can be reordered.
- Images can be replaced or removed.
- Maintain original image quality.
- Generate optimised image sizes for website performance.
- Preserve gemstone colour accuracy.
- Do not crop or distort gemstone photography.

### Image presentation

- Square 1:1 containers in catalogue cards.
- Pure white image background.
- `object-fit: contain`.
- Main product detail image with thumbnail gallery.
- Responsive image sizes.
- Lazy loading for below-the-fold images.

### Image management

Administrators should be able to:
- Upload images.
- Preview images.
- Select the main image.
- Reorder images.
- Replace images.
- Remove images.
- Add descriptive alt text.

### Video support

Optional product videos should be supported where appropriate.

Videos must not be required for publication.

## 9. Product Search

Provide catalogue search by:

- Product name.
- Product ID.

### Search behaviour

- Case-insensitive search.
- Partial matches supported.
- Search should work with or without hyphens in Product IDs where practical.
- Display a clear empty state when there are no results.
- Search should work alongside active filters.

## 10. Product Filtering

The catalogue should support multiple simultaneous filters.

### Available filters

**Category**
- Spinel
- Garnet
- Sapphire
- Other Gemstones

**Price**
- Minimum price.
- Maximum price.
- LKR.

**Colour**
- Blue
- Red
- Pink
- Purple
- Green
- Yellow
- White
- Black
- Other

**Carat weight**
- Minimum weight.
- Maximum weight.

**Shape/cut**
- Oval
- Round
- Cushion
- Pear
- Emerald
- Marquise
- Radiant
- Princess
- Other

**Origin**
- Sri Lanka
- Madagascar

Only verified origins should be available for filtering.

### Filter behaviour

- Multiple filters can be combined.
- Multiple colours and shapes can be selected.
- Removing one filter must preserve the others.
- Provide Clear All Filters.
- Show selected filters as removable chips.
- Preserve active filters when sorting or loading additional products.
- Products with missing optional attributes should not incorrectly match those attribute filters.

## 11. Sorting

Supported sorting:

1. Newest first.
2. Price: Low to High.
3. Price: High to Low.

Default sorting is Newest first.

Sorting should not reset search terms or selected filters.

## 12. Catalogue Pagination

Use a Load More approach.

- Initially display 12 products.
- Load additional products when requested.
- Preserve current search, filters and sorting.
- Display the number of currently visible results.
- Hide the Load More button when all matching products are displayed.

The implementation should avoid loading the entire inventory unnecessarily.

## 13. Featured Products

The homepage should initially display four featured gemstones.

### Management

- Admin manually selects featured products.
- Featured products can be reordered.
- Only published products can be featured.
- Sold products should not be included in the featured selection by default.
- If a featured product becomes sold, remove it from the active featured selection or allow the admin to replace it.
- No automatic recommendation algorithm is required at launch.

## 14. Related Products

Product detail pages should display related gemstones.

Recommended initial behaviour:
- Prefer products from the same category.
- Exclude the current product.
- Prioritise available products.
- Display up to four related products.
- If the same category has insufficient products, include other available gemstones.

Related products do not need to be manually selected initially.

## 15. Product URLs and SEO

Every published gemstone must have a unique, SEO-friendly URL.

Recommended structure:

`/gemstones/blue-sapphire-sgh-0001`

### Rules

- Use lowercase URLs.
- Use hyphens between words.
- Include the Product ID to help maintain uniqueness.
- Product URLs must remain stable.
- If a product name changes, avoid breaking existing links.
- Provide appropriate metadata for every product.
- Generate structured product information where appropriate.
- Include published product pages in the sitemap.

## 16. Product Enquiry Integration

Every available gemstone should support product-specific enquiries.

### WhatsApp enquiry

Automatically include:
- Product name.
- Product ID.
- Product page URL.

Example message:

Hello, I am interested in the following gemstone:

Product: Blue Sapphire  
Product ID: SGH-0001  
Product page: [Product URL]

Could you please provide more information?

### Website enquiry

Product detail pages should provide a purchase enquiry form and an inspection request option.

Enquiries must be associated with the relevant Product ID in the admin dashboard.

### Availability handling

- Available: normal enquiry.
- Reserved: enquiry allowed, availability confirmation required.
- Sold: purchase enquiry and inspection actions disabled.

## 17. Admin Inventory Requirements

Administrators must be able to:

- Create products.
- Edit products.
- Save products as drafts.
- Publish products.
- Unpublish products.
- Change availability status.
- Update prices.
- Configure promotional pricing.
- Manage categories.
- Upload and manage product media.
- Assign product attributes.
- Feature and reorder products.
- Search products by name or Product ID.
- Filter inventory by category and availability.
- View product enquiry history.

Product deletion should require confirmation.

Prefer archiving or unpublishing products over permanent deletion to preserve historical records.

## 18. Catalogue Performance

The catalogue should remain fast as inventory grows.

Implementation requirements:

- Server-side or database-backed pagination.
- Efficient search and filtering.
- Optimised image delivery.
- Lazy-loaded images where appropriate.
- Responsive image sizes.
- Avoid loading unnecessary product media.
- Use sensible caching.
- Keep product detail pages independently accessible and indexable.

## 19. Future Enhancements

The catalogue architecture should allow future additions:

- Additional gemstone categories.
- More colours and shapes.
- Additional origins.
- Additional gemstone attributes.
- Certificate document uploads.
- More advanced inventory reporting.
- International currencies.
- Customer accounts, if ever required.
- Advanced product recommendations.

These are not required for the initial launch.

---

## 20. Final Catalogue Principles

The catalogue must be:

1. Flexible enough for different gemstone types.
2. Accurate and transparent.
3. Easy for administrators to maintain.
4. Easy for customers to browse.
5. Optimised for search engines.
6. Consistent with the approved brand design.
7. Enquiry-led rather than checkout-led.
8. Scalable for future inventory growth.

**Implementation principle:** Product data must be structured and reusable. Do not hardcode gemstone-specific attributes or assume every gemstone has the same available information.