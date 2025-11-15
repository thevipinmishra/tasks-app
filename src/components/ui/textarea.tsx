import clsx from "clsx";
import type { ComponentProps } from "react";

export const Textarea = ({
  className,
  ...props
}: ComponentProps<'textarea'>) => {
  return (
    <textarea
      className={clsx(
        "rounded-[3px] text-xs lg:text-sm border border-input px-3 py-1.5 w-full outline-0 text-primary-foreground placeholder:text-input-placeholder focus:ring-2 focus:ring-primary/25 focus:ring-offset-1 transition-colors bg-background",
        className
      )}
      {...props}
    />
  );
};
