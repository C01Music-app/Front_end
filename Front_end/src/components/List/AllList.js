import Slider from "./Slider";
import { Artists } from "./Artists/Artists";
import SongList from "./SongList/SongList";
import AlbumList1 from "./AlbumList/AlbumList1";

import React from "react";

export function AllList() {
  return (
    <>
      <div style={{ padding: "0px 24px", background: "#170F23" }}>
        <Slider />
        <AlbumList1 />
        <SongList />
      </div>
    </>
  );
}
