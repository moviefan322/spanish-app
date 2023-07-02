/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setState } from "../../store/userSlice";
import styles from "./login-form.module.css";
import { useRouter } from "next/router";
import Spinner from "../spinner/spinner";
import { registerUser } from "@/features/auth/authActions";
import RegistrationData from "@/types/RegistrationData";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/configureStore";

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const loginEmailInputRef = useRef<HTMLInputElement>(null);
  const loginPasswordInputRef = useRef<HTMLInputElement>(null);
  const signupEmailInputRef = useRef<HTMLInputElement>(null);
  const signupPasswordInputRef = useRef<HTMLInputElement>(null);
  const signupPasswordConfirmInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const {
    loading,
    user,
    error: stateError,
    success,
  } = useSelector((state: any) => state.auth);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      router.push("/");
    }
  }, [success, router]);

  useEffect(() => {
    if (stateError) {
      setError(error);
    }
  }, [stateError]);

  const switchModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    resetForm();
  };

  const resetForm = () => {
    if (loginEmailInputRef && loginEmailInputRef.current) {
      loginEmailInputRef.current.value = "";
    }

    if (loginPasswordInputRef && loginPasswordInputRef.current) {
      loginPasswordInputRef.current.value = "";
    }

    if (signupEmailInputRef && signupEmailInputRef.current) {
      signupEmailInputRef.current.value = "";
    }

    if (signupPasswordInputRef && signupPasswordInputRef.current) {
      signupPasswordInputRef.current.value = "";
    }

    if (
      signupPasswordConfirmInputRef &&
      signupPasswordConfirmInputRef.current
    ) {
      signupPasswordConfirmInputRef.current.value = "";
    }

    if (usernameInputRef && usernameInputRef.current) {
      usernameInputRef.current.value = "";
    }

    setError("");
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredEmail = loginEmailInputRef.current?.value;
    const enteredPassword = loginPasswordInputRef.current?.value;

    const packageData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(packageData),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      setError(data.message);
      return;
    }

    dispatch(
      setState({
        user: data.currentUser,
        token: data.access_token,
        isLoggedIn: true,
      })
    );

    resetForm();
    localStorage.setItem("spanishuser", JSON.stringify(data.currentUser));
    localStorage.setItem("spanishtoken", JSON.stringify(data.access_token));
    router.push("/");
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredEmail = signupEmailInputRef.current?.value;
    const enteredPassword = signupPasswordInputRef.current?.value;
    const enteredPasswordConfirm = signupPasswordConfirmInputRef.current?.value;
    const enteredUsername = usernameInputRef.current?.value;

    if (enteredPassword !== enteredPasswordConfirm) {
      setError("Passwords do not match");
      return;
    }

    const packageData: RegistrationData = {
      email: enteredEmail,
      password: enteredPassword,
      username: enteredUsername,
    };

    const dispatchTyped = dispatch as ThunkDispatch<RootState, null, AnyAction>;
    dispatchTyped(registerUser(packageData));

    resetForm();
  };

  if (loading) {
    return <Spinner />;
  }

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
            <button onClick={switchModeHandler} className={styles.Link}>
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
                type="password"
                id="password2-signup"
                className="form-control"
                ref={signupPasswordConfirmInputRef}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>

            {error && <p className={styles.error}>{error}</p>}
          </form>

          <div>
            <p>Already Registered?</p>
            <button onClick={switchModeHandler} className={styles.Link}>
              Click Here To Login
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginForm;
