"use client";

import { useEffect, useState } from "react";

/** Copyright year, computed on the client so prerendered pages stay static */
export function CurrentYear() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year ?? ""}</>;
}
