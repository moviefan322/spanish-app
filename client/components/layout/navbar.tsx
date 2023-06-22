/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useCurrentUser } from "@/context/UserContext";
import styles from "./navbar.module.css";
import Link from "next/link";

function Navbar(): JSX.Element {
  const { currentUser } = useCurrentUser();

  console.log(currentUser);
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <strong>Spanish Grammar</strong>
        </li>
      </ul>
      {currentUser && <p>Greetings, {currentUser.username}!</p>}
      <ul className={styles.links}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <a href="/home" role="button">
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
