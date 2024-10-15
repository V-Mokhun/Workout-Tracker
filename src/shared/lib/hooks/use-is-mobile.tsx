"use client";

import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return isMobile;
};
