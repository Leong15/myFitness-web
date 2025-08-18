import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/lara-dark-teal/theme.css";

// import "primereact/resources/themes/lara-light-indigo/theme.css";   //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "H&G(UAT)",
  description: "Create my healthy website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{
      backgroundImage: 'url("/images/background.png")',
      backgroundSize: 'cover', // Options: 'cover', 'contain', 'auto', or specific values like '100% 100%'
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
    }}>
        {children}
      </body>
    </html>
  );
}
