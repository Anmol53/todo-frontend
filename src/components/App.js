import React, { useState, useEffect } from "react";
import "./App.css";
import Todos from "./Todos";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  const [dark, setDark] = useState(false);
  const [loggedUser, setLoggedUser] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loginForm, setLoginForm] = useState(true);
  const serverURL = "http://localhost:9999";

  const getUserDetail = (url, cred) => {
    fetch(`${serverURL}/userDetails`, {
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return r.json().then((r) => ({ success: true, res_body: r }));
        } else {
          return r.json().then((r) => ({ success: false, res_body: r }));
        }
      })
      .then((r) => {
        if (r.success) {
          setLoggedUser(r.res_body.user);
        } else {
          setLoggedUser(undefined);
        }
      });
  };

  const loginSignupHandler = (endpoint, cred) => {
    // Try Login Here
    fetch(`${serverURL}/${endpoint}`, {
      method: "post",
      body: JSON.stringify(cred),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return { success: true };
        } else {
          return r.json();
        }
      })
      .then((r) => {
        if (r.success) {
          getUserDetail();
          setError(undefined);
        } else {
          setLoggedUser(undefined);
          setError(r.message);
        }
      });
  };

  const logout = () => {
    fetch("http://localhost:9999/logout", { credentials: "include" }).then(
      (r) => {
        if (r.ok) {
          setLoggedUser(undefined);
        }
      }
    );
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark-body");
    } else {
      document.body.classList.remove("dark-body");
    }
  }, [dark]);

  return (
    <div id="main">
      <div className="control">
        {/*Dark theme Toggler*/}
        <div className="toggler">
          <span className={`toggle-text ${dark && "dark-toggle-text"}`}>
            Dark Mode
          </span>
          <label className="switch">
            <input
              type="checkbox"
              onChange={(e) => setDark(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        {loggedUser && (
          <div className="logout">
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
      <div className={`card ${dark && "dark-card"}`}>
        {loggedUser ? (
          <Todos dark={dark} user={loggedUser} />
        ) : (
          <>
            {loginForm ? (
              <Login
                loginHandler={loginSignupHandler}
                error={error}
                formToggler={setLoginForm}
              />
            ) : (
              <Signup
                signupHandler={loginSignupHandler}
                error={error}
                formToggler={setLoginForm}
              />
            )}
          </>
        )}
      </div>
      <div className="footer-copyright">
        {`Copyright ©  ${new Date().getFullYear()} All rights reserved | This website is developed by`}
        <a href="https://anmolagrawal.tech">
          <strong>Anmol Agrawal</strong>
        </a>
      </div>
    </div>
  );
}

export default App;
