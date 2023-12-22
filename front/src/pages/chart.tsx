import React from 'react';
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { endPoints, routes } from "../utils/endpoint";
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export function Chart() {
  const [price, setPrice] = useState<any>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
},[]);
  const labels = price?.name || [];

  const fetchData = async () => {
    try{
      const response = await axios.get(endPoints.Url + endPoints.Chart,{
        headers: {
          //@ts-ignore
          'Authorization': `Bearer ${localStorage.getItem('accessToken')?.replaceAll('"', "")}`
        }
      });
      if (response.status === 200) setPrice(response.data);
    
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

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    axios.post(endPoints.Url + endPoints.Logout, {
      refreshToken
    })
    localStorage.clear();
    navigate(routes.Login);
  };


  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: labels.map((_: any, index: number) => price.kol[index]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };
  return <Line options={options} data={data} />;
}