import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Master from "./pages/Master/Master";
import "./App.css";
import { AllList } from "./components/List/AllList";
import { DetailSong } from "./components/List/SongList/DetailSong";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Master />} />
        {/* <Route path="/" element={<AllList />} /> */}
        <Route path="/songs/detail/:id" element={<DetailSong />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
