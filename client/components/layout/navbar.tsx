/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./navbar.module.css";
import Link from "next/link";

function Navbar(): JSX.Element {
  const currentUser = null;

  const logoutButtonHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log("Logout button clicked!");
  };
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <strong>Españolified</strong>
        </li>
      </ul>
      {currentUser && <p>Greetings, [USER]!</p>}
      <ul className={styles.links}>
        <li>
          <Link href="/">Home</Link>
        </li>
        {!currentUser ? (
          <li>
            <Link href="/login">Login</Link>
          </li>
        ) : (
          <li>
            <a href="/" role="button" onClick={logoutButtonHandler}>
              Logout
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
