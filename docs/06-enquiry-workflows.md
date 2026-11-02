# Serendib Crown Gems — Enquiry and Communication Workflows

**Document:** `06-enquiry-workflows.md`  
**Status:** Initial specification  
**Version:** 1.0

---

## 1. Overview

Serendib Crown Gems operates an enquiry-led sales model.

Customers discover gemstones through the website and contact the business to discuss purchasing, inspection, certification or general questions.

The website must support two primary communication channels:

1. WhatsApp.
2. Website enquiry forms.

Email notifications connect customers and administrators with the enquiry process.

The system should make it easy to receive, organise, track and respond to enquiries without introducing unnecessary complexity.

## 2. Communication Channels

### WhatsApp

WhatsApp is the primary direct communication channel.

Use it for:
- Product enquiries.
- Purchase discussions.
- General questions.
- Inspection arrangements.
- Certification questions.
- Follow-up communication.

The website should provide:
- Header WhatsApp button.
- Floating WhatsApp button.
- Product-specific WhatsApp enquiry buttons.
- Contact page WhatsApp link.

### Website forms

Website forms are used when customers prefer to submit structured enquiries.

Supported forms:
- General enquiry.
- Purchase enquiry.
- Inspection request.
- Certification request.

### Email

Email is used for:
- New enquiry notifications to administrators.
- Submission acknowledgements to customers.
- Internal enquiry records.
- Administrative communication.

Email notifications should not replace direct customer follow-up.

## 3. WhatsApp Integration

### Business configuration

Store the business WhatsApp number in a central configuration setting.

Do not hardcode the number separately in individual components.

Use the official WhatsApp click-to-chat URL format.

### General WhatsApp enquiry

Suggested pre-filled message:

Hello, I would like to enquire about Serendib Crown Gems.

Could you please provide more information?

### Product-specific enquiry

Every product enquiry should automatically include:

- Product name.
- Product ID.
- Listed price.
- Product page URL.

Example:

Hello, I am interested in this gemstone.

Product: Blue Sapphire  
Product ID: SGH-0001  
Price: LKR 125,000  
Product URL: [Product URL]

Could you please provide more information?

### WhatsApp behaviour

- Open WhatsApp in a new browser context where appropriate.
- Allow customers to edit the message before sending.
- Support desktop and mobile WhatsApp.
- Do not claim that a WhatsApp message was sent merely because the customer clicked the button.
- Product-specific messages must always reference the correct gemstone.

WhatsApp conversations are handled directly by the business and are not automatically stored in the website enquiry database.

## 4. Website Enquiry Forms

All forms should follow a consistent visual design.

### General enquiry form

Fields:

| Field | Requirement |
|---|---|
| Name | Required |
| Email | Required |
| WhatsApp/contact number | Required |
| Subject | Required |
| Message | Required |

### Purchase enquiry form

Fields:

| Field | Requirement |
|---|---|
| Name | Required |
| Email | Required |
| Contact number | Required |
| Product ID | Automatically populated |
| Product name | Automatically populated |
| Message | Optional |

The customer should not need to manually enter the gemstone Product ID.

### Inspection request form

Fields:

| Field | Requirement |
|---|---|
| Name | Required |
| Email | Required |
| Contact number | Required |
| Product ID | Automatically populated |
| Preferred date | Required |
| Preferred time | Required |
| Additional message | Optional |

Display this notice:

"In-person gemstone inspections are available by appointment in Colombo District. Submitting a request does not confirm an appointment. Our team will contact you to arrange the details."

### Certification request form

Fields:

| Field | Requirement |
|---|---|
| Name | Required |
| Email | Required |
| Contact number | Required |
| Product ID | Automatically populated |
| Preferred laboratory | Optional |
| Additional message | Optional |

The business must confirm the available laboratory, fee and expected turnaround before proceeding.

## 5. Form Validation and Security

All forms must include:

- Required-field validation.
- Email format validation.
- Contact number validation.
- Clear validation messages.
- Server-side validation.
- Spam protection.
- Rate limiting.
- Secure data transmission.
- Safe handling of user-submitted content.

Use a honeypot field or equivalent lightweight spam protection.

Do not rely exclusively on browser-side validation.

Avoid collecting unnecessary personal information.

## 6. Form Submission Workflow

When a customer submits a form:

1. Validate the submitted information.
2. Apply spam and security checks.
3. Generate a unique enquiry reference.
4. Save the enquiry in the database.
5. Associate the enquiry with its Product ID when applicable.
6. Set its initial status to New.
7. Send an administrator notification.
8. Send a customer acknowledgement email.
9. Display a successful submission message.

If an email notification fails after the enquiry has been saved, the enquiry must remain safely stored.

Email delivery failures should be logged and retried where possible.

The website must not report successful submission if the enquiry could not be saved.

## 7. Customer Acknowledgement Email

Send an acknowledgement to the customer's submitted email address.

Suggested subject:

`We received your enquiry | Serendib Crown Gems`

Suggested content:

Hello [Customer Name],

Thank you for contacting Serendib Crown Gems.

We have received your enquiry and our team will review it and get back to you.

Your enquiry reference is: [Reference Number]

If your enquiry concerns a particular gemstone, please keep this reference for future communication.

Thank you for your interest in Serendib Crown Gems.

Kind regards,  
Serendib Crown Gems

### Important

The acknowledgement confirms receipt only.

It must not imply:
- A gemstone has been reserved.
- A purchase has been accepted.
- An inspection has been confirmed.
- Certification has been arranged.

## 8. Administrator Notification Email

Send an email to the configured administrator address whenever a new website enquiry is submitted.

Suggested subject:

`New [Enquiry Type] | [Enquiry Reference]`

Include:

- Enquiry reference.
- Enquiry type.
- Customer name.
- Customer email.
- Customer contact number.
- Product name, where applicable.
- Product ID, where applicable.
- Preferred inspection date/time, where applicable.
- Submitted message.
- Submission date and time.
- Link to the enquiry in the admin dashboard.

Do not include unnecessary sensitive information.

## 9. Enquiry Reference Numbers

Every website enquiry should receive a unique reference number.

Recommended format:

`SGH-ENQ-000001`

Examples:
- SGH-ENQ-000001
- SGH-ENQ-000002
- SGH-ENQ-000003

Rules:
- Automatically generated.
- Unique across all enquiry types.
- Never reused.
- Displayed in customer acknowledgement emails.
- Visible in the admin dashboard.
- Used for internal communication and follow-up.

Product IDs and enquiry reference numbers must remain separate identifiers.

## 10. Enquiry Types

Support four enquiry types:

1. General enquiry.
2. Purchase enquiry.
3. Inspection request.
4. Certification request.

Every enquiry should have an enquiry type.

Product-related enquiries should reference the relevant Product ID.

General enquiries do not require a Product ID.

## 11. Enquiry Status Management

Every website enquiry must have one of the following statuses:

| Status | Meaning |
|---|---|
| New | Received and awaiting review |
| Contacted | Business has contacted the customer |
| In Discussion | Active discussion is taking place |
| Completed | Enquiry has been resolved |
| Cancelled | Enquiry is no longer being pursued |

### Status behaviour

- New enquiries appear prominently in the dashboard.
- Administrators can update statuses manually.
- Every status change should record its timestamp.
- Completed and Cancelled enquiries remain in the database.
- Enquiries must never disappear simply because their status changes.

## 12. Admin Enquiry Management

The admin dashboard should provide an enquiry management section.

### Enquiry list

Display:

- Enquiry reference.
- Customer name.
- Enquiry type.
- Product ID, where applicable.
- Submission date.
- Current status.

### Search and filters

Administrators should be able to:
- Search by enquiry reference.
- Search by customer name.
- Search by Product ID.
- Filter by enquiry type.
- Filter by status.
- Filter by submission date.

### Enquiry detail view

Display the complete enquiry information.

Allow administrators to:
- View customer details.
- View the original message.
- Open the related gemstone.
- Change enquiry status.
- Add private internal notes.
- View submission and status history.
- Open the customer's email address.
- Open a WhatsApp conversation using the customer's contact number.

Private internal notes must never appear on the public website or in customer acknowledgement emails.

## 13. Enquiry History and Audit Trail

Maintain a basic history of administrative activity.

Record:
- Enquiry creation.
- Status changes.
- Internal notes.
- Relevant administrative updates.

Each record should include:
- Action.
- Date and time.
- Administrator who performed the action, where available.

This helps maintain accountability and prevents enquiries from being overlooked.

## 14. Customer Communication Workflow

Recommended workflow:

**Step 1 — Enquiry received**

The customer submits a form or contacts the business through WhatsApp.

**Step 2 — Enquiry recorded**

Website form submissions are saved and assigned a unique reference.

**Step 3 — Administrator notified**

The configured administrator receives an email notification.

**Step 4 — Customer contacted**

The administrator reviews the enquiry and responds through WhatsApp or email.

**Step 5 — Discussion**

The enquiry moves to In Discussion when appropriate.

**Step 6 — Resolution**

The administrator marks the enquiry Completed or Cancelled.

### Important distinction

Website enquiry status and gemstone availability status are separate.

For example, an enquiry can be Completed while the gemstone remains Available.

A gemstone must only be marked Reserved or Sold following an actual business decision.

## 15. Inspection Workflow

1. Customer opens the product detail page.
2. Customer submits an inspection request.
3. Website records the request.
4. Customer receives an acknowledgement.
5. Administrator receives a notification.
6. Administrator contacts the customer.
7. Date, time and location are agreed.
8. Administrator updates the enquiry status.

Inspection requests do not automatically reserve the gemstone.

In-person inspections must be arranged by appointment in Colombo District.

## 16. Certification Workflow

1. Customer submits a certification request.
2. Website records the request.
3. Administrator receives notification.
4. Administrator confirms laboratory availability.
5. Fee and turnaround are communicated.
6. Customer approves the arrangement.
7. Certification process is coordinated.
8. Administrator updates the customer.

Certification must not be promised before the arrangements are confirmed.

## 17. Privacy and Data Handling

Customer information must be treated confidentially.

Requirements:
- Only authorised administrators can access enquiries.
- Customer information must never be publicly exposed.
- Do not include personal information in public URLs.
- Use secure server-side access controls.
- Protect the admin dashboard.
- Store only necessary information.
- Avoid exposing email credentials or API keys.
- Establish an appropriate data retention and deletion policy before launch.

## 18. Email Configuration

Use a transactional email provider with authenticated domain sending.

Configure:
- Business sender address.
- Administrator notification address.
- Customer acknowledgement template.
- Domain authentication.
- Delivery logging.
- Failure handling.

Recommended sender format:

`Serendib Crown Gems <hello@yourdomain.lk>`

The actual email address should be configured once the business domain email is established.

Do not hardcode email credentials in the application.

## 19. Notifications and Future Enhancements

The initial system requires email notifications.

Future possibilities:
- Admin dashboard notification indicators.
- Automated reminders for unanswered enquiries.
- Enquiry response-time reporting.
- Customer follow-up reminders.
- WhatsApp Business API integration, subject to provider approval.
- Advanced enquiry analytics.

These are not launch requirements.

## 20. Final Workflow Principles

The enquiry system must be:

1. Simple for customers.
2. Easy for administrators to manage.
3. Reliable when receiving and storing submissions.
4. Secure and privacy-conscious.
5. Connected to the relevant gemstone inventory.
6. Clear about what is confirmed and what remains pending.
7. Suitable for a small business.

**Implementation principle:** Website form submissions must be persisted before success is reported. Email failures must not cause saved enquiries to be lost. WhatsApp remains a direct communication channel and should not be falsely represented as an automatically tracked website enquiry.