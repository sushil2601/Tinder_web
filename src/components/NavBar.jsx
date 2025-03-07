import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import { BASE_URL } from "../utils/constants"
import { removeUser } from "../utils/userSlice"

const NavBar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user)

  const handleLogout = async() =>{
    try{
      await axios.post(BASE_URL + '/logout',{} ,{withCredentials : true})
      dispatch(removeUser())
      return navigate('/login')
    }catch(err){
      console.error(err);
    }
    
  }

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost text-xl">DevTinder</Link>
      </div>
    <div className="flex-none gap-2">
      <div className="form-control"></div>

    {
      user && (
        <div className="dropdown dropdown-end mx-5 flex items-center">
          <p className="px-4">Welcome,{user.firstName}</p>
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost btn-circle avatar"
          >
          <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={user.photoUrl} 
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-6 w-52 pt-[40px] shadow">
        <li>
          <Link to='/profile' className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to='/connections'>Connections</Link></li>
        <li><Link to='/requests'>Requests</Link></li>
        <li><Link to='/premium'>Premium</Link></li>
        <li><Link onClick={handleLogout}>Logout</Link></li>
      </ul>
    </div>
      )
    }
  </div>
</div>
  )
}

export default NavBar
