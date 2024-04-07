import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="flex flex-col min-h-screen bg-[url('../public/gradient.png')] bg-cover">
      <Navbar />
      <div className="my-auto">
        <Component {...pageProps} />
      </div>
      
      <Footer />
    </main>
  );
}

export default MyApp;
