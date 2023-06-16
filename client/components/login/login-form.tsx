import React from "react";
import styles from "./login-form.module.css";
import Link from "next/link";

function LoginForm() {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
  return (
    <div className={styles.login}>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <div>
        <p>Not Registered?</p>
        <Link href="/signup" className={styles.Link}>
          Click Here To Sign Up
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
