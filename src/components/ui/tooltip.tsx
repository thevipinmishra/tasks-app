import clsx from "clsx";
import { Tooltip as TooltipPrimtiive } from "radix-ui";
import type { ComponentProps } from "react";

const Tooltip = TooltipPrimtiive.Root;
const TooltipTrigger = TooltipPrimtiive.Trigger;

const TooltipContent = ({
  className,
  sideOffset = 5,
  ...props
}: ComponentProps<typeof TooltipPrimtiive.Content>) => {
  return (
    <TooltipPrimtiive.Content
      sideOffset={sideOffset}
      className={clsx("px-2 py-1 bg-white rounded-md shadow-md text-xs lg:text-sm text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin)", className)}
      {...props}
    />
  );
};

export { Tooltip, TooltipTrigger, TooltipContent };
