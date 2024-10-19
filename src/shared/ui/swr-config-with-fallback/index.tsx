"use client";

import { SWRConfig } from "swr";

interface SwrConfigWithFallbackProps {
  children: React.ReactNode;
  fallback: Record<string, unknown>;
}

export const SwrConfigWithFallback = ({
  children,
  fallback,
}: SwrConfigWithFallbackProps) => {
  return <SWRConfig value={{ fallback }}>{children}</SWRConfig>;
};
