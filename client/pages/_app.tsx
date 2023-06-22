import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "@/components/layout/layout";
import { CurrentUserProvider } from "@/context/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CurrentUserProvider>
      <Layout>
        <main className="container">
          <Component {...pageProps} />
        </main>
      </Layout>
    </CurrentUserProvider>
  );
}
