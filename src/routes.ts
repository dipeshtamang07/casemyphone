
/**
 * An array of routes that are used for authentication
 * These routes will redirect users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/new-verification",
];

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_REDIRECT_PATH = "/";
