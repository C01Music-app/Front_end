import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.css"; // Đảm bảo bạn đã tạo CSS phù hợp
import { detailSongs, findByID } from "../../../service/SongsService";

const DetailSong = () => {
  const { id } = useParams();
  const [songs, setSongs] = useState(null);
  const getSong = async () => {
    try {
      const res = await findByID(id);
      setSongs(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDetail = async (value, id) => {
    const res = await detailSongs(value, id);
  };
  useEffect(() => {
    getSong();
  }, [id]);

  if (!songs) {
    return <div>Loading...</div>;
  }

  return (
    <div className="song-detail">
      <div className="song-header">
        <img
          src={songs.imgSongs || "default-image-url.jpg"}
          alt={songs.title}
          className="song-image vi"
        />
        <div className="song-meta">
          <h2>{songs.title}</h2>
          {/*<p>{songs.artist[0].name}</p>*/}
          <p>{songs.description}</p>
          <p>
            Ngày phát hành: {new Date(songs.dateStart).toLocaleDateString()}
          </p>
          <p>Cung cấp bởi: {songs.provider}</p>
        </div>
      </div>
      {/*<div className="song-player">*/}
      {/*  <audio controls src={songs.lyrics}></audio>*/}
      {/*</div>*/}
      <button className="play-button">Phát tất cả</button>
    </div>
  );
};

export default DetailSong;
