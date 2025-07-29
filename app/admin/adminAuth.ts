// Simple in-memory admin login state (not persistent, for dev/demo only)
export let isAdminLoggedIn = false;

export function loginAdmin(username: string, password: string): boolean {
  // Use hardcoded credentials (move to env for real use)
  const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    isAdminLoggedIn = true;
    return true;
  }
  return false;
}

export function logoutAdmin() {
  isAdminLoggedIn = false;
}

export function getAdminLoginState() {
  return isAdminLoggedIn;
}
