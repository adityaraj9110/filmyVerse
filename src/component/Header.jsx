import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import {Link, NavLink, useNavigate} from "react-router-dom"
import { AppState } from "../App";
const Header = () => {
  const useAppState = useContext(AppState); 
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem("isLogin");
    console.log("This is header page: ",useAppState.login)
    useAppState.setLogin(false);
    navigate("/login")
  }
  
  return (
    <div className="sticky z-10 header bg-black top-0   text-xl md:text-3xl  flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500">
      <Link to={"/"}><span>
        Filmy<span className="text-white">Verse</span>
      </span>
      </Link>
      
     <div className="flex items-center">
      {
        useAppState.login ? <h1 className="text-lg text-white cursor-pointer flex items-center">
        <Button className="text-white" onClick={handleLogout}>
          <span className="text-white bg-red-500 hover:bg-red-700 p-1 rounded-sm">Logout</span>
        </Button>
      </h1> : <></>
      }
      

      {
        useAppState.login ? 
        <Link to={'./addmovie'}>
      <h1 className="text-lg text-white cursor-pointer flex items-center">
        <Button className="text-white">
          <AddIcon className="mr-2" color="secondary" />
          <span className="text-white">Add New</span>
        </Button>
      </h1>
      </Link>
      :
      <Link to={'./login'}>
      <h1 className="text-lg bg-red-500 rounded-sm hover:bg-red-700 text-white cursor-pointer flex items-center">
        <Button className="text-white">
          <span className="text-white font-medium capitalize  ">Login</span>
        </Button>
      </h1>
      </Link>

      }
      </div>
    </div>
  );
};

export default Header;
