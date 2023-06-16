import styles from "./navbar.module.css";

function Navbar(): JSX.Element {
  return (
    <nav>
      <ul>
        <li>
          <strong>Spanish Grammar</strong>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Login</a>
        </li>
        <li>
          <a href="#" role="button">
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
