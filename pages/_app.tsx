import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

function App({ Component, pageProps }: AppProps) {
  const [bgImage, setBgImage] = useState<string>("");

  useEffect(() => {
    if (pageProps.bgImage) {
      setBgImage(pageProps.bgImage);
    }
  }, [pageProps.bgImage]);

  return (
    <main
      className="flex flex-col min-h-screen"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
    >
      <Navbar />
      <div className="my-auto">
        <Component {...pageProps} setBgImage={setBgImage} />
      </div>
      <Footer />
    </main>
  );
}

export default App;
