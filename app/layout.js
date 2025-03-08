import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Free LinkedIn Post Creator",
    template: "%s | LinkedIn Post Creator"
  },
  description: "Create high-quality LinkedIn posts in seconds with our free LinkedIn Post Generator.",
  openGraph: {
    title: "Free LinkedIn Post Creator",
    description: "Create high-quality LinkedIn posts in seconds with our free LinkedIn Post Generator."
  }
};

export default function RootLayout({ children }) {
  console.log("RootLayout is running");
  return (
    <html lang="en">
      <head>
      {/* <!-- Google tag (gtag.js) --> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DH8S3R4FVW"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DH8S3R4FVW');
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
