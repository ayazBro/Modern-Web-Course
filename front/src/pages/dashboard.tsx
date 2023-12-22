import { useNavigate } from "react-router-dom";
import { endPoints, routes } from "../utils/endpoint";
import { useEffect, useState } from "react";
import { IUser } from "../utils/type";
import axios from "axios";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>([])

  const fetchData = async () => {
    try{
    const response = await axios.get(endPoints.Url + endPoints.GetUser, {
      headers: {
        Authorization: `Bearer ${localStorage
          .getItem("accessToken")
          //@ts-ignore
          ?.replaceAll('"', "")}`,
      },
    });
    setData(response.data);
  }
  catch(e) {
    console.log(e)
  
      console.log("dffdf")
      const refresh = await axios.post(endPoints.Url + endPoints.RefreshToken, {
        refreshToken: localStorage.getItem("refreshToken")
        //@ts-ignore
        ?.replaceAll('"', ""),

      });
      if (refresh.status === 200) {
        localStorage.setItem("accessToken", refresh.data.accessToken);
        localStorage.setItem("refreshToken", refresh.data.refreshToken);
        fetchData();
      } else {
        logout();
      }
    
  }};


  useEffect(() => {
    fetchData()
  }, [])

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    axios.post(endPoints.Url + endPoints.Logout, {
      refreshToken
    })
    localStorage.clear();
    navigate(routes.Login);
  };

  const openUser = (id: number) => {
    navigate(`${routes.User}?id=${id}`);
  };

  return (
    <section id="contacts">
      <h1>Contacts</h1>
      <button onClick={logout}>Logout</button>
      <ul>
        {data.map((item: IUser) => (
          <li key={item.id}>
            <p>{item.firstname} {item.lastname}</p>
            <button onClick={() => openUser(item.id)}>more</button>
          </li>
        ))}
      </ul>
    </section>
  );
};
