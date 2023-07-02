/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setState } from "../../store/userSlice";
import { getUserDetails } from "../../store/userSlice";

function Navbar(): JSX.Element {
  const state = useSelector((state: any) => state.auth);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    const userIdFromStorage: any = localStorage.getItem("spanishuser");
    const userId = JSON.parse(userIdFromStorage);
    dispatch(getUserDetails(userId.id));
  }, []);

  const logoutButtonHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem("spanishuser");
    dispatch(
      setState({
        user: null,
        token: "",
        isLoggedIn: false,
        flashcards: [],
        stats: [],
      })
    );
  };

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
        {!state.isLoggedIn ? (
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
