import styles from "./navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetUserDetailsQuery } from "@/services/auth/authService";
import {
  setCredentials,
  logout,
  setNewData,
} from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function Navbar(): JSX.Element {
  const state = useSelector((state: any) => state.auth);
  const isNewData = useSelector((state: any) => state.auth.isNewData);
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const { data, error, refetch } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: isNewData ? 0 : 600000, // Refetch immediately if isNewData is true
  });

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
      dispatch(setNewData(false));
    }
  }, [data, dispatch, state]);

  useEffect(() => {
    if (isNewData) {
      refetch(); // Trigger a refetch immediately if isNewData is true
    }
  }, [isNewData, refetch]);

  useEffect(() => {
    if (error) {
      console.error("No token found");
    }
  }, [error]);

  const logoutButtonHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(setNewData(true));
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
