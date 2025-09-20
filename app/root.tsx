import type { Route } from "./+types/root";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  redirect,
} from "react-router";
import stylesheet from "./app.css?url";
import { appContext } from "$/server/context";
import { Toaster } from "sonner";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: "./themify-icons.css" },
  { rel: "stylesheet", href: stylesheet },
];

export const middleware: Route.MiddlewareFunction[] = [
  async ({ context, request }) => {
    const url = new URL(request.url);

    const { session } = context.get(appContext);

    if (["/login", "/register"].includes(url.pathname) && session) {
      throw redirect("/dashboard");
    }

    if (url.pathname.startsWith("/dashboard") && !session) {
      throw redirect("/login");
    }
  },
];

export async function loader({ context }: Route.LoaderArgs) {
  const { clientEnv, isAuthenticated, user, session } = context.get(appContext);

  return {
    clientEnv,
    isAuthenticated,
    user,
    session,
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-inter">
        {children}
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData: { clientEnv } }: Route.ComponentProps) {
  return (
    <>
      <Outlet />;
      <script
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(clientEnv)}`,
        }}
      ></script>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";

  let details = "An unexpected error occurred.";

  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="grid h-screen place-items-center bg-red-50 p-4 pt-16 text-red-600">
      <div className="overflow-x-hidden text-center">
        <h1 className="text-3xl font-bold">{message}</h1>
        <p>{details}</p>
        {stack && (
          <pre className="w-full overflow-x-auto p-4">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
