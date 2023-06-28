/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setState } from "../../store/userSlice";

function Navbar(): JSX.Element {
  const state = useSelector((state: any) => state.user);
  const [user, setUser] = useState<any>({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.isLoggedIn) {
      try {
        const savedUser = JSON.parse(localStorage.getItem("spanishuser") || "");
        const savedToken = localStorage.getItem("spanishtoken") || "";
        if (savedUser) {
          dispatch(
            setState({ user: savedUser, token: savedToken, isLoggedIn: true })
          );
          setUser({ ...savedUser, isLoggedIn: true });
        }
      } catch (error) {}
    }
  }, []);

  useEffect(() => {
    if (user.isLoggedIn) {
      const getFlashcards = async () => {
        const res = await fetch(`http://localhost:3001/flashcards/${user.id}`);
        const data = await res.json();
        console.log(data);
        dispatch(
          setState({
            user: state.user,
            token: state.token,
            flashcards: data,
            isLoggedIn: true,
          })
        );
      };

      getFlashcards();
    }
  }, [user]);

  const logoutButtonHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem("spanishuser");
    dispatch(setState({ user: null, token: "" }));
  };

  console.log(user);
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <strong>Españolified</strong>
        </li>
      </ul>
      <ul className={styles.links}>
        <li>
          <Link href="/">Home</Link>
        </li>
        {!user.isLoggedIn ? (
          <li>
            <Link href="/login">Login</Link>
          </li>
        ) : (
          <li>
            <Link href="/" onClick={logoutButtonHandler}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
