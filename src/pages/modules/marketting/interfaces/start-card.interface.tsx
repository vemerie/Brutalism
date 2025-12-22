import type { ReactNode } from "react";

export interface IStat {
  title: string;
  value: string;
  previous: string;
  progress: string;
  isPositive: boolean;
  icon: ReactNode;
  iconBg: string;
}
