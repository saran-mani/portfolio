import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Page-width container shared by every section. */
export function Wrap({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-[1160px] px-5 sm:px-8", className)} {...props} />;
}
