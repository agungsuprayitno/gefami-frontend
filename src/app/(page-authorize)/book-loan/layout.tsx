import Breadcrumb from "@/components/breadcrumb";
import Navbar from "@/components/navbar";
import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("@/components/sidebar"), { ssr: false });

export const metadata = {
  title: "Next JS Admin",
  description: "Next JS Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <section className="content h-full">
          <Navbar />
          <div className="main-content">
            <Breadcrumb />
            {children}
          </div>
        </section>
      </body>
    </html>
  );
}
