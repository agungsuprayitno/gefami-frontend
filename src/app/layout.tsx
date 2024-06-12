import "./globals.css";
export const metadata = {
  title: "Next JS",
  description: "Next JS Description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear()
  return (
    <html lang="en">
      <body>
        <section className="content-full h-full">
          <div className="main-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </section>
      </body>
    </html>
  );
}
