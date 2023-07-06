// @ts-ignore
import Welcome from "../components/home/welcome";
import Head from "next/head";
// @ts-ignore
import FreeAndFun from "../components/home/free-and-fun";
// @ts-ignore
import UserTestimonials from "../components/home/user-testimonials";

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
