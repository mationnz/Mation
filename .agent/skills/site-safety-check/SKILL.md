---
name: site-safety-check
description:
  Verify worker safety credentials, qualifications, and site induction status via SiteSafe
  integration.
---

# Site Safety Check Skill

Verify worker credentials before allowing site access. Checks safety passports, qualifications,
training records, and permit eligibility.

## When to Use

Use this skill when the user asks to:

- Check if a worker can work on site
- Verify a safety passport
- Check worker qualifications
- Verify permit eligibility
- Check expiring credentials
- "Can John Smith work on site today?"
- "Verify passport SSP-12345"

## Prerequisites

Add SiteSafe credentials to `.env`:

```bash
SITESAFE_API_KEY=your_sitesafe_api_key
SITESAFE_ORGANIZATION_ID=your_org_id
```

## Configuration Options

| Option           | Type   | Default  | Description                          |
| ---------------- | ------ | -------- | ------------------------------------ |
| `passportNumber` | string | required | Worker's SiteSafe passport number    |
| `workerId`       | string | optional | Worker ID for detailed queries       |
| `permitType`     | string | optional | Specific permit to check eligibility |
| `daysAhead`      | number | `30`     | Days to check for expiring quals     |

## Execution Steps

// turbo-all

### 1. Parse User Request

Extract from user message:

- Worker name or passport number
- Site name (if checking inductions)
- Permit type (if checking eligibility)

### 2. Verify SiteSafe Credentials

```bash
cd /Users/cameronrussell/code/alfred/.agent/skills/site-safety-check
tsx scripts/detect-connectors.ts
```

Ensure SiteSafe shows as configured.

### 3. Run Verification

**Basic verification by passport:**

```bash
tsx scripts/verify-worker.ts SSP-12345
```

**Check permit eligibility:**

```bash
tsx scripts/verify-worker.ts SSP-12345 --permit-type="Working at Heights"
```

**Check expiring qualifications:**

```bash
tsx scripts/check-expiring.ts --days=30
```

### 4. Report Results

Report to user:

- Verification status (✅ Cleared / ❌ Not Cleared)
- Active qualifications
- Missing or expired requirements
- Recommendations

## Example Usage

**Basic check:**

```
User: "Can Michael Brown work on site today?"
```

→ Look up worker, verify passport, check qualifications

**Permit check:**

```
User: "Is Sarah Jones cleared for confined space work?"
```

→ Check specific permit eligibility

**Bulk check:**

```
User: "Who has expiring qualifications in the next 2 weeks?"
```

→ Run expiring quals report

## Output

```json
{
  "verified": true,
  "worker": {
    "name": "Michael Brown",
    "passportNumber": "SSP-12345",
    "status": "active"
  },
  "qualifications": [
    {
      "name": "Site Safe Passport",
      "status": "valid",
      "expiresAt": "2027-03-15"
    },
    {
      "name": "First Aid Certificate",
      "status": "valid",
      "expiresAt": "2026-08-20"
    }
  ],
  "permits": {
    "workingAtHeights": true,
    "confinedSpace": false,
    "hotWorks": true
  },
  "siteInductions": [{ "site": "Greenfield Project", "completedAt": "2026-01-10" }],
  "recommendations": []
}
```

## Troubleshooting

### SiteSafe Authentication Failed

- Check `SITESAFE_API_KEY` is set in `.env`
- Verify `SITESAFE_ORGANIZATION_ID` is correct
- Ensure API key has not expired

### Worker Not Found

- Verify passport number format (SSP-XXXXX)
- Check if worker is registered with your organization

### Qualification Status Unknown

- Some qualifications may be verified externally
- Contact SiteSafe support for verification issues

## Related Connectors

- [SiteSafeConnector](file:///Users/cameronrussell/code/alfred/libs/integration-connectors/src/connectors/sitesafe/sitesafe.connector.ts)
- [connector-detection.ts](file:///Users/cameronrussell/code/alfred/libs/platform-notifications/src/services/connector-detection.ts)
