# Serendib Crown Gems — CMS and Inventory Management

**Document:** `07-cms-and-inventory.md`  
**Status:** Revised specification  
**Version:** 2.0

---

## 1. Overview

Serendib Crown Gems will use **Sanity as its central Content Management System (CMS)**.

Sanity will manage:

- Gemstone products.
- Inventory availability.
- Product categories.
- Product images and videos.
- Featured gemstones.
- Website content.
- Customer enquiries.
- Business settings.

The public website will be developed using Next.js and will retrieve published content directly from Sanity.

**Important architectural decision:** Sanity Studio will serve as the administrator dashboard. A separate custom CMS inside the Next.js application is not required.

## 2. CMS Architecture

### Sanity Studio

Use Sanity Studio as the private content management interface.

Recommended approach:

- Host Studio through Sanity's hosted deployment.
- Restrict access to authorised project members.
- Use Sanity authentication and project permissions.
- Organise the Studio with a customised navigation structure.
- Provide useful document previews and validation.
- Use separate development and production datasets where practical.

The Studio should be simple enough for administrators to manage without technical knowledge.

### Public website

The Next.js application will retrieve the appropriate published content from Sanity.

Public visitors must not have access to private administrative records.

## 3. Administrator Access

### Access requirements

- Sanity account authentication.
- Only authorised project members can access Studio.
- No public administrator registration.
- Appropriate administrator permissions.
- Secure account recovery.
- Remove access when an administrator no longer requires it.

### Initial setup

Start with one administrator account.

Additional administrators can be invited through Sanity when required.

Use the least privileged access level appropriate for each administrator.

Do not share administrator credentials.

## 4. Studio Navigation

Organise Sanity Studio into the following sections:

1. Dashboard / Overview.
2. Gemstones.
3. Categories.
4. Featured Products.
5. Enquiries.
6. Website Content.
7. Business Settings.

Use clear labels, descriptions and document previews.

The Studio should prioritise everyday operations such as adding products, changing prices and updating availability.

## 5. Product Management

Create a dedicated Product document type.

### Product fields

**Basic information**
- Product name.
- Product ID.
- Slug.
- Description.
- Category reference.

**Pricing**
- Regular price.
- Optional sale price.
- Optional promotion start date.
- Optional promotion end date.
- Currency: LKR.

**Gemstone specifications**
- Gemstone type.
- Weight.
- Colour.
- Shape/cut.
- Origin.
- Treatment.
- Dimensions.
- Certification information.

**Inventory**
- Availability.
- Publication status.
- Featured status.

**Media**
- Product images.
- Main image.
- Image ordering.
- Image alt text.
- Optional video.

### Product ID

Generate Product IDs automatically using the agreed format:

`SGH-0001`

Requirements:

- Unique.
- Sequential.
- Generated securely.
- Never reused.
- Not editable during ordinary product editing.
- Preserved when products are archived or sold.

Use a server-side or transaction-safe mechanism to avoid duplicate IDs.

## 6. Product Publication

Keep product availability separate from publication status.

### Publication states

- Draft.
- Published.

### Availability states

- Available.
- Reserved.
- Sold.

A product can be published and reserved or sold.

### Draft products

- Visible to authorised administrators.
- Not publicly listed.
- Not included in public search.
- Not included in public sitemap.

### Published products

- Displayed on the public website.
- Included in relevant catalogue queries.
- Eligible for search engine indexing when otherwise appropriate.

Use Sanity's draft and published document workflow.

## 7. Inventory Management

Administrators must be able to update availability easily.

### Available

- Normal enquiry actions enabled.
- Eligible for featured selections.

### Reserved

- Display RESERVED badge.
- Remain publicly visible.
- Allow enquiries.
- Clearly communicate that availability must be confirmed.

### Sold

- Display SOLD OUT badge.
- Remain publicly visible.
- Disable purchase and inspection actions.
- Exclude from active featured products.
- Preserve product information and history.

Availability changes should become visible on the website without requiring a code deployment.

## 8. Pricing Management

Support:

- Regular price.
- Optional sale price.
- Optional promotion start and end dates.
- LKR currency.

### Validation

- Prices must be valid positive amounts.
- Sale price must be lower than regular price.
- Promotion dates must be valid.
- Expired promotions must not display as active sales.

The public website should show:

- Regular price when no promotion is active.
- Sale price prominently when active.
- Original price struck through.
- SALE badge during the promotion.

## 9. Product Media Management

Use Sanity Assets for gemstone photography and other media.

Administrators should be able to:

- Upload multiple images.
- Select a main image.
- Reorder images.
- Replace images.
- Remove images.
- Add alt text.
- Preview uploaded images.
- Attach optional videos.

### Media requirements

- Support appropriate image formats such as JPEG, PNG and WebP.
- Apply sensible upload limits.
- Optimise image delivery.
- Preserve original images where required.
- Maintain accurate gemstone colours.
- Avoid artificial image alterations that misrepresent a gemstone.

Every published product must have at least one valid image.

## 10. Category Management

Create a Category document type.

Initial categories:

- Spinel.
- Garnet.
- Sapphire.
- Other Gemstones.

Fields:

- Category name.
- Slug.
- Description.
- Category image.
- Display order.
- Active status.

Administrators should be able to create, edit, reorder and deactivate categories.

Do not delete a category while products still reference it without first reassigning those products.

## 11. Featured Products

Manage featured gemstones through Sanity.

Administrators should be able to:

- Select products for the homepage.
- Reorder featured products.
- Remove products from the featured list.
- Preview the selection.

### Rules

- Initially show four featured products.
- Only published products can be featured.
- Sold products cannot be featured.
- Reserved products should normally be excluded.
- Featured products should be selected manually.

If a featured product becomes unavailable, the website must handle it gracefully and the administrator should be able to replace it.

## 12. Enquiry Management

Store website enquiries in Sanity as private documents.

Create dedicated document types for:

- Enquiry.
- Enquiry Note.
- Enquiry History.

### Enquiry information

- Enquiry reference.
- Enquiry type.
- Customer name.
- Email.
- Contact number.
- Related product.
- Product ID snapshot.
- Subject.
- Message.
- Preferred inspection date.
- Preferred inspection time.
- Submission date.
- Status.

### Enquiry statuses

- New.
- Contacted.
- In Discussion.
- Completed.
- Cancelled.

### Administrator actions

Through Sanity Studio, authorised administrators should be able to:

- View submitted enquiries.
- Search and filter enquiries.
- Open related products.
- Update enquiry status.
- Add private notes.
- Review enquiry history.
- View customer contact details.

### Privacy

Enquiries, internal notes and history must never be exposed through public website queries.

Use appropriate Sanity dataset permissions and server-side access controls.

Do not rely only on hiding private documents from frontend queries.

Refer to `docs/06-enquiry-workflows.md` for complete enquiry processing and notification requirements.

## 13. Website Content Management

Use dedicated Sanity document types for editable public content.

### Editable content

- Homepage hero heading.
- Homepage supporting text.
- Hero image.
- CTA labels.
- Brand introduction.
- About Us content.
- How to Buy content.
- Contact information.
- Category section headings.
- Featured section headings.

Use predefined content fields and reusable sections.

Do not introduce an unrestricted page builder.

The visual design and layout should remain controlled by the Next.js application.

## 14. Business Settings

Create a central Site Settings document.

Editable fields:

- Business name.
- Logo references.
- Default SEO information.

Business contact details (WhatsApp number, email, Instagram URL) and the general location are not managed in Sanity. They are set once in the Next.js codebase (`src/lib/site-config.ts`) and used throughout the website from there. Never repeat these details separately in individual components.

Do not publish private residential addresses.

## 15. Product Archiving

Prefer unpublishing or archiving products rather than permanently deleting them.

### Archiving behaviour

- Remove product from active public listings.
- Preserve its Product ID.
- Preserve associated enquiry references.
- Preserve historical product information.
- Allow authorised administrators to restore the product.

Permanent deletion should require explicit confirmation and should not compromise enquiry history.

## 16. Validation and Data Integrity

Use Sanity Studio validation rules for administrator input.

Use server-side validation for all public submissions and sensitive mutations.

### Product publication requirements

Before publication, require:

- Product name.
- Product ID.
- Category.
- Valid regular price.
- Availability.
- At least one image.

Optional gemstone specifications should not prevent publication.

### Data integrity

- Product IDs must be unique.
- Slugs must be unique.
- Product references must be valid.
- Prices must be valid.
- Sale prices must be lower than regular prices.
- Enquiry references must be unique.
- Private enquiry fields must not appear in public content queries.

Where important guarantees require more than Studio validation, enforce them through server-side logic and controlled write operations.

## 17. Audit History

Maintain records of important administrative changes.

Record:

- Product creation.
- Product updates.
- Price changes.
- Availability changes.
- Publication changes.
- Archiving.
- Category changes.
- Featured product changes.
- Enquiry status changes.
- Administrator identity.
- Date and time.

Use Sanity history and explicit application-level records where necessary.

Do not assume Sanity document history alone provides a convenient business audit report.

## 18. Studio Usability

The CMS should be straightforward for non-technical administrators.

Requirements:

- Clear navigation.
- Logical field grouping.
- Helpful descriptions.
- Image previews.
- Validation messages.
- Document previews.
- Confirmation for destructive actions.
- Searchable product lists.
- Useful enquiry views.

### Product editor sections

1. Basic Information.
2. Gemstone Specifications.
3. Pricing.
4. Images and Media.
5. Availability.
6. Publication.

Avoid presenting every field as one long unstructured form.

## 19. Security and Data Protection

- Restrict Sanity Studio access.
- Use appropriate project roles.
- Protect private datasets and documents.
- Keep write tokens server-side.
- Validate public enquiry submissions.
- Apply spam protection and rate limiting.
- Keep customer information private.
- Avoid exposing secrets in frontend code.
- Maintain regular content backups.
- Review administrator access periodically.

Public website queries must only expose approved published content.

## 20. Backup and Recovery

Sanity will be the primary content storage system.

Maintain:

- Regular dataset exports.
- Secure backup storage.
- Media backup strategy.
- Documented restoration procedure.
- Periodic recovery checks.

GitHub source code backups do not replace Sanity content backups.

## 21. Future Enhancements

Potential additions:

- More administrator roles.
- Inventory import/export.
- Bulk price updates.
- Advanced inventory reporting.
- Supplier records.
- Acquisition history.
- Certificate document management.
- Enquiry analytics.
- Sales reporting.
- More advanced content previews.

These are not required for the initial release.

## 22. Final CMS Principles

1. Sanity is the single source of truth for business content.
2. Sanity Studio is the administrator interface.
3. No duplicate custom CMS is required in Next.js.
4. Product and availability management must be simple.
5. Enquiries must remain private.
6. Product IDs must remain permanent and unique.
7. Public content changes must not require application redeployment.
8. The system must remain maintainable and expandable.

**Implementation principle:** Administrators should be able to manage the gemstone catalogue, inventory, enquiries and routine website content through Sanity Studio without editing source code.