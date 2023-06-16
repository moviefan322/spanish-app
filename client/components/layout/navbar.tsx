import styles from "./navbar.module.css";
import Link from "next/link";

function Navbar(): JSX.Element {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <strong>Spanish Grammar</strong>
        </li>
      </ul>
      <ul className={styles.links}>
        <li>
          <Link href="#">Home</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <a href="#" role="button">
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
