import styles from "./navbar.module.css";
import Link from "next/link";
import { useGetUserDetailsQuery } from "@/services/auth/authService";
import { useSelector, useDispatch } from "react-redux";
import { setState } from "../../store/userSlice";

function Navbar(): JSX.Element {
  const state = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<any>();

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    // perform a refetch every 15mins
    pollingInterval: 10000,
  });

  console.log(data); // user object

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
