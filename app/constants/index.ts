export const APP_NAME = "Car Drive";

export const APP_DESCRIPTION = "";

export const APP_URL = import.meta.env.VITE_APP_URL;

/**
 * Where to redirect the user if they are not authenticated
 */
export const UNAUTHENTICATED_REDIRECT = "/login";

/**
 * Where to redirect the user after they are successfully authenticated
 */
export const AUTHENTICATED_REDIRECT = "/dashboard";

/**
 * Where to redirect the user after they sign out
 */
export const SIGNOUT_REDIRECT = "/";

/**
 * The query parameter to store the path to redirect to
 */
export const REDIRECT_PATH_PARAM = "redirectTo";
