import clsx from "clsx";
import { Slot } from "radix-ui";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined";
  asChild?: boolean;
}

export const Button = ({
  className,
  variant = "filled",
  asChild,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      className={clsx(
        "h-10 min-w-12 px-4 py-2 inline-flex text-sm justify-center items-center text-center rounded-[5px] border transition-colors",
        variant === "filled"
          ? "bg-primary hover:bg-primary/90 text-white"
          : "border-primary text-primary hover:bg-primary/10",
        "disabled:opacity-50 disabled:pointer-events-none",
        "outline-0 focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-1",
        className
      )}
      {...props}
    />
  );
};
