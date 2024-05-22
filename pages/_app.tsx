import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
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
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
    >
      <div className="flex mx-auto justify-center flex-col min-h-screen min-w-screen w-full max-w-7xl">
        <Header />
        <div className="my-auto">
          <Component {...pageProps} setBgImage={setBgImage} />
        </div>
        <Footer />
      </div>
    </main>
  );
}

export default App;
