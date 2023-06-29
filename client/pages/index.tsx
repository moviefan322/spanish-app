import Welcome from "@/components/home/welcome";
import { useEffect } from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import FreeAndFun from "@/components/home/free-and-fun";
import UserTestimonials from "@/components/home/user-testimonials";
import { fetchUserDetails } from "@/store/userSlice";

export default function Home() {
  const state = useSelector((state: any) => state.user);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    console.log("useEffect");
    const savedToken = localStorage.getItem("spanishtoken");
    console.log("savedToken", savedToken);
    if (savedToken) {
      dispatch(fetchUserDetails(savedToken));
    }
  }, []);

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
