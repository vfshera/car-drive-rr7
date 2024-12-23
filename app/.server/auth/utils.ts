import { redirect } from "react-router";
import { auth } from ".";

const DEFAULT_REDIRECT_TO = "/signin";

export async function getAuthSession(req: Request) {
  return auth.api.getSession({ headers: req.headers });
}

export async function requireAuth(req: Request, redirectTo = DEFAULT_REDIRECT_TO) {
  const session = await getAuthSession(req);

  if (!session) {
    throw redirect(redirectTo);
  }

  return session;
}
