"use client";

import Footer from "@components/Footer";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Spinner from "@components/Spinner";
import "@styles/global.css";
import { useEffect, useState } from "react";

// export const metadata = {
//   title: "PrompTopia",
//   description: "Discover & Share AI Prompts.",
// };

const RootLayout = ({ children }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <html lang="en">
      <body>
        <>
          {isLoading ? (
            <div className="flex items-center justify-center min-h-screen">
              <Spinner />
            </div>
          ) : (
            <Provider>
              <div className="main">
                <div className="gradient" />
              </div>

              <main className="app">
                <Nav />
                {children}
              </main>

              <Footer />
            </Provider>
          )}
        </>
      </body>
    </html>
  );
};

export default RootLayout;
