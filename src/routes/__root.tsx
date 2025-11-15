import * as React from "react";
import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <HeadContent />
      <div className="max-w-xl mx-auto min-h-screen supports-[min-height:100dvh]:min-h-dvh lg:border-x lg:border-secondary">
        <Outlet />
      </div>
    </React.Fragment>
  );
}
