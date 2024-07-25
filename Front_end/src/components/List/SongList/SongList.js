import React, { useEffect, useState } from "react";
import "./SongList.css";
import "../../vicss/vi.css";
import { Link, useNavigate } from "react-router-dom";
import { descSongs } from "../../../service/SongsService";
import { Button } from "react-bootstrap";
import AddSongToPlayList from "../PlayLists/AddSongToPlayList";

import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

import { useDispatch, useSelector } from "react-redux";
import { selectIndex, selectMusic, selectSongs } from "../../../redux/action";
import LikeButton from "../PlayLists/LikeButton";

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const validSongId = 2; // Thay giá trị này bằng ID hợp lệ của bài hát
  const userId = parseInt(localStorage.getItem("idUser"));

  const dispatch = useDispatch();
  const songList = useSelector((state) => state.songs);

  const navigate = useNavigate();

  const getAll = () => {
    descSongs().then((res) => {
      setSongs(res);
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  const handleMusic = (index) => {
    dispatch(selectIndex(index));
    dispatch(selectSongs(songs));
  };

  if (!songs) {
    return <div>Loading...</div>;
  }

  return (
      <div className="app">
        <div className="header">
          <h1>Mới Phát Hành</h1>
          <div className="filters">
            <button className="filter-button active">Tất Cả</button>
            <button className="filter-button">Việt Nam</button>
            <button className="filter-button">Quốc Tế</button>
          </div>
        </div>
        <div className="songs-list">
          {songs.slice(0, 6).map((song, index) => (
              <div className="song-item" key={song.id} style={{ background: "#170F23" }}>
                <img
                    src={song.imgSongs}
                    alt={song.title}
                    className="song-image"
                    onClick={() => {
                      handleMusic(index);
                    }}
                />
                <div className="song-info" style={{ margin: 0, background: "#170F23" }}>
                  <div className="d-flex">
                    <div>
                      <div className="song-title vicc">
                        <div className="custom-link">
                          <Link
                              to={`/songs/detail/${song.id}`}
                              className="white-text link"
                          >
                            {song.title}{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="like-button-wrapper">
                  <LikeButton userId={userId} itemId={song.id} itemType="song" /> {/* Like button for song */}
                </div>
                <div className="media-right col-2">
                  <AddSongToPlayList
                      songId={song.id}
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                  />
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default SongList;
