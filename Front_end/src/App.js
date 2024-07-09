import React, {useEffect, useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { AllList } from "./components/List/AllList";
import axios from "axios";
import {Register} from "./pages/register/Register";
import Login from "./pages/login/Login";
import {UserList} from "./components/List/UserList";
import MenuLogin from "./layout/Topbar/MenuLogin";
import {AppProvider} from "./context/AppContext";
import {Master} from "./pages/Master/Master";

function App() {
    const [menuStatus, setMenuStatus] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);
    const openModal = () =>{
        setMenuStatus(!menuStatus);
    }

    const changeStatusLogin = () =>{
        setLoginStatus(!loginStatus);
    }

    const closeMenuLogin = () => {
        setMenuStatus(false);
    }

    useEffect(() => {
        console.log(menuStatus)
    }, [menuStatus]);

    useEffect(() => {
        const tokenStr = localStorage.getItem("token");
        axios.get("http://localhost:8080/auth/authen", { headers: {"Authorization" : `Bearer ${tokenStr}`},
        }).then((res) =>{
            console.log(res.data);
        }).catch(err => {
            localStorage.removeItem("token");
            localStorage.removeItem("userName");
            localStorage.removeItem("name");
            localStorage.removeItem("role");
            localStorage.removeItem("userAvatar");
            localStorage.removeItem("idUser");
        })
    }, []);
  return (
    <BrowserRouter>
        <AppProvider>
      <Routes>
        <Route path="/" element={<Master change={openModal} loginStatus={loginStatus}/>}>
          <Route path="/" element={<AllList />} />
            <Route path="/userList" element={<UserList />} />

            {/*<Route path="/detail/:id" element={<DetailSong />} />*/}
        </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/*<Route path="/userList" element={<UserList />} />*/}
      </Routes>
        {menuStatus? (<MenuLogin closeModal={closeMenuLogin} changeStatusLogin={changeStatusLogin}/>):(<></>)}
        </AppProvider>
    </BrowserRouter>
  );
}

export default App;
