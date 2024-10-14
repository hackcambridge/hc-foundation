import { Fira_Code, Inter, Orbitron } from "next/font/google";

export const fontSans = Fira_Code({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = Inter({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontOrbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

// <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
// <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
// <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
// <link rel="manifest" href="/site.webmanifest" />
// <link href="https://db.onlinewebfonts.com/c/9527a4c4f55e8075eb6a60fe577d89c4?family=Px+Grotesk+Regular" rel="stylesheet" />
// <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@800&amp;display=swap" rel="stylesheet" />