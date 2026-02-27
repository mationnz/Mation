---
name: job-scrape
description:
  Scrape job listings from SEEK and Trade Me with configurable options, outputting to JSON, CSV, and
  Excel spreadsheet.
---

# Job Scrape Skill

Scrape NZ job board listings from SEEK.co.nz and TradeMe.co.nz for construction/labourer positions.

## When to Use

Use this skill when the user asks to:

- Scrape jobs from SEEK or Trade Me
- Get job listings for construction/labouring positions
- Run the job scraper
- Export job data to spreadsheet, CSV, or JSON

## Configuration Options

| Option     | Type    | Default               | Description                                      |
| ---------- | ------- | --------------------- | ------------------------------------------------ |
| `sources`  | array   | `["seek", "trademe"]` | Job boards to scrape. Options: `seek`, `trademe` |
| `regions`  | array   | `["Auckland"]`        | NZ regions to search                             |
| `maxPages` | integer | `5`                   | Max pages per source (0 = unlimited)             |
| `headless` | boolean | `true`                | Run browser headlessly                           |

## Execution Steps

// turbo-all

### 1. Navigate to the Job Scraper

```bash
cd /Users/cameronrussell/code/alfred/actors/job-scraper
```

### 2. Run the Scraper with Custom Input

Create an input file if custom configuration is needed:

```bash
mkdir -p apify_storage/key_value_stores/default
```

Write the input configuration to the INPUT.json file:

```json
{
  "sources": ["seek", "trademe"],
  "regions": ["Auckland"],
  "maxPages": 5,
  "headless": true
}
```

Save to: `apify_storage/key_value_stores/default/INPUT.json`

### 3. Execute the Scraper

```bash
cd /Users/cameronrussell/code/alfred/actors/job-scraper && pnpm dev 2>&1
```

Wait for completion. The scraper will output a summary like:

```
📊 Results Summary:
   Total jobs found: X
   SEEK jobs: X
   Trade Me jobs: X
```

### 4. Export Results to Multiple Formats

After scraping completes, run the export script:

```bash
cd /Users/cameronrussell/code/alfred/actors/job-scraper && tsx scripts/export-results.ts
```

This creates three files in the `output/` directory:

- `jobs-{date}.json` - Full JSON data
- `jobs-{date}.csv` - CSV for spreadsheet import
- `jobs-{date}.xlsx` - Excel spreadsheet with formatting

### 5. Report Results to User

After successful execution, report:

1. Number of jobs scraped from each source
2. Location of output files
3. Any notable patterns (e.g., pay ranges, common employers)

## Output Fields

Each job listing includes:

- `source` - Job board (SEEK or Trade Me)
- `company` - Employer name
- `title` - Job title
- `role` - Job category/classification
- `minPay`, `maxPay` - Hourly pay range (NZD)
- `location` - Job location
- `description` - Job description snippet
- `daysSincePosted` - Days since listing was posted
- `jobUrl` - Full URL to the listing
- `jobId` - Unique job identifier
- `scrapedAt` - Timestamp of scraping

## Troubleshooting

### Playwright Not Installed

If you see "Executable doesn't exist" error:

```bash
cd /Users/cameronrussell/code/alfred/actors/job-scraper && pnpm exec playwright install chromium
```

### No Jobs Found

- Check if the job board is accessible
- Try reducing `maxPages` to 1 for testing
- Verify the site hasn't changed its HTML structure

## Example Usage

**Basic scrape (both sources):**

```
User: "Run the job scraper"
→ Execute with default configuration
```

**SEEK only:**

```
User: "Scrape jobs from SEEK only"
→ Set sources to ["seek"]
```

**More pages:**

```
User: "Get more job listings, up to 10 pages"
→ Set maxPages to 10
```
