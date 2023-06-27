import Welcome from "@/components/home/welcome";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>Españolified</title>
      </Head>
      <Welcome />
    </>
  );
}
