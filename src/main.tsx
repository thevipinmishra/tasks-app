import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Toaster } from 'sonner';

import { routeTree } from "./routeTree.gen";
import { Tooltip } from "radix-ui";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Tooltip.Provider>
      <RouterProvider router={router} />
        <Toaster position="bottom-right" richColors />
    </Tooltip.Provider>
  </StrictMode>
);
