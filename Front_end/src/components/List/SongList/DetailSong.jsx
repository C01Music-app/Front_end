import React, { useEffect, useState } from "react";
import Figure from "react-bootstrap/Figure";

import * as SongsService from "../../../service/SongsService";
import "./detail.css";
export const DetailSong = () => {
  const [songs, setSongs] = useState([]);

  const getSongs = async (id) => {
    try {
      console.log(`current id: ${id}`);
      const res = await SongsService.findByID(id);
      setSongs(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDetail = async (value, id) => {
    const res = await SongsService.detailSongs(value, id);
  };
  useEffect(() => {
    // console.log(`staff: ${songs}`);
    // console.log(id);
    getSongs();
  }, [songs]);
  if (!songs) {
    return <div>loanding...</div>;
  }
  return (
    <div className="song-detail">
      <div className="song-header">
        <img src={songs.imgSongs} alt={songs.title} className="album-art" />
        <div className="song-info">
          <h2>{songs.title}</h2>
          <p>{songs.artist.name}</p>
          <p>{songs.duration}</p>
        </div>
      </div>
      <div className="song-body">
        <button className="play-button">Phát Bài Hát</button>
        <p>{songs.description}</p>
      </div>
    </div>
  );
};
