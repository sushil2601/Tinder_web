// import React from 'react'

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {

  const {_id ,firstName,lastName} = user;

  const dispatch = useDispatch();

  const handleSendRequest = async(status,userId) =>{
    try{

      const res = await axios.post(BASE_URL + '/request/send/' + status + '/' + userId ,{},{withCredentials : true})
      dispatch(removeUserFromFeed(userId))
    }catch(err){
      console.error(err);
    }
  }

  return  (
    <div className="card bg-slate-200 w-96 shadow-xl">
        <figure>
            <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            alt="User Photo" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName + ' ' + lastName}</h2>
            {/* <p>age && gender && {age + ', ' + gender}</p> */}
            <p>This is default about user</p>
            <div className="card-actions justify-center py-4">
                <button className="btn btn-primary" onClick={()=>handleSendRequest('ignored',_id)}>Ignore</button>
                <button className="btn btn-secondary" onClick={()=>handleSendRequest('interested',_id)}>Interested</button>
            </div>
        </div>
    </div>
  )
}

export default UserCard
