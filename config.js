/**
 * ChatMate Global Configuration
 * This file centralizes all API connections for the entire application.
 */

// 1. Supabase Credentials
const SB_URL = 'https://bhhedtjivhgercmepnrh.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoaGVkdGppdmhnZXJjbWVwbnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNTg3NTQsImV4cCI6MjA4NDczNDc1NH0.AxXw_jU3pl8skCimjlsb-IvWz1Lo3XWo2Og-dXKjPxg';

// 2. Initialize Supabase Client
// Ensure the Supabase CDN is loaded in your HTML before this file
const _sb = supabase.createClient(SB_URL, SB_KEY);

// 3. Gun.js Configuration (P2P Mesh Network)
const gun = Gun([
    'https://gun-manhattan.herokuapp.com/gun',
    'https://relay.peer.ooo/gun',
    'https://gundb-relay.up.railway.app/gun' // Additional backup relay
]);

// 4. Initialize Gun User & Session Persistence
// This handles the "Auto-login" feature across refreshes
const user = gun.user().recall({ persist: true });

// 5. App Global Constants
const APP_SETTINGS = {
    NAME: "ChatMate",
    STORAGE_BUCKET: "avatars",
    DEVICE_LIMIT: 2,
    SUPPORT_URL: "https://t.me/ChatMateHelpCenter",
    COUNTRY_CODE: "+880"
};

console.log("%c ChatMate Config Loaded! ", "background: #00d2ff; color: #000; font-weight: bold;");
