# Xero Quote-to-Email Configuration

## Integration Modes

### Option A: Claude Desktop Connectors (Recommended)

**Setup Time:** 5 minutes  
**Monthly Cost:** $0  
**API Keys Needed:** 1 (Xero only)

1. Open Claude Desktop
2. Go to Settings → Connectors
3. Authorize each service:
   - Gmail → Click "Connect" → Sign in with Google
   - Google Drive → Click "Connect" → Sign in with Google
   - Calendar → Click "Connect" → Sign in with Google

4. Add to `.env`:

```bash
USE_CONNECTORS=true

# Xero credentials (required)
XERO_CLIENT_ID=your_xero_client_id
XERO_CLIENT_SECRET=your_xero_client_secret
XERO_TENANT_ID=your_xero_tenant_id
```

### Option B: External APIs

**Setup Time:** 30+ minutes  
**Monthly Cost:** $50-100+  
**API Keys Needed:** 4

```bash
USE_CONNECTORS=false

# Xero
XERO_CLIENT_ID=your_xero_client_id
XERO_CLIENT_SECRET=your_xero_client_secret
XERO_TENANT_ID=your_xero_tenant_id

# SendGrid (email)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@yourcompany.com

# Google (Drive & Calendar)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
```

---

## Getting Xero Credentials

1. Go to [developer.xero.com](https://developer.xero.com)
2. Click "My Apps" → "New App"
3. Choose "Web App" type
4. Fill in app details:
   - App name: `Alfred Quote Mailer`
   - Company URL: Your company website
   - OAuth 2.0 redirect URI: `http://localhost:3000/auth/xero/callback`
5. Save and copy:
   - Client ID → `XERO_CLIENT_ID`
   - Generate secret → `XERO_CLIENT_SECRET`
6. Connect to your Xero organization to get `XERO_TENANT_ID`

---

## Getting SendGrid Credentials (Option B only)

1. Go to [sendgrid.com](https://sendgrid.com)
2. Create account or sign in
3. Go to Settings → API Keys
4. Create API key with "Full Access"
5. Copy key → `SENDGRID_API_KEY`
6. Set sender email → `SENDGRID_FROM_EMAIL`

---

## Getting Google Credentials (Option B only)

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable APIs:
   - Google Drive API
   - Google Calendar API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Application type: "Web application"
6. Add authorized redirect URI: `http://localhost:3000/auth/google/callback`
7. Copy:
   - Client ID → `GOOGLE_CLIENT_ID`
   - Client Secret → `GOOGLE_CLIENT_SECRET`
8. Use OAuth flow to get refresh token → `GOOGLE_REFRESH_TOKEN`

---

## Verify Configuration

Run this check:

```bash
# Check required Xero vars
echo "XERO_CLIENT_ID: ${XERO_CLIENT_ID:+set}"
echo "XERO_CLIENT_SECRET: ${XERO_CLIENT_SECRET:+set}"
echo "XERO_TENANT_ID: ${XERO_TENANT_ID:+set}"

# Check optional API vars
echo "SENDGRID_API_KEY: ${SENDGRID_API_KEY:+set}"
echo "GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID:+set}"
```

All required variables should show "set".
