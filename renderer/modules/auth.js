/**
 * Authentication Module (Local Mode)
 * Simplified version for standalone local operation without backend/S3
 */

// Local mode - always authenticated
let currentUser = { name: 'Local User', role: 'ADMIN' };

/**
 * Initialize authentication UI (Local Mode - No login required)
 */
export function initializeAuth() {
  console.log('[Auth] Local mode - No authentication required');

  // Hide login modal if exists
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.style.display = 'none';
  }

  // Hide logout button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.style.display = 'none';
  }

  // Hide user info
  const userInfo = document.getElementById('user-info');
  if (userInfo) {
    userInfo.style.display = 'none';
  }

  // Show main content
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.style.display = 'flex';
  }

  // Show mode switch
  const modeSwitchContainer = document.getElementById('mode-switch-container');
  if (modeSwitchContainer) {
    modeSwitchContainer.style.display = 'flex';
  }

  // Setup mode buttons
  if (typeof window.setupModeButtons === 'function') {
    window.setupModeButtons();
  }

  console.log('[Auth] Local mode initialized - ready to use');
}

/**
 * Select server type (disabled in local mode)
 */
export function selectServer(serverType) {
  console.log('[Auth] Local mode - server selection disabled');
}

/**
 * Show login modal (disabled in local mode)
 */
export function showLoginModal() {
  console.log('[Auth] Local mode - login modal disabled');
}

/**
 * Hide login modal
 */
export function hideLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

/**
 * Handle login (disabled in local mode)
 */
export async function handleLogin() {
  console.log('[Auth] Local mode - login disabled');
}

/**
 * Logout (disabled in local mode)
 */
export function logout() {
  console.log('[Auth] Local mode - logout disabled');
}

/**
 * Update authentication UI
 */
export function updateAuthUI() {
  // Always show main content in local mode
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.style.display = 'flex';
  }
}

/**
 * Get current auth token (returns dummy token for local mode)
 */
export function getAuthToken() {
  return 'local-mode-token';
}

/**
 * Get current refresh token
 */
export function getRefreshToken() {
  return null;
}

/**
 * Get current user
 */
export function getCurrentUser() {
  return currentUser;
}

/**
 * Get backend base URL (not used in local mode)
 */
export function getBackendUrl() {
  return 'http://localhost:8080';
}

/**
 * Check if user is authenticated (always true in local mode)
 */
export function isAuthenticated() {
  return true;
}

/**
 * Refresh access token (not needed in local mode)
 */
export async function refreshAccessToken() {
  return 'local-mode-token';
}

/**
 * Fetch with auth (passthrough in local mode)
 */
export async function fetchWithAuth(url, options = {}) {
  return fetch(url, options);
}
