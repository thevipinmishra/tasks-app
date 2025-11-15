import clsx from "clsx";
import { useId, type ComponentProps } from "react";

interface InputProps extends Omit<ComponentProps<"input">, "size"> {
  size?: "default" | "large";
  error?: string | boolean;
}

export const Input = ({
  className,
  size = "default",
  error,
  id: explicitId,
  ...props
}: InputProps) => {
  const generatedId = useId();
  const inputId = explicitId ?? generatedId;
  const errorId = `${inputId}-error`;

  const hasError = Boolean(error);
  const errorMessage =
    typeof error === "string"
      ? error
      : hasError
        ? "This field is invalid"
        : undefined;
  return (
    <div className="grid gap-1.5 w-full">
      <input
        id={inputId}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        className={clsx(
          "rounded-[3px] text-xs lg:text-sm border border-input px-3 py-1.5 w-full outline-0 text-primary-foreground placeholder:text-input-placeholder focus:ring-2 focus:ring-primary/25 focus:ring-offset-1 transition-colors bg-background",
          "aria-invalid:border-red-200 focus:aria-invalid:ring-red-200",
          size === "large" ? "h-10" : "h-7.5",
          className
        )}
        {...props}
      />
      {hasError && errorMessage && (
        <p id={errorId} className="text-xs lg:text-sm text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
