"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PlatformBudget = {
  id: string;
  label: string;
  remaining: string;
  percent: number;
  accent: string;
  background: string;
  icon: React.ReactNode;
};

const platformIcons: Record<string, React.ReactNode> = {
  facebook: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-black"
    >
      <path d="M13.2 9.6V7.8c0-.8.6-1.1 1-1.1H15V4.5h-1.8c-2 0-3.2 1.6-3.2 3.5v1.6H8v2.2h2v6.7h3.2v-6.7h2.4l.3-2.2z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-black">
      <path d="M16.6 5h2.5l-5.5 6.2 6.5 7.8H17.3l-4.3-5.1-4.8 5.1H5.7l5.9-6.4L5.4 5h4l3.9 4.5z" />
    </svg>
  ),
  google: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-black">
      <path d="M12.2 5.1c2 0 3.4.8 4.2 1.5l2.9-2.9C17.9 1.8 15.2.8 12.2.8 7.3.8 3 3.7 1 7.9l3.5 2.8c.9-2.9 3.6-5.6 7.7-5.6zm9.7 6.3c0-.9-.1-1.5-.3-2.2H12v4h5.8c-.1 1-.8 2.6-2.3 3.6l3.5 2.8c2-1.8 3.1-4.6 3.1-8.2zM4.6 13.3c-.3-.8-.4-1.7-.4-2.6 0-.9.1-1.8.4-2.6L1 5.4C.4 6.5 0 8 0 10c0 2 .4 3.5 1 4.6zM12.2 23.2c3 0 5.6-1 7.5-2.8l-3.5-2.8c-.9.6-2.2 1-3.9 1-4.1 0-6.8-2.7-7.7-5.6L1 17.1c2 4.2 6.3 6.1 11.2 6.1z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-black">
      <path d="M21 7.7c-1.6 0-3.1-.6-4.2-1.6V15a5 5 0 1 1-5.9-4.9v3.3a2 2 0 1 0 1.6 1.9V3h3.1a6 6 0 0 0 5.4 3z" />
    </svg>
  ),
  bing: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-black">
      <path d="M9 3v13.7L17 21l5-2.6-3.4-1.9-2.8 1.5V7.6z" />
    </svg>
  ),
};

const platformBudgets: PlatformBudget[] = [
  {
    id: "facebook",
    label: "Facebook",
    remaining: "$12,345",
    percent: 60,
    accent: "bg-lime-500",
    background: "bg-lime-100",
    icon: platformIcons.facebook,
  },
  {
    id: "x",
    label: "X",
    remaining: "$1,543",
    percent: 86,
    accent: "bg-green-500",
    background: "bg-green-100",
    icon: platformIcons.x,
  },
  {
    id: "google",
    label: "Google",
    remaining: "$5,678",
    percent: 67,
    accent: "bg-emerald-500",
    background: "bg-emerald-100",
    icon: platformIcons.google,
  },
  {
    id: "tiktok",
    label: "TikTok",
    remaining: "$3,456",
    percent: 21,
    accent: "bg-rose-500",
    background: "bg-rose-100",
    icon: platformIcons.tiktok,
  },
  {
    id: "bing",
    label: "Bing",
    remaining: "$2,098",
    percent: 35,
    accent: "bg-amber-500",
    background: "bg-amber-100",
    icon: platformIcons.bing,
  },
];

export function PlatformBudget() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Budget by Platform
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {platformBudgets.map((platform) => (
          <div
            key={platform.id}
            className="flex items-center gap-4 text-sm text-muted-foreground"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white">
                {platform.icon}
                
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">
                  {platform.label}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Remaining: <span className="font-semibold">{platform.remaining}</span>
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div
                className={`h-2 w-full rounded-full ${platform.background}`}
              >
                <div
                  className={`h-2 rounded-full ${platform.accent}`}
                  style={{ width: `${platform.percent}%` }}
                />
              </div>
            </div>
            <div className="w-10 text-right text-xs font-semibold text-foreground">
              {platform.percent}%
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
