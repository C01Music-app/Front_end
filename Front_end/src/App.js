import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { AllList } from "./components/List/AllList";

import { PlayMusic } from "./layout/PlayMusic/PlayMusic";

import axios from "axios";
import { Register } from "./pages/register/Register";
import Login from "./pages/login/Login";
import { UserList } from "./components/List/UserList";
import MenuLogin from "./layout/Topbar/MenuLogin";
import { AppProvider } from "./context/AppContext";
import { Master } from "./pages/Master/Master";
import { UserDetail } from "./components/updateUser/UserDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Create } from "./components/List/creates/create";
import { CreateSongs } from "./components/List/SongList/CreateSongs";
import { Playlist } from "./components/List/PlayLists/PlayList";
import DeleteSongs from "./components/List/SongList/DeleteSongs";
import DetailSong from "./components/List/SongList/DetailSong";
import "react-toastify/dist/ReactToastify.css";
import AudioPlayer from "./components/audioPlayer/AudioPlayer";

function App() {
  const [menuStatus, setMenuStatus] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const openModal = () => {
    setMenuStatus(!menuStatus);
  };

  const changeStatusLogin = () => {
    setLoginStatus(!loginStatus);
  };

  const closeMenuLogin = () => {
    setMenuStatus(false);
  };

  useEffect(() => {
    console.log(menuStatus);
  }, [menuStatus]);

  useEffect(() => {
    const tokenStr = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/auth/authen", {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("name");
        localStorage.removeItem("role");
        localStorage.removeItem("userAvatar");
        localStorage.removeItem("idUser");
      });
  }, []);
  return (
    <div className="App" style={{ background: "#170F23" }}>
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route
              path="/"
              element={<Master change={openModal} loginStatus={loginStatus} />}
            >
              <Route path="/" element={<AllList />} />
              <Route path="/playlists/detail/:id" element={<Playlist />} />
              <Route path="/songs/detail/:id" element={<DetailSong />} />
              {/* <Route path="/songs/detail" element={<DetailSong />} /> */}
              <Route path="/" element={<PlayMusic />} />
              <Route path="/in" element={<Create />} />
              <Route path="/userList" element={<UserList />} />
              <Route path="/userdetail" element={<UserDetail />} />
              <Route path="/songs/create" element={<CreateSongs />} />
              <Route path="/songs/remove/:id" element={<DeleteSongs />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/audioPlayer" element={<AudioPlayer />} />
          </Routes>
          {menuStatus && (
            <MenuLogin
              closeModal={closeMenuLogin}
              changeStatusLogin={changeStatusLogin}
            />
          )}
          <ToastContainer />
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
