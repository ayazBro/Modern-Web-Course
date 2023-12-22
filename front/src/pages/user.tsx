import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { endPoints } from "../utils/endpoint";
import { ChangeEvent, useEffect, useState } from "react";
import { IUser } from "../utils/type";

export const User = ({}: {}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isEdit, setIsEdit] = useState(false)
  const [payload, setPayload] = useState({
    id: searchParams.get("id"),
    firstname: '',
    lastname: '',
    email: '',
    birth_date: '',
  })

  const fetchData = async () => {
    const response = await axios.get((endPoints.Url+ endPoints.GetUser + `/${searchParams.get("id")}`), {
      headers: {
        //@ts-ignore
        'Authorization': `Bearer ${localStorage.getItem('accessToken')?.replaceAll('"', "")}`
      }
    })
    setPayload(state=>({...state, ...response.data}))
  }

  useEffect(() => {
    fetchData()
  }, [])
  
  
  const handleChangefirstName = (e: ChangeEvent<HTMLInputElement>) =>  setPayload((state) => ({...state, firstname: e.target.value}));
  const handleChangelastname = (e: ChangeEvent<HTMLInputElement>) =>  setPayload((state) => ({...state, lastname: e.target.value}));
  const handleChangeemail = (e: ChangeEvent<HTMLInputElement>) =>  setPayload((state) => ({...state, email: e.target.value}));
  const handleChangebirth_date = (e: ChangeEvent<HTMLInputElement>) =>  setPayload((state) => ({...state, birth_date: e.target.value}));

  const onSubmit = async () => {
    let response
    if(!isEdit)
      setIsEdit(true)
    else {
      response = await axios.put(endPoints.Url + endPoints.GetUser,
        payload,
        {
        headers: {
          //@ts-ignore
          'Authorization': `Bearer ${localStorage.getItem('accessToken')?.replaceAll('"', "")}`
        },
    })
      setIsEdit(false)
    }
  }

  return (
    <section id="user">
      <h1>User {searchParams.get("id")}</h1>
      {isEdit ?
      <>
      <span>firstname: </span>
        <input type="text" value={payload?.firstname}  onChange={handleChangefirstName}/>
        <br/>
      <span>lastname: </span>
        <input type="text" value={payload?.lastname} onChange={handleChangelastname}/>
        <br/>
      <span>email: </span>
        <input type="text" value={payload?.email} onChange={handleChangeemail}/>
        <br/>
      <span>birth_date: </span>
        <input type="text" value={payload?.birth_date} onChange={handleChangebirth_date}/>
        <br/>
      </>:
      <>
        <p>{payload?.firstname}</p>
        <p>{payload?.lastname}</p>
        <p>{payload?.email}</p>
        <p>{payload?.birth_date}</p>
      </>
    }
      
      <button onClick={() => navigate(-1)}>go back</button>
      <button onClick={onSubmit}>{isEdit? "Save" : 'Edit'}</button>
    </section>
  );
};
