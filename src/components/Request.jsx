// import React from 'react'

import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { removeRequest } from "../utils/requestSlice";

const Request = () => {

 const dispatch = useDispatch();
 const requests = useSelector(store=>store.request);

 const reviewRequest = async(status,_id) =>{
    try{

        const res = await axios.post(BASE_URL + '/request/review/' + status + '/' + _id,{},{withCredentials : true})

        dispatch(removeRequest(_id))

    }catch(err){
        console.error(err)
    }
 }

  const fetchRequest = async() =>{
    const res = await axios.get(BASE_URL + '/user/requests/received',{wiwithCredentials : true})

    dispatch(res.data?.data)
  }

  useEffect(()=>{
    fetchRequest();
  },[])

  if(!requests) return;

  if(requests.length === 0) return <h1>No Requests Found</h1>

  return (
<div className="text-center my-10">
      <h1 className="font-bold text-4xl text-white">Connection Requests</h1>
      {
        requests.map((request)=>{

            const {_id,firstName,lastName,photoUrl,age,gender,about} = request.fromUserId;

            return (
                <div key={_id} className="w-2/3 mx-auto flex justify-between items-center m-4 p-4 border rounded-lg border-base-200">
                    <div>
                        <img alt="photo url" src={photoUrl}/>
                    </div>
                    <div className="text-left mx-4">
                        <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                        <p>{about}</p>
                        {age && gender && <p>{age + ',' + gender}</p>} 
                    </div> 
                    <div>
                        <button className="btn btn-primary mx-2" onClick={()=>reviewRequest('rejected',request._id)}>Reject</button>
                        <button className="btn btn-secondary mx-2" onClick={()=>reviewRequest('accepted',request._id)}>Accept</button>    
                    </div>  
                </div>
            )
        })
      }
    </div>
  )
}

export default Request
