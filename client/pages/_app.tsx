import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
// @ts-ignore
import Layout from "../components/layout/layout";
import store from "../store/configureStore";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <main className="container">
          <Component {...pageProps} />
        </main>
      </Layout>
    </Provider>
  );
}
