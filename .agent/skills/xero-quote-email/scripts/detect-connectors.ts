#!/usr/bin/env tsx
/**
 * Detect Available Connectors
 *
 * Standalone script to check which connectors are available
 * in the current environment. Run this before using skills to
 * verify your setup.
 *
 * Usage:
 *   tsx detect-connectors.ts
 *
 * Checks for:
 *   - Claude Desktop connectors (Gmail, Drive, Calendar)
 *   - MCP servers (xero, gmail, google-drive, etc.)
 *   - API keys (SendGrid, Google, Xero)
 */

import { config } from 'dotenv';
config();

// ============================================================================
// Environment Detection
// ============================================================================

type ClaudeEnvironment =
  | 'claude-desktop'
  | 'claude-code'
  | 'mcp-server'
  | 'standalone';

function detectEnvironment(): ClaudeEnvironment {
  if (process.env.CLAUDE_DESKTOP === 'true') return 'claude-desktop';
  if (process.env.CLAUDE_CODE === 'true' || process.env.ANTIGRAVITY === 'true')
    return 'claude-code';
  if (process.env.MCP_SERVER === 'true' || process.env.MCP_MODE === 'true')
    return 'mcp-server';
  if (
    typeof (globalThis as Record<string, unknown>).__claude_connectors !==
    'undefined'
  )
    return 'claude-desktop';
  if (
    typeof (globalThis as Record<string, unknown>).__mcp_context !== 'undefined'
  )
    return 'mcp-server';
  return 'standalone';
}

// ============================================================================
// Connector Checks
// ============================================================================

function checkApiKey(key: string): boolean {
  return !!process.env[key] && process.env[key]!.length > 0;
}

function checkMcpServer(name: string): boolean {
  const servers = process.env.MCP_SERVERS?.split(',') ?? [];
  return (
    servers.includes(name) ||
    !!process.env[`MCP_${name.toUpperCase().replace(/-/g, '_')}`]
  );
}

interface ConnectorStatus {
  name: string;
  available: boolean;
  source: string;
  status: string;
}

function checkEmail(env: ClaudeEnvironment): ConnectorStatus {
  if (env === 'claude-desktop') {
    return {
      name: 'Email',
      available: true,
      source: 'Claude Desktop',
      status: '✅ Gmail Connector',
    };
  }
  if (checkMcpServer('gmail')) {
    return {
      name: 'Email',
      available: true,
      source: 'MCP',
      status: '✅ Gmail MCP Server',
    };
  }
  if (checkApiKey('SENDGRID_API_KEY')) {
    return {
      name: 'Email',
      available: true,
      source: 'API',
      status: '✅ SendGrid API',
    };
  }
  return {
    name: 'Email',
    available: false,
    source: 'None',
    status: '❌ Not configured',
  };
}

function checkStorage(env: ClaudeEnvironment): ConnectorStatus {
  if (env === 'claude-desktop') {
    return {
      name: 'Storage',
      available: true,
      source: 'Claude Desktop',
      status: '✅ Google Drive Connector',
    };
  }
  if (checkMcpServer('google-drive') || checkMcpServer('gdrive')) {
    return {
      name: 'Storage',
      available: true,
      source: 'MCP',
      status: '✅ Google Drive MCP Server',
    };
  }
  if (checkApiKey('GOOGLE_CLIENT_ID') && checkApiKey('GOOGLE_REFRESH_TOKEN')) {
    return {
      name: 'Storage',
      available: true,
      source: 'API',
      status: '✅ Google Drive API',
    };
  }
  return {
    name: 'Storage',
    available: false,
    source: 'None',
    status: '❌ Not configured',
  };
}

function checkCalendar(env: ClaudeEnvironment): ConnectorStatus {
  if (env === 'claude-desktop') {
    return {
      name: 'Calendar',
      available: true,
      source: 'Claude Desktop',
      status: '✅ Calendar Connector',
    };
  }
  if (checkMcpServer('google-calendar') || checkMcpServer('calendar')) {
    return {
      name: 'Calendar',
      available: true,
      source: 'MCP',
      status: '✅ Google Calendar MCP Server',
    };
  }
  if (checkApiKey('GOOGLE_CLIENT_ID') && checkApiKey('GOOGLE_REFRESH_TOKEN')) {
    return {
      name: 'Calendar',
      available: true,
      source: 'API',
      status: '✅ Google Calendar API',
    };
  }
  return {
    name: 'Calendar',
    available: false,
    source: 'None',
    status: '❌ Not configured',
  };
}

function checkXero(): ConnectorStatus {
  if (checkMcpServer('xero') || checkMcpServer('mcp-xero')) {
    return {
      name: 'Xero',
      available: true,
      source: 'MCP',
      status: '✅ Xero MCP Server',
    };
  }
  if (
    checkApiKey('XERO_CLIENT_ID') &&
    checkApiKey('XERO_CLIENT_SECRET') &&
    checkApiKey('XERO_TENANT_ID')
  ) {
    return {
      name: 'Xero',
      available: true,
      source: 'API',
      status: '✅ Xero API',
    };
  }
  if (checkApiKey('XERO_CLIENT_ID')) {
    return {
      name: 'Xero',
      available: false,
      source: 'API',
      status: '⚠️ Partially configured',
    };
  }
  return {
    name: 'Xero',
    available: false,
    source: 'None',
    status: '❌ Not configured',
  };
}

function checkSlack(env: ClaudeEnvironment): ConnectorStatus {
  if (env === 'claude-desktop') {
    return {
      name: 'Slack',
      available: true,
      source: 'Claude Desktop',
      status: '✅ Slack Connector',
    };
  }
  if (checkMcpServer('slack')) {
    return {
      name: 'Slack',
      available: true,
      source: 'MCP',
      status: '✅ Slack MCP Server',
    };
  }
  if (checkApiKey('SLACK_BOT_TOKEN') || checkApiKey('SLACK_WEBHOOK_URL')) {
    return {
      name: 'Slack',
      available: true,
      source: 'API',
      status: '✅ Slack API',
    };
  }
  return {
    name: 'Slack',
    available: false,
    source: 'None',
    status: '⚪ Not configured (optional)',
  };
}

// ============================================================================
// Main
// ============================================================================

function main() {
  console.log('');
  console.log('🔌 Connector Detection');
  console.log('='.repeat(50));

  const env = detectEnvironment();
  console.log(`\n📍 Environment: ${env}`);

  const connectors = [
    checkEmail(env),
    checkStorage(env),
    checkCalendar(env),
    checkXero(),
    checkSlack(env),
  ];

  console.log('\n📋 Services:\n');
  for (const c of connectors) {
    console.log(`   ${c.status}`);
  }

  const available = connectors.filter(c => c.available);
  const missing = connectors.filter(c => !c.available && c.name !== 'Slack');

  console.log('\n' + '='.repeat(50));

  if (missing.length === 0) {
    console.log('✅ All required services available!');
  } else {
    console.log(`⚠️ Missing: ${missing.map(c => c.name).join(', ')}`);
    console.log('\nTo fix:');
    if (env === 'standalone') {
      console.log('  • Run in Claude Desktop for auto-connectors, OR');
      console.log('  • Configure API keys in .env file');
    }
  }

  console.log('');
}

main();
