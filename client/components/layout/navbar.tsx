/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setState } from "../../store/userSlice";
import { fetchUserDetails } from "../../store/userSlice";

function Navbar(): JSX.Element {
  const state = useSelector((state: any) => state.user);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    console.log("useEffect");
    const savedToken = localStorage.getItem("spanishtoken");
    console.log("savedToken", savedToken);
    if (savedToken) {
      dispatch(fetchUserDetails(savedToken));
    }
  }, []);

  // useEffect(() => {
  //   if (state.isLoggedIn) {
  //     const savedUser = JSON.parse(localStorage.getItem("spanishuser") || "");
  //     const savedToken = localStorage.getItem("spanishtoken") || "";
  //     if (savedUser) {
  //       dispatch(
  //         setState({ user: savedUser, token: savedToken, isLoggedIn: true })
  //       );
  //       const getFlashcardsAndStats = async () => {
  //         const res = await fetch(
  //           `http://localhost:3001/flashcards/${state.user.id}`
  //         );
  //         const data = await res.json();

  //         const res2 = await fetch(
  //           `http://localhost:3001/stats/${state.user.id}`
  //         );
  //         const data2 = await res2.json();
  //         console.log("stats", data, data2);
  //         dispatch(
  //           setState({
  //             user: state.user,
  //             token: state.token,
  //             isLoggedIn: true,
  //             flashcards: data,
  //             stats: data2,
  //           })
  //         );
  //       };

  //       getFlashcardsAndStats();
  //     }
  //   }
  // }, []);

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

  console.log("navbar", state);

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
