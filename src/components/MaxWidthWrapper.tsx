import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
}

function MaxWidthWrapper({ className, children }: MaxWidthWrapperProps) {
  return <div className={cn("w-full px-3 lg:px-40", className)}>{children}</div>;
}

export default MaxWidthWrapper;
