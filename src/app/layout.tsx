import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./global.css";

const fontSans = FontSans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workout Planner",
  description: "Plan your workouts and track your progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="en" dir="ltr">
      <UserProvider>
        <body
          className={`${fontSans.className} flex flex-col h-full bg-background text-foreground antialiased font-normal text-base leading-normal`}
        >
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
