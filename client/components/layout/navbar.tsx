import styles from "./navbar.module.css";
import Link from "next/link";
import { useGetUserDetailsQuery } from "@/services/auth/authService";
import { setCredentials, logout } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../spinner/spinner";
import { useEffect } from "react";

function Navbar(): JSX.Element {
  const state = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<any>();

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    // perform a refetch every 15mins
    pollingInterval: 60000,
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  const logoutButtonHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logout());
  };

  console.log(data);

  if (isFetching || !data) {
    return <Spinner />;
  }

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
