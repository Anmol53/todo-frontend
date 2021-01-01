import React, { useState } from "react";

export default function Login(props) {
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <h1 className="heading">Login</h1>
      <form className="form">
        <label>User Name</label>
        <input
          type="text"
          placeholder="User Name"
          value={user_name}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {props.error && <div className="error">{props.error}</div>}
        <button
          type="button"
          onClick={() => props.loginHandler("login", { user_name, password })}
        >
          Log In
        </button>
        <button type="button" onClick={() => props.formToggler(false)}>
          Not have account? Signup here
        </button>
      </form>
    </>
  );
}
