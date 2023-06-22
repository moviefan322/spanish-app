import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "@/components/layout/layout";
import { UserContext } from "@/context/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  
  return (
      <Layout>
        <main className="container">
          <Component {...pageProps} />
        </main>
      </Layout>
  );
}
