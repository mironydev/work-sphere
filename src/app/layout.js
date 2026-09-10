import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";
import { Toaster } from "sonner";
import DashboardDrawer from "@/components/dashboard/DashboardDrawer";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata = {
  title: "Home | WorkSphere",
  description: "hompage of the website",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${nunito.variable} h-full antialiased bg-[#f9f9f9] dark:bg-black scrollbar-gutter-stable`}
    >
      <body>
        <Providers>
          <Navbar />
          <DashboardDrawer />
          <main className="max-w-7xl mx-auto">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            richColors
            gap={12}
            visibleToasts={3}
            toastOptions={{
              duration: 3000,
              style: {
                pointerEvents: "none", // disables hover interaction
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
