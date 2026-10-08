import type { Metadata, Viewport } from "next";
import { Geist, Manrope, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/site/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Naomi Wambui | Actuarial Science Graduate",
  description:
    "Naomi Wambui is a Moi University Actuarial Science graduate focused on risk modelling, insurance analytics and financial mathematics. Explore her actuarial projects, quantitative work and professional profile.",
  keywords: [
    "Naomi Wambui Actuarial Science",
    "Graduate Actuarial Analyst Kenya",
    "Moi University Actuarial Science Graduate",
    "Actuarial Analyst Kenya",
    "Risk Analyst Graduate Kenya",
    "Insurance Analytics",
    "Risk Modelling",
    "Financial Mathematics",
  ],
  authors: [{ name: "Naomi Wambui" }],
  openGraph: {
    title: "Naomi Wambui | Actuarial Science Graduate",
    description:
      "Risk Modelling · Insurance Analytics · Financial Mathematics. Moi University BSc Actuarial Science graduate portfolio.",
    siteName: "Naomi Wambui — Portfolio",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naomi Wambui | Actuarial Science Graduate",
    description:
      "Risk Modelling · Insurance Analytics · Financial Mathematics — graduate portfolio.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B1120" },
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Naomi Wambui",
  jobTitle: "Graduate Actuarial Analyst",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Moi University",
    address: { "@type": "PostalAddress", addressLocality: "Eldoret", addressCountry: "KE" },
  },
  knowsAbout: [
    "Actuarial Science",
    "Insurance Analytics",
    "Risk Modelling",
    "Financial Mathematics",
    "Survival Models",
    "Claims Reserving",
    "Statistics",
    "Data Analysis",
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Bachelor of Science",
    name: "BSc Actuarial Science",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${manrope.variable} ${plexMono.variable} ${instrumentSerif.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
