import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Easy MinGW Installer - 2 Click MinGW Installation for 64-bit & 32-bit',
  description:
    'Easy MinGW Installer - 2 Click MinGW Installation for 64-bit & 32-bit. Simplify MinGW installation with just two clicks. Get both 64-bit and 32-bit support for easy development.',
  other: { 'darkreader-lock': 'light', 'color-scheme': 'light', theme: 'light' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="keywords"
          content="Easy MinGW Installer, MinGW, mingw w64, mingw64, mingw download, mingw install, mingw c compiler, mingw compiler, gcc compiler on windows, mingw for windows, mingw w64 install exe, mingw32, mingw w64 install, mingw w64 download, mingw32 make, mingw gcc, download mingw for windows, mingw install windows, mingw c++, mingw org, mingw installation manager, mingw gcc compiler for windows, mingw c++ compiler, mingw gcc compiler download, download mingw w64, mingw64 download 2 Click Installation, ehsan, ehsan18t, ehsan khan, 64-bit, 32-bit, Development Tools, Programming, Compiler, Setup, Simplified Installation"
        />
        <meta
          name="description"
          content="Simplify MinGW installation with just two clicks. Get both 64-bit and 32-bit support for easy development."
        />

        <meta name="author" content="Ehsan Khan (ehsan18t)" />
        <meta name="robots" content="index, follow" />

        {/* <!-- Open Graph tags for social media sharing --> */}
        <meta
          property="og:title"
          content="Easy MinGW Installer - 2 Click MinGW Installation for 64-bit & 32-bit"
        />
        <meta
          property="og:description"
          content="Simplify your MinGW setup with the Easy MinGW Installer. Just two clicks to install MinGW with support for both 64-bit and 32-bit architectures."
        />
        <meta property="og:image" content="https://easymingw.vercel.app/preview.png" />
        <meta property="og:url" content="https://easymingw.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />

        {/* <!-- Google SEO Metadata --> */}
        <meta
          name="google-site-verification"
          content="0LljyKfvHJA-ff2Rc6d05iqFO975cEQBOBcbB989ipc"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
