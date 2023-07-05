import styles from "./navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetUserDetailsQuery } from "@/services/auth/authService";
import {
  setCredentials,
  logout,
  setNewData,
} from "../../features/auth/authSlice";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useEffect } from "react";

function Navbar(): JSX.Element {
  const state = useSelector((state: any) => state.auth, shallowEqual);
  const isNewData = useSelector((state: any) => state.auth.isNewData);
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const { data, error, refetch } = useGetUserDetailsQuery("userDetails", {
    refetchOnMountOrArgChange: true,
    skip: !state.token,
    pollingInterval: isNewData ? 0 : 600000,
  });

  useEffect(() => {
    if (state.token && data) {
      dispatch(setCredentials(data));
      dispatch(setNewData(false));
    }
  }, [state.token, data, dispatch]);

  useEffect(() => {
    if (state.token && isLoggedIn) {
      refetch(); // Fetch user details using the stored token
    }
  }, [state.token, isLoggedIn, refetch]);

  useEffect(() => {
    if (data && isLoggedIn) {
      dispatch(setCredentials(data));
      dispatch(setNewData(false));
    }
  }, [data, dispatch, isLoggedIn]);

  useEffect(() => {
    if (isNewData && isLoggedIn) {
      refetch();
      dispatch(setCredentials(data));
      dispatch(setNewData(false));
    }
  }, [isNewData, refetch, data, dispatch]);

  useEffect(() => {
    console.log("isLoggedIn changed:", isLoggedIn);
  }, [isLoggedIn]);

  const logoutButtonHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    localStorage.removeItem("spanishtoken");
    setTimeout(() => {
      dispatch(logout());
    }, 10);

    router.push("/");
    console.log(isLoggedIn);
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
        {!isLoggedIn ? (
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
