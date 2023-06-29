import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import styles from "./statsbar.module.css";

function Statsbar() {
  const [user, setUser] = useState<any>({});
  const state = useSelector((state: any) => state.user);

  // useEffect(() => {
  //   if (!user.isLoggedIn || !state.isLoggedIn) {
  //     try {
  //       const savedUser = JSON.parse(localStorage.getItem("spanishuser") || "");
  //       const savedToken = localStorage.getItem("spanishtoken") || "";
  //       if (savedUser) {
  //         setUser({ ...savedUser, isLoggedIn: true });
  //       }
  //     } catch (error) {}
  //   }
  // }, []);

  return (
    <>
      {state?.user?.username && state.user && (
        <div className={styles.statsbar}>
          <div>
            <strong>{state.user.username}</strong>
          </div>
          <div>Unit: 0/20</div>
          <div>Points: 0/525</div>
          <div>0%</div>
          <Link className={styles.link} href="/flashcards">
            Flashcards
          </Link>
        </div>
      )}
    </>
  );
}

export default Statsbar;
