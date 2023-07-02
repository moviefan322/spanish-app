import styles from "./navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetUserDetailsQuery } from "@/services/auth/authService";
import { setCredentials, logout } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

function Navbar(): JSX.Element {
  const state = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<any>();
  const router = useRouter();

  // automatically authenticate user if token is found
  const { data, error } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 60000,
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      console.error("No token found");
    }
  }, [error]);

  const logoutButtonHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logout());
    router.push("/");
  };

  console.log(state);

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
