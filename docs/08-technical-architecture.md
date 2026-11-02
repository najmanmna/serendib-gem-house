# Serendib Crown Gems — Technical Architecture

**Document:** `08-technical-architecture.md`  
**Status:** Revised recommended architecture  
**Version:** 2.0

---

## 1. Architecture Overview

Serendib Crown Gems will use a custom Next.js frontend connected directly to Sanity as its content management system and content backend.

The application will be hosted on Cloudflare, with GitHub Actions handling automated deployment.

There will be no separate Supabase, PostgreSQL or other application database.

### Recommended technology stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js App Router | Public website |
| Language | TypeScript | Application development |
| Styling | Tailwind CSS | Responsive design |
| CMS | Sanity | Content and inventory management |
| Content storage | Sanity Content Lake | Products, enquiries, categories and settings |
| CMS interface | Sanity Studio | Administrator dashboard |
| Media | Sanity Assets | Product images and media |
| Hosting | Cloudflare Workers | Website hosting |
| Deployment | GitHub Actions | Automated build and deployment |
| Deployment CLI | Wrangler | Cloudflare deployment |
| Email | Resend | Enquiry notifications |
| Version control | GitHub | Source code management |
| Domain and DNS | Cloudflare | DNS and domain configuration |

**Core principle:** Sanity will be the single source of truth for the business's content and operational records.

---

## 2. Application Architecture

The system will consist of two connected services.

### 2.1 Public website

Built using Next.js.

Responsibilities:

- Homepage.
- Gemstone catalogue.
- Category pages.
- Individual gemstone pages.
- Search and filtering.
- About Us.
- How to Buy.
- Contact.
- Product-specific WhatsApp links.
- Customer enquiry forms.
- SEO and metadata.

### 2.2 Sanity Studio

Sanity Studio will serve as the private content management interface.

Recommended access:

- Use Sanity's hosted Studio deployment.
- Provide access only to authorised Sanity project members.
- Manage content through Sanity's authentication and permissions.
- Do not build a duplicate custom CMS inside Next.js.

Studio responsibilities:

- Product management.
- Inventory availability.
- Category management.
- Product images and media.
- Featured products.
- Website content.
- Business settings.
- Customer enquiries.
- Enquiry status and internal notes.

The Studio should be accessible through a dedicated Sanity-hosted URL, with a custom domain considered later if needed.

---

## 3. Frontend Architecture

### Next.js App Router

Use Next.js App Router with TypeScript.

Recommended implementation:

- Server Components by default.
- Client Components only for interactive features.
- Server-side Sanity queries.
- Server-side form processing.
- Reusable UI components.
- Centralised data-fetching utilities.

Avoid unnecessary client-side data fetching and excessive JavaScript.

### Rendering strategy

| Page | Rendering |
|---|---|
| Homepage | Server-rendered |
| Gemstone catalogue | Server-rendered |
| Product details | Server-rendered |
| About | Server-rendered |
| How to Buy | Server-rendered |
| Contact | Server-rendered |
| Enquiry submission | Server-side processing |

Use appropriate caching and revalidation so product updates become visible without redeploying the website.

### Suggested routes

```text
src/
└── app/
    ├── page.tsx
    ├── gemstones/
    │   ├── page.tsx
    │   └── [slug]/
    │       └── page.tsx
    ├── about/
    │   └── page.tsx
    ├── how-to-buy/
    │   └── page.tsx
    ├── contact/
    │   └── page.tsx
    └── api/
        └── enquiries/
            └── route.ts
```

The CMS itself will be managed separately through Sanity Studio.

---

## 4. Sanity Integration

Use Sanity as the central content backend.

### Recommended integration

Use the official `next-sanity` toolkit.

It provides:

- Sanity client integration.
- GROQ queries.
- Type-safe query utilities.
- Next.js caching integration.
- Draft Mode support.
- Visual Editing support.
- Live content updates.
- Webhook utilities.

### Content retrieval

The Next.js application will retrieve published content from Sanity.

Examples:

- Homepage content.
- Featured gemstones.
- Product listings.
- Product details.
- Categories.
- Business settings.

Use GROQ queries to retrieve only the fields required by each page.

### Draft and published content

Administrators should be able to prepare product content without immediately displaying it publicly.

Use Sanity's draft and published document workflow.

Public website queries must only expose published content.

### Preview

Consider enabling Sanity Presentation Tool and Next.js Draft Mode.

This allows administrators to preview unpublished content before publishing it.

---

## 5. Sanity Content Model

Sanity will store all required business content.

The initial content types should include:

### 5.1 Product

Stores individual gemstones.

Fields:

- Product ID.
- Name.
- Slug.
- Description.
- Category reference.
- Regular price.
- Sale price.
- Sale start date.
- Sale end date.
- Currency.
- Gemstone type.
- Weight.
- Colour.
- Shape/cut.
- Origin.
- Treatment.
- Dimensions.
- Certification status.
- Availability.
- Product images.
- Product videos.
- Featured status.
- Created date.
- Updated date.

Use optional gemstone attributes so different gemstone types can have different specifications.

### 5.2 Category

Stores gemstone categories.

Fields:

- Name.
- Slug.
- Description.
- Category image.
- Display order.
- Active status.

Initial categories:

- Spinel.
- Garnet.
- Sapphire.
- Other Gemstones.

### 5.3 Site Settings

Stores global business information.

Fields:

- Business name.
- Logo.
- Business email.
- WhatsApp number.
- General location.
- Instagram URL.
- Homepage content.
- SEO defaults.

### 5.4 Homepage Content

Stores editable homepage content.

Fields may include:

- Hero heading.
- Hero description.
- Hero image.
- CTA labels.
- Brand introduction.
- Category section heading.
- Featured section heading.
- How to Buy content.
- Contact CTA content.

### 5.5 Enquiry

Stores customer submissions.

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
- Enquiry status.
- Submission date.

Enquiry records must be private and accessible only to authorised administrators through Sanity Studio.

### 5.6 Enquiry Notes

Stores internal administrator notes.

Fields:

- Related enquiry.
- Note.
- Administrator identity.
- Created date.

Internal notes must never appear on the public website or customer acknowledgement emails.

### 5.7 Enquiry History

Stores important enquiry changes.

Fields:

- Related enquiry.
- Previous status.
- New status.
- Administrator identity.
- Change date.

### 5.8 Product ID Counter

Maintain a controlled counter for generating sequential Product IDs.

Use a server-side or transaction-safe mechanism to prevent duplicate IDs when multiple products are created close together.

Format:

`SGH-0001`

Product IDs must remain unique and must never be reused.

---

## 6. Enquiry Storage Without a Separate Database

All website enquiries will be stored as documents in Sanity.

### Submission flow

```text
Customer submits form
          |
          v
Next.js server endpoint
          |
          v
Validate and sanitise input
          |
          v
Spam protection and rate limiting
          |
          v
Create private Sanity enquiry document
          |
          v
Generate enquiry reference
          |
          v
Send administrator notification
          |
          v
Send customer acknowledgement
```

### Important implementation requirements

- Use a server-side Sanity client with write permissions.
- Never expose a Sanity write token to the browser.
- Store enquiries as private documents.
- Validate all fields server-side.
- Apply spam protection and rate limiting.
- Save the enquiry before attempting email delivery.
- Keep enquiry records if email delivery fails.
- Record relevant email delivery failures.
- Generate a unique enquiry reference.

The enquiry acknowledgement must clearly state that the enquiry has been received, not that a purchase or appointment has been confirmed.

### Data privacy

The Sanity dataset and API permissions must be configured so public website visitors cannot retrieve enquiry records.

Prefer a private dataset with server-side read access for public content retrieval.

Do not depend solely on filtering enquiry documents out of frontend GROQ queries. Access permissions must prevent unauthorised retrieval.

---

## 7. Product ID Generation

Product IDs follow the agreed format:

- SGH-0001
- SGH-0002
- SGH-0003

Requirements:

- Generate IDs automatically.
- Generate them securely on the server.
- Prevent duplicate IDs.
- Never reuse an ID.
- Preserve IDs when products are edited, sold or archived.
- Do not allow normal product editing to change an ID.

Use a separate Sanity document `_id` for internal document identification.

The human-readable Product ID is a separate field.

---

## 8. Sanity Studio and Administrator Access

Sanity Studio replaces the previously proposed custom admin dashboard.

### Access

- Sanity account authentication.
- Authorised project members only.
- No public registration.
- Appropriate project roles and permissions.
- Separate development and production datasets where practical.

### Studio organisation

Organise the Studio navigation into:

1. Dashboard or overview.
2. Gemstones.
3. Categories.
4. Featured Products.
5. Enquiries.
6. Website Content.
7. Business Settings.

Use custom Studio structure and document previews to make everyday administration straightforward.

### Administrator experience

Administrators should be able to:

- Create gemstones.
- Edit products.
- Update prices.
- Change availability.
- Upload images.
- Reorder images.
- Publish and unpublish products.
- Manage categories.
- Select featured products.
- View and update enquiries.
- Add private notes.
- Edit approved website content.

Use field validation, clear labels and useful document previews.

The CMS should be easy for non-technical administrators to operate.

---

## 9. Sanity Media Management

Use Sanity's built-in asset management.

### Product images

Support:

- Multiple images.
- Main image selection.
- Image ordering.
- Alt text.
- Image replacement.
- Image removal.

### Image requirements

- Support JPEG, PNG and WebP where appropriate.
- Restrict file sizes.
- Preserve original gemstone appearance.
- Optimise image delivery.
- Generate responsive image sizes.
- Avoid cropping or distortion.
- Maintain accurate colour representation.

### Videos

Allow optional product videos.

Video upload and playback should be tested against Sanity asset limits and delivery considerations before enabling it in production.

---

## 10. Search and Catalogue Queries

Use GROQ queries for catalogue retrieval.

### Search

Support:

- Product name.
- Product ID.

### Filters

- Category.
- Price range.
- Colour.
- Weight.
- Shape/cut.
- Origin.

### Sorting

- Newest.
- Price: Low to High.
- Price: High to Low.

### Performance

- Retrieve only required fields.
- Avoid fetching the complete dataset unnecessarily.
- Use pagination.
- Keep GROQ queries organised.
- Use suitable caching.
- Avoid excessive repeated requests.

For larger inventories, review query performance and pagination strategy before expanding the catalogue significantly.

---

## 11. WhatsApp Integration

Use direct WhatsApp links.

### General WhatsApp

Provide a WhatsApp contact link throughout the website.

### Product-specific WhatsApp

Generate a prefilled message containing:

- Product name.
- Product ID.
- Displayed price.
- Product URL.

Example:

```text
Hello, I am interested in this gemstone.

Product: Blue Sapphire
Product ID: SGH-0001
Price: LKR 125,000

Product link: https://example.com/gemstones/blue-sapphire-sgh-0001
```

URL-encode the message before creating the WhatsApp link.

WhatsApp conversations do not automatically create Sanity enquiry records.

---

## 12. Email Architecture

Use Resend for transactional email.

### Administrator notifications

Send notifications for:

- General enquiries.
- Purchase enquiries.
- Inspection requests.
- Certification requests.

### Customer acknowledgement

Send an acknowledgement containing:

- Customer name.
- Enquiry reference.
- Enquiry type.
- Related product where applicable.
- Confirmation that the enquiry was received.

### Email security

- Keep API keys server-side.
- Verify the sending domain.
- Configure SPF, DKIM and DMARC.
- Handle email failures without losing enquiry records.

---

## 13. Cloudflare Hosting

Host the Next.js application on Cloudflare Workers.

This provides an edge-oriented deployment environment while allowing the application to use server-side Next.js features.

### Next.js compatibility

Before deployment, validate the selected Cloudflare Next.js adapter against the application's required features.

Cloudflare's current guidance recommends evaluating **vinext** for new Next.js applications on Workers. OpenNext remains a documented option for existing applications and supported deployment scenarios.

Do not select an adapter solely because it produces a successful build. Test:

- App Router.
- Server Components.
- Route Handlers.
- Dynamic product routes.
- Server-side Sanity queries.
- Enquiry submissions.
- Image delivery.
- Caching and revalidation.
- Draft Mode if enabled.

Choose the adapter that provides the required feature compatibility and a reliable production deployment.

### Selected adapter

The site uses **OpenNext** (`@opennextjs/cloudflare`), which supports Next.js 16, Partial Prerendering and `"use cache"`. vinext was considered but is still in beta.

- Configuration: `wrangler.jsonc` and `open-next.config.ts`.
- Prerendered pages use the static-assets incremental cache, suited to content that changes only on deploy. Switch to the R2 incremental cache once content comes from Sanity and must update without a redeploy.
- `next/image` optimisation uses the Cloudflare Images binding (`IMAGES`).
- Deployment runs from GitHub Actions (`.github/workflows/deploy.yml`).

### Cloudflare services

Initial requirements:

- Cloudflare Workers.
- Custom domain.
- DNS configuration.
- HTTPS.
- Environment secrets.
- Appropriate caching configuration.

Cloudflare R2 or other additional services are not required unless a future technical requirement justifies them.

---

## 14. GitHub Actions Deployment

GitHub will be the source of truth for application code.

GitHub Actions will automate testing, building and deployment to Cloudflare.

### Deployment workflow

```text
Developer pushes code
          |
          v
GitHub repository
          |
          v
GitHub Actions
          |
          v
Install dependencies
          |
          v
Run lint and type checks
          |
          v
Build application
          |
          v
Deploy to Cloudflare
          |
          v
Production website updated
```

### Recommended triggers

**Pull requests:**
- Install dependencies.
- Run lint.
- Run TypeScript checks.
- Run build validation.
- Optionally deploy a preview environment.

**Main branch:**
- Run validation checks.
- Build the production application.
- Deploy to Cloudflare Workers.

### GitHub Actions secrets

Store deployment credentials in GitHub repository or environment secrets.

Examples:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- Required Sanity project configuration.
- Required deployment configuration.

Use the minimum permissions necessary for the Cloudflare API token.

Never commit secrets to the repository.

### Deployment principles

- Production deployments must originate from the approved main branch.
- Failed validation must prevent production deployment.
- Keep deployment logs.
- Use a documented rollback procedure.
- Avoid manual production changes that are not reflected in GitHub.

---

## 15. Sanity and Cloudflare Content Updates

Content publishing should not require a new GitHub deployment.

When an administrator publishes a gemstone in Sanity, the public website should reflect the update through the content delivery and revalidation strategy.

### Recommended approach

Use the `next-sanity` integration and an appropriate content update strategy.

Options include:

- Sanity Live Content API.
- Sanity webhooks.
- Next.js cache revalidation.

Choose and test the approach that works reliably with the selected Cloudflare runtime.

### Expected behaviour

- New products appear in the catalogue.
- Updated prices become visible.
- Availability changes are reflected.
- Featured products update.
- Unpublished products disappear from public listings.

Do not rely on redeploying the website after routine content changes.

---

## 16. SEO Architecture

Use Next.js metadata capabilities.

Requirements:

- Unique page titles.
- Unique descriptions.
- Canonical URLs.
- Open Graph metadata.
- Product images.
- XML sitemap.
- Robots.txt.
- Structured data where appropriate.
- Search-friendly product slugs.

Product structured data must use accurate product information.

Do not publish fabricated reviews, ratings or certification claims.

Exclude unpublished content and CMS routes from public indexing.

---

## 17. Environment Configuration

Maintain environment variables for local development and production.

Examples:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=

SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=

RESEND_API_KEY=
EMAIL_FROM=
ADMIN_NOTIFICATION_EMAIL=

NEXT_PUBLIC_SITE_URL=
```

The exact variables will depend on the final integration.

### Security rules

- Public project identifiers may be exposed where required.
- Private read and write tokens must remain server-side.
- Write tokens must never be exposed to browser code.
- Resend API keys must remain server-side.
- Cloudflare credentials must be stored in GitHub Actions secrets.
- Never commit `.env.local` or other secret files.

---

## 18. Error Handling and Monitoring

Implement clear error handling.

### Public website

- Product not found.
- No search results.
- Empty catalogue.
- Enquiry submission failure.
- Network errors.

### CMS and integrations

- Sanity query failure.
- Sanity write failure.
- Media upload failure.
- Email delivery failure.
- Deployment failure.

Maintain useful logs without exposing customer messages, tokens or sensitive information.

---

## 19. Backup and Recovery

Sanity will hold the primary content and enquiry records.

Establish a recovery plan that includes:

- Regular Sanity dataset exports.
- Backup of important media assets.
- Secure storage of exports.
- GitHub source code history.
- Documented restoration procedure.
- Periodic recovery checks.

Do not assume that having the application source code in GitHub automatically backs up Sanity content.

---

## 20. Development Principles

1. Use TypeScript throughout.
2. Keep business logic separate from UI components.
3. Use reusable components.
4. Keep GROQ queries organised.
5. Use Sanity as the single content source.
6. Validate all submitted data server-side.
7. Protect private Sanity documents.
8. Keep all private tokens server-side.
9. Build mobile-first.
10. Use GitHub Actions for deployment.
11. Avoid unnecessary dependencies.
12. Avoid building a second CMS.
13. Test Cloudflare runtime compatibility before production.
14. Keep the initial architecture simple.

---

## 21. Final Recommended Stack

| Component | Decision |
|---|---|
| Frontend | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| CMS | Sanity |
| Content storage | Sanity Content Lake |
| Admin interface | Sanity Studio |
| Product media | Sanity Assets |
| Queries | GROQ |
| Next.js integration | next-sanity |
| Hosting | Cloudflare Workers |
| Deployment | GitHub Actions |
| Deployment CLI | Wrangler |
| Email | Resend |
| Source control | GitHub |
| Communication | WhatsApp links |
| Separate database | Not required |
| Payment gateway | Not required at launch |

## 22. Final Architecture Principle

Sanity manages the business content and operational records.

Next.js presents that content through the public website.

Cloudflare hosts the application.

GitHub Actions builds, validates and deploys application changes.

Routine gemstone, price, availability, category and website content updates happen directly through Sanity Studio without requiring a code change or redeployment.

The architecture should remain lean, maintainable and suitable for a small gemstone business while allowing future expansion.