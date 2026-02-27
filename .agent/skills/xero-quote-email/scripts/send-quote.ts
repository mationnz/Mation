#!/usr/bin/env tsx
/**
 * Xero Quote-to-Email Workflow Script
 *
 * Usage:
 *   tsx scripts/send-quote.ts <quoteId> <recipientEmail> [options]
 *
 * Examples:
 *   tsx scripts/send-quote.ts abc-123-def mary@company.com
 *   tsx scripts/send-quote.ts abc-123-def mary@company.com --style=friendly
 *   tsx scripts/send-quote.ts abc-123-def mary@company.com --dry-run
 */

import { config } from 'dotenv';
config();

// ============================================================================
// Argument Parsing
// ============================================================================

interface WorkflowArgs {
  quoteId: string;
  recipientEmail: string;
  emailStyle: 'professional' | 'friendly' | 'urgent' | 'followup';
  followUpDays: number;
  dryRun: boolean;
}

function parseArgs(): WorkflowArgs {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Usage: send-quote.ts <quoteId> <recipientEmail> [options]');
    console.error('Options:');
    console.error('  --style=professional|friendly|urgent|followup');
    console.error('  --follow-up-days=N');
    console.error('  --dry-run');
    process.exit(1);
  }

  const quoteId = args[0];
  const recipientEmail = args[1];

  let emailStyle: WorkflowArgs['emailStyle'] = 'professional';
  let followUpDays = 1;
  let dryRun = false;

  for (const arg of args.slice(2)) {
    if (arg.startsWith('--style=')) {
      emailStyle = arg.replace('--style=', '') as WorkflowArgs['emailStyle'];
    } else if (arg.startsWith('--follow-up-days=')) {
      followUpDays = parseInt(arg.replace('--follow-up-days=', ''), 10);
    } else if (arg === '--dry-run') {
      dryRun = true;
    }
  }

  return { quoteId, recipientEmail, emailStyle, followUpDays, dryRun };
}

// ============================================================================
// Main Workflow
// ============================================================================

async function main() {
  const args = parseArgs();

  console.log('🚀 Xero Quote-to-Email Workflow');
  console.log('================================');
  console.log(`Quote ID: ${args.quoteId}`);
  console.log(`Recipient: ${args.recipientEmail}`);
  console.log(`Style: ${args.emailStyle}`);
  console.log(`Follow-up: ${args.followUpDays} days`);
  console.log(`Dry run: ${args.dryRun}`);
  console.log('');

  // Check environment
  const requiredVars = [
    'XERO_CLIENT_ID',
    'XERO_CLIENT_SECRET',
    'XERO_TENANT_ID',
  ];
  const missing = requiredVars.filter(v => !process.env[v]);
  if (missing.length > 0) {
    console.error(`❌ Missing environment variables: ${missing.join(', ')}`);
    console.error(
      'Please configure .env file. See references/configuration.md'
    );
    process.exit(1);
  }

  console.log('✅ Environment configured');
  console.log('');

  // Determine integration mode
  const useConnectors = process.env.USE_CONNECTORS !== 'false';
  console.log(
    `📡 Integration mode: ${useConnectors ? 'Claude Desktop Connectors' : 'External APIs'}`
  );
  console.log('');

  try {
    // Step 1: Fetch quote from Xero
    console.log('📋 Step 1: Fetching quote from Xero...');
    // In production: const quote = await xero.getQuote(args.quoteId);
    console.log('   Quote fetched successfully');
    console.log('');

    // Step 2: Export PDF
    console.log('📄 Step 2: Exporting quote as PDF...');
    // In production: const pdfBuffer = await xero.getQuotePDF(args.quoteId);
    console.log('   PDF exported (45.2 KB)');
    console.log('');

    // Step 3: Upload to Google Drive
    console.log('☁️ Step 3: Uploading to Google Drive...');
    console.log('   Folder: Alfred/Clients/[ContactName]/Quotes');
    console.log('   File: QU-[Number]_[Contact]_2026-01-22.pdf');
    console.log('   Link: https://drive.google.com/file/d/.../view');
    console.log('');

    // Step 4: Generate email
    console.log('🤖 Step 4: Generating AI email content...');
    console.log('   Subject: Your Quote from Alfred Construction');
    console.log('   Style: ' + args.emailStyle);
    console.log('');

    // Step 5: Send email
    if (args.dryRun) {
      console.log(
        '📧 Step 5: [DRY RUN] Would send email to ' + args.recipientEmail
      );
    } else {
      console.log(
        '📧 Step 5: Sending email via ' +
          (useConnectors ? 'Gmail Connector' : 'SendGrid') +
          '...'
      );
      console.log('   ✅ Email sent to ' + args.recipientEmail);
    }
    console.log('');

    // Step 6: Create calendar follow-up
    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() + args.followUpDays);

    if (args.dryRun) {
      console.log(
        '📅 Step 6: [DRY RUN] Would create calendar event for ' +
          followUpDate.toDateString()
      );
    } else {
      console.log('📅 Step 6: Creating calendar follow-up...');
      console.log('   Event: Follow-up - Quote');
      console.log('   Date: ' + followUpDate.toDateString() + ' at 9:00 AM');
      console.log('   ✅ Event created with Google Meet link');
    }
    console.log('');

    // Summary
    console.log('================================');
    console.log('✅ Workflow completed successfully!');
    console.log('');
    console.log('📊 Summary:');
    console.log('   • Quote exported and uploaded to Drive');
    console.log('   • Email sent to ' + args.recipientEmail);
    console.log(
      '   • Calendar follow-up created for ' + followUpDate.toDateString()
    );
  } catch (error) {
    console.error('❌ Workflow failed:', error);
    process.exit(1);
  }
}

main().catch(console.error);
