import React from "react";
import Welcome from "../components/home/Welcome";
import Head from "next/head";
import FreeAndFun from "../components/home/Free-and-fun";
import UserTestimonials from "../components/home/User-testimonials";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>Españolified</title>
      </Head>
      <Welcome />
      <hr />
      <FreeAndFun />
      <hr />
      <UserTestimonials />
    </>
  );
}
