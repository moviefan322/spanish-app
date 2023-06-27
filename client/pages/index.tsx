import Welcome from "@/components/home/welcome";
import Head from "next/head";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state: any) => state.user);

  console.log(user);
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
