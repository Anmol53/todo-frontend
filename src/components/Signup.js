import React, { useState } from "react";

export default function Signup(props) {
  const [user_name, setUserName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [user_mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <h1 className="heading">Sign up</h1>
      <form className="form">
        <label>User Name</label>
        <input
          type="text"
          placeholder="User Name"
          value={user_name}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <label>First Name</label>
        <input
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <label>Email ID</label>
        <input
          type="email"
          placeholder="Mail ID"
          value={user_mail}
          onChange={(e) => setMail(e.target.value)}
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
          onClick={() =>
            props.signupHandler("signup", {
              user_name,
              first_name,
              last_name,
              user_mail,
              password,
            })
          }
        >
          Sign Up
        </button>
        <button type="button" onClick={() => props.formToggler(true)}>
          Already User? Login here
        </button>
      </form>
    </>
  );
}
