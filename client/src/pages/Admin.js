import axios from "axios";
import React, { useState } from "react";

import "./Admin.scss";

export const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const [loginError, setLoginError] = useState(false);

  const [ips, setIPs] = useState([]);
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    setLoginError(false);
    axios
      .get("/admin/ips", {
        headers: { authorization: `Basic ${btoa(username + ":" + password)}` },
      })
      .then((response) => {
        setLoggedIn(true);
        setIPs(response.data.ips)
      })
      .catch((err) => {
        setLoginError(true);
      });
  };
  return (
    <div className="container">
      {loggedIn === false && (
        <form className="form">
          <h2>Login as Admin</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />

          <input
            type="password"
            name="password"
            placeholder="**********"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="false"
          />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          {loginError && <p className="login-failed">login failed</p>}
        </form>
      )}

      {loggedIn && (
        <div>
          <ul>
              {ips.map(x => <li>{x}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};
