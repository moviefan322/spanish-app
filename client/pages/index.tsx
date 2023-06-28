import Welcome from "@/components/home/welcome";
import { useEffect } from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { setState } from "../store/userSlice";
import FreeAndFun from "@/components/home/free-and-fun";
import UserTestimonials from "@/components/home/user-testimonials";

export default function Home() {
  const user = useSelector((state: any) => state.user);
  ``;
  const dispatch = useDispatch();

  console.log(user);

  if (user.user === undefined || user.user === null) {
    try {
      const savedUser = JSON.parse(localStorage.getItem("spanishuser") || "");
      const savedToken = localStorage.getItem("spanishtoken") || "";
      if (savedUser) {
        dispatch(setState({ user: savedUser, token: savedToken }));
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (user.user) {
      const getFlashcards = async () => {
        const res = await fetch(
          `http://localhost:3001/flashcards/${user.user.id}`
        );
        const data = await res.json();
        console.log(data);
        dispatch(
          setState({
            user: user.user,
            token: user.token,
            flashcards: data,
            isLoggedIn: true,
          })
        );
      };

      getFlashcards();
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
