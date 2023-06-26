import Welcome from "@/components/home/welcome";
import { useEffect } from "react";
import { useCurrentUser } from "@/context/UserContext";
import User from "../types/User";
import Head from "next/head";

export default function Home() {
  const { setCurrentUser } = useCurrentUser();

  useEffect(() => {
    const storedUser = localStorage.getItem("spanishuser");
    if (storedUser) {
      const user: User | null = JSON.parse(storedUser);
      setCurrentUser(user);
    }
  }, []);

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
