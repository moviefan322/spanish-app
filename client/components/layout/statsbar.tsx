import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import styles from "./statsbar.module.css";

function Statsbar() {
  const state = useSelector((state: any) => state.user);
  return (
    <>
      {state.isLoggedIn && (
        <div className={styles.statsbar}>
          <div><strong>{state.user.username}</strong></div>
          <div>Unit/Lesson:</div>
          <div>Points:</div>
          <div>%:</div>
          <Link href="/flashcards">Flashcards</Link>
        </div>
      )}
    </>
  );
}

export default Statsbar;
