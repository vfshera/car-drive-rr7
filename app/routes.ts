import type { RouteConfig } from "@react-router/dev/routes";
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";
import { flatRoutes } from "remix-flat-routes";

export default remixRoutesOptionAdapter((defineRoutes) => {
  const routes = flatRoutes("routes", defineRoutes);

  if (import.meta.env.DEV) {
    console.table(Object.values(routes).map(({ caseSensitive, id, ...v }) => v));
  }

  return routes;
}) satisfies RouteConfig;
