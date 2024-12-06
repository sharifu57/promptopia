import Footer from "@components/Footer";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/global.css";

export const metadata = {
  title: "PrompTopia",
  description: "Discover & Share AI Prompts.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>

          <Footer/>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
