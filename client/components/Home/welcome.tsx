import Link from "next/link";
import styles from "./welcome.module.css";

function Welcome() {
  return (
    <article className={styles.welcome}>
      <section className={styles.section}>
        <h1>Welcome to Spanish Grammar!</h1>
        <p>
          You made a good choice choosing Spanish Grammar as your language
          learning application of choice.
        </p>
      </section>
      <Link href="/lessons/1-1" className={styles.Link}>
        Let&apos;s get Started!
      </Link>
    </article>
  );
}

export default Welcome;
