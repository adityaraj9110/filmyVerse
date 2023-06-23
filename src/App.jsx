import AddMovies from "./component/AddMovies";
import Cards from "./component/Cards";
import Details from "./component/Details";
import Header from "./component/Header";
import {Routes,Route, Navigate} from "react-router-dom"
import { createContext, useEffect, useState } from "react";
import Login from "./component/Login";
import Signup from "./component/Signup";
const AppState = createContext();

const  getUserLocal = ()=>{
  const user = localStorage.getItem("isLogin");
  if(user){
    const parsedUsr = JSON.parse(user);
    return parsedUsr[0];
  }else{
    return false;
  }
}
const  getUserNameLocal = ()=>{
  const user = localStorage.getItem("isLogin");
  if(user){
    const parsedUsr = JSON.parse(user);
    return parsedUsr[1];
  }else{
    return "";
  }
}
function App() {
  const [login,setLogin] = useState(getUserLocal)
  const [userName,setUserName] = useState(getUserNameLocal);
  
  console.log("user login is: ",userName)

  return (
    <AppState.Provider value={{login,userName,setLogin,setUserName}}>
    <div className="App relative">
      <Header/>
      <Routes>
        <Route path="/" element={<Cards/>}/>
        <Route path="/addmovie" element={login?<AddMovies/>:<Navigate to={"/login"}/>}/>
        <Route path="/details/:id" element={<Details/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
    </AppState.Provider>
  );
}

export default App;
export {AppState};