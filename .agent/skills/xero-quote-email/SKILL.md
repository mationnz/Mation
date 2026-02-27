---
name: xero-quote-email
description:
  Export Xero quotes as PDF, upload to Google Drive, compose AI-powered emails, and create calendar
  follow-ups.
---

# Xero Quote-to-Email Skill

Automates the complete quote sending workflow:

1. Export quote PDF from Xero
2. Upload to Google Drive (organized by client)
3. Generate professional AI-powered email
4. Send via Gmail or SendGrid
5. Create calendar follow-up event

## When to Use

Use this skill when the user asks to:

- Send a Xero quote to a client
- Email a quote to someone
- Export and send a quote
- Create a follow-up for a quote
- "Send quote QU-XXXX to email@example.com"

## Prerequisites

### Option A: Claude Desktop Connectors (Recommended)

No API setup required! Just authorize in Claude Desktop:

1. Settings → Connectors → Gmail ✅
2. Settings → Connectors → Google Drive ✅
3. Settings → Connectors → Calendar ✅

Then add Xero credentials to `.env`:

```bash
XERO_CLIENT_ID=your_client_id
XERO_CLIENT_SECRET=your_client_secret
XERO_TENANT_ID=your_tenant_id
```

### Option B: External APIs (Advanced)

Add all credentials to `.env`:

```bash
# Xero
XERO_CLIENT_ID=...
XERO_CLIENT_SECRET=...
XERO_TENANT_ID=...

# SendGrid
SENDGRID_API_KEY=...
SENDGRID_FROM_EMAIL=...

# Google (Drive & Calendar)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
```

## Configuration Options

| Option            | Type    | Default          | Description                                     |
| ----------------- | ------- | ---------------- | ----------------------------------------------- |
| `quoteId`         | string  | required         | Xero Quote UUID                                 |
| `recipientEmail`  | string  | required         | Email to send to                                |
| `emailStyle`      | enum    | `professional`   | Style: professional, friendly, urgent, followup |
| `followUpDays`    | integer | `1`              | Days until calendar follow-up                   |
| `driveFolderPath` | string  | `Alfred/Clients` | Google Drive folder path                        |
| `dryRun`          | boolean | `false`          | Test without sending                            |

## Execution Steps

// turbo-all

### 1. Parse User Request

Extract from user message:

- Quote ID or quote number
- Recipient email address
- Email style preference
- Follow-up timing if mentioned

### 2. Determine Integration Mode

Check which services are available:

```typescript
import { ServiceFactory } from '@dom-mcp/platform-notifications';

const factory = new ServiceFactory({ mode: 'auto' });
const services = await factory.createAllServices();
const summary = await factory.getServiceSummary();

console.log('Using:', summary);
// { email: 'Gmail Connector', storage: 'Drive Connector', calendar: 'Calendar Connector' }
```

### 3. Fetch Quote from Xero

```typescript
import { XeroConnector } from '@dom-mcp/integration-connectors';

const xero = new XeroConnector({
  name: 'xero-quote',
  version: '1.0.0',
  clientId: process.env.XERO_CLIENT_ID!,
  clientSecret: process.env.XERO_CLIENT_SECRET!,
  tenantId: process.env.XERO_TENANT_ID!,
});

const quote = await xero.getQuote(quoteId);
const pdfBuffer = await xero.getQuotePDF(quoteId);
```

### 4. Upload PDF to Google Drive

```typescript
const upload = await services.storage.uploadFile({
  fileName: `QU-${quote.quoteNumber}_${contactName}.pdf`,
  content: pdfBuffer,
  mimeType: 'application/pdf',
  folderPath: `Clients/${contactName}/Quotes`,
});

const viewLink = await services.storage.getShareableLink(upload.fileId);
```

### 5. Generate AI Email

```typescript
import { EmailComposer } from '@dom-mcp/platform-notifications';

const composer = new EmailComposer();
const email = await composer.generateQuoteEmail(
  {
    quoteNumber: quote.quoteNumber,
    contactName: getContactName(quote),
    quoteDate: quote.date,
    total: quote.total,
    currency: quote.currencyCode || 'NZD',
    lineItems: quote.lineItems.map(item => ({
      description: item.description,
      lineAmount: item.lineAmount,
    })),
    driveLink: viewLink,
  },
  emailStyle
);
```

### 6. Send Email

```typescript
await services.email.sendEmail({
  to: recipientEmail,
  subject: email.subject,
  htmlBody: email.htmlBody,
  attachments: [
    {
      filename: `QU-${quote.quoteNumber}.pdf`,
      content: pdfBuffer,
      mimeType: 'application/pdf',
    },
  ],
});
```

### 7. Create Calendar Follow-up

```typescript
const followUpDate = new Date();
followUpDate.setDate(followUpDate.getDate() + followUpDays);
followUpDate.setHours(9, 0, 0, 0);

await services.calendar.createEvent({
  title: `Follow-up: ${contactName} - Quote ${quote.quoteNumber}`,
  description: `Follow-up on quote for $${quote.total.toLocaleString()}`,
  startTime: followUpDate,
  durationMinutes: 30,
  attendees: [recipientEmail],
  addVideoConference: true,
});
```

### 8. Report Results

Report to user:

- Quote details (number, amount)
- PDF uploaded to Drive (with link)
- Email sent (subject, recipient)
- Follow-up event created (date, calendar link)

## Example Usage

**Basic send:**

```
User: "Send quote QU-0042 to mary@acmecorp.co.nz"
```

**With style:**

```
User: "Send quote QU-0042 to mary@acmecorp.co.nz with a friendly tone"
→ emailStyle = 'friendly'
```

**With follow-up:**

```
User: "Send quote QU-0042 to mary@acmecorp.co.nz and remind me in 3 days"
→ followUpDays = 3
```

**Dry run:**

```
User: "Test sending quote QU-0042 to mary@acmecorp.co.nz"
→ dryRun = true
```

## Output

```json
{
  "success": true,
  "quote": {
    "quoteNumber": "QU-0042",
    "contactName": "Mary Smith",
    "total": 15000,
    "status": "SENT"
  },
  "pdf": {
    "fileName": "QU-0042_Mary_Smith.pdf",
    "sizeBytes": 45230,
    "driveLink": "https://drive.google.com/file/d/..."
  },
  "email": {
    "subject": "Your Quote from Alfred Construction",
    "sentTo": "mary@acmecorp.co.nz",
    "status": "sent"
  },
  "calendar": {
    "eventId": "abc123",
    "eventLink": "https://calendar.google.com/...",
    "scheduledFor": "2026-01-23T09:00:00.000Z"
  }
}
```

## Troubleshooting

### Xero Authentication Failed

- Check `XERO_CLIENT_ID`, `XERO_CLIENT_SECRET`, `XERO_TENANT_ID` in `.env`
- Ensure Xero app has correct scopes enabled

### Quote Not Found

- Verify the quote ID/number exists in Xero
- Quote must be in DRAFT or SENT status

### Gmail Connector Not Available

- In Claude Desktop: Settings → Connectors → Gmail → Authorize
- Falls back to SendGrid if configured

### Drive Upload Failed

- Check Drive connector is authorized
- Or verify `GOOGLE_CLIENT_ID` and `GOOGLE_REFRESH_TOKEN`

## Related Files

- [XeroConnector](file:///Users/cameronrussell/code/alfred/libs/integration-connectors/src/connectors/xero/xero.connector.ts) -
  Quote methods
- [ServiceFactory](file:///Users/cameronrussell/code/alfred/libs/platform-notifications/src/services/service-factory.ts) -
  Auto-detection
- [EmailComposer](file:///Users/cameronrussell/code/alfred/libs/platform-notifications/src/services/email-composer.service.ts) -
  AI email generation
