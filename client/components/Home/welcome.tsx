import Link from "next/link";
import styles from "./welcome.module.css";

function Welcome() {
  return (
    <article className={styles.welcome}>
      <section className={styles.section}>
        <h1>Welcome to Españolified!</h1>
        <p>
          Congratulations for choosing Españolified as your language
          learning application of choice! <br /> <br />
          Join the hundreds of thousands of
          users who have gone from zero to fluent in Spanish with our app.
        </p>
      </section>
      <Link href="/lessons/1-1" className={styles.Link}>
        Let&apos;s get Started!
      </Link>
    </article>
  );
}

export default Welcome;
