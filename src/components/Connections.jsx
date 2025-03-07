// import React from 'react'

import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnection } from "../utils/connectionSlice"
import { Link } from "react-router"

const Connections = () => {

 const dispatch = useDispatch();
 const connections = useSelector(store=>store.connection)


 const fetchConnection = async() =>{
    const res = await axios.get(BASE_URL + '/user/connection',{withCredentials : true})

    dispatch(addConnection(res.data?.data))
 }

 useEffect(()=>{
    fetchConnection();
 },[])

 if(!connections) return;

 if(connections.length === 0) return <h1>No Connection Found</h1>

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-4xl text-white">Connections</h1>
      {
        connections.map((connection)=>{

            const {_id,firstName,lastName,photoUrl,age,gender,about} = connection;

            return (
                <div key={_id} className="w-1/2 mx-auto flex m-4 p-4 border rounded-lg border-base-200">
                    <div>
                        <img alt="photo url" src={photoUrl}/>
                    </div>
                    <div className="text-left mx-4">
                        <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                        <p>{about}</p>
                        {age && gender && <p>{age + ',' + gender}</p>} 
                    </div>
                    <Link to={"/chat/" + _id}>
                      <button className="btn btn-primary">Chat</button>
                    </Link>
                    
                </div>
            )
        })
      }
    </div>
  )
}

export default Connections
