import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { endPoints, routes } from "../utils/endpoint";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "ayaz",
    password: "ayaz2002",
  });

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) =>
    setCredentials((state) => ({
      username: e.target.value,
      password: state.password,
    }));

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setCredentials((state) => ({
      username: state.username,
      password: e.target.value,
    }));

  const onSubmit = async () => {
    const response = await axios.post(`${endPoints.Url}${endPoints.Login}`, {...credentials})
    
    if(response.status === 200){ 
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(response.data.refreshToken));

      navigate(routes.Dashboard);
    }
    else console.error(response.data);
    
  };

  useEffect(() => {
    localStorage.getItem("user") && navigate(routes.Dashboard);
  });

  return (
    <section id="login">
      <h1>Login</h1>
      <section>
        <article>
          <p>Username: </p>
          <input
            type="text"
            name="username"
            id="username"
            value={credentials.username}
            onChange={handleChangeUsername}
          />
        </article>
        <article>
          <p>Password: </p>
          <input
            type="password"
            name="password"
            id="password"
            value={credentials.password}
            onChange={handleChangePassword}
          />
        </article>
        <button onClick={onSubmit}>Login</button>
      </section>
    </section>
  );
};
