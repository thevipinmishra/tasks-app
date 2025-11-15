import clsx from "clsx";
import type { ComponentProps } from "react";

export const Header = ({ className, ...props }: ComponentProps<"header">) => {
  return <header className={clsx("p-5 bg-primary text-white", className)} {...props} />;
};

export const HeaderTitle = ({ className, ...props }: ComponentProps<"h1">) => {
  return (
    <h1 className={clsx(" font-semibold  uppercase", className)} {...props} />
  );
};
