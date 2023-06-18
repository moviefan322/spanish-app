import { useState, useRef } from "react";
import styles from "./login-form.module.css";
import Link from "next/link";

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const loginEmailInputRef = useRef<HTMLInputElement>(null);
  const loginPasswordInputRef = useRef<HTMLInputElement>(null);
  const signupEmailInputRef = useRef<HTMLInputElement>(null);
  const signupPasswordInputRef = useRef<HTMLInputElement>(null);
  const signupPasswordConfirmInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredEmail = loginEmailInputRef.current?.value;
    const enteredPassword = loginPasswordInputRef.current?.value;

    const packageData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    const res = await fetch("/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(packageData),
    });

    console.log(res);
  };

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
  return (
    <>
      {isLogin ? (
        <div className={styles.login}>
          <form onSubmit={handleLoginSubmit} className={styles.form}>
            <h1>Login</h1>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                ref={loginEmailInputRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                ref={loginPasswordInputRef}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>

          <div>
            <p>Not Registered?</p>
            <button onClick={() => setIsLogin(false)} className={styles.Link}>
              Click Here To Sign Up
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.login}>
          <form onSubmit={handleRegisterSubmit} className={styles.form}>
            <h1>Register</h1>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email-signup"
                className="form-control"
                ref={signupEmailInputRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="text">Username</label>
              <input
                type="username"
                id="username"
                className="form-control"
                ref={usernameInputRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password-signup"
                className="form-control"
                ref={signupPasswordInputRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password2"
                id="password2-signup"
                className="form-control"
                ref={signupPasswordConfirmInputRef}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>

          <div>
            <p>Already Registered?</p>
            <button onClick={() => setIsLogin(true)} className={styles.Link}>
              Click Here To Login
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginForm;
