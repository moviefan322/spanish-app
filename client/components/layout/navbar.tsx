/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./navbar.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setState } from "../../store/userSlice";

function Navbar(): JSX.Element {
  const { user } = useSelector((state: any) => state.user);

  const dispatch = useDispatch();

  const logoutButtonHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem("spanishuser");
    dispatch(setState({ user: null, token: "" }));
  };
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <strong>Españolified</strong>
        </li>
      </ul>
      {user && <p>Greetings, {user.username}!</p>}
      <ul className={styles.links}>
        <li>
          <Link href="/">Home</Link>
        </li>
        {!user ? (
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
