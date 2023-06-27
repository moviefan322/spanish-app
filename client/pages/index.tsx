import Welcome from "@/components/home/welcome";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { setState } from "../store/userSlice";

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
