import clsx from "clsx";
import * as SelectPrimitive from "@radix-ui/react-select";
import type { ComponentProps } from "react";
import { ChevronDownIcon } from "lucide-react";

const Select = SelectPrimitive.Root;

const SelectTrigger = ({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) => {
  return (
    <SelectPrimitive.Trigger
      className={clsx(
        "border border-input inline-flex w-full h-7.5 rounded-[3px] items-center justify-between px-3 py-2 text-xs",
        "outline-0 focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-1",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="text-primary size-4 shrink-0" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

const SelectValue = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Value>) => {
  return (
    <SelectPrimitive.Value
      className={clsx("text-xs text-primary-foreground", className)}
      {...props}
    />
  );
};

const SelectContent = ({
  className,
  children,
  position = "popper",
  sideOffset = 5,
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        sideOffset={sideOffset}
        className={clsx(
          "bg-white border border-input shadow-md rounded-sm p-1 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative max-h-(--radix-select-content-available-height) min-w-32 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto",
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1 w-(--radix-select-trigger-width) scroll-my-1">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};

const SelectItem = ({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) => {
  return (
    <SelectPrimitive.Item
      className={clsx(
        "text-sm h-10 text-primary-foreground rounded-sm hover:bg-secondary px-2.5 py-1.5 flex items-center cursor-pointer outline-none focus:bg-secondary",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
