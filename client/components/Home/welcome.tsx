import React, { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import styles from "./welcome.module.css";
// @ts-ignore
import ConfirmModal from "./confirmModal";

function Welcome() {
  const { user } = useSelector((state: any) => state.auth);

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);

  return (
    <article className={styles.welcome}>
      <section className={styles.section}>
        <h1>Welcome to Españolified!</h1>
        <p>
          Congratulations for choosing Españolified as your language learning
          application of choice! <br /> <br />
          Join the hundreds of thousands of users who have gone from zero to
          fluent in Spanish with our app.
        </p>
      </section>
      {user ? (
        <Link href="/lessons/1-1" className={styles.Link}>
          Let&apos;s get Started!
        </Link>
      ) : (
        <button onClick={() => setOpen(true)} className={styles.Link}>
          Let&apos;s get Started!
        </button>
      )}
      <ConfirmModal open={open} setOpen={setOpen} onOpenModal={onOpenModal} />
    </article>
  );
}

export default Welcome;
