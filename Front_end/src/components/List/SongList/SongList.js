import React, { useEffect, useState } from "react";
import "./SongList.css";
import "../../vicss/vi.css";
import { Link, useNavigate } from "react-router-dom";
import { descSongs } from "../../../service/SongsService";
import { Button } from "react-bootstrap";
import AddSongToPlayList from "../PlayLists/AddSongToPlayList";

import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

import {useDispatch, useSelector} from "react-redux";
import {selectIndex, selectMusic, selectSongs} from "../../../redux/action";


const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const validSongId = 2; // Thay giá trị này bằng ID hợp lệ của bài hát


  const dispatch = useDispatch();
  const songList=useSelector((state) => state.songs);
  const navigate = useNavigate();

  const getAll = () => {
    descSongs().then((res) => {
      setSongs(res);
      dispatch(selectSongs(res))
    });
  };

  useEffect(() => {
    getAll();
  }, [dispatch]);
  const handleMusic = (index)=>{
    console.log("-----handle song "+ index)
    dispatch(selectIndex(index))
  }

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
          {songs.map((song, index) => (
              <div className="song-item" key={song.id}>
                <img
                    src={song.imgSongs}
                    alt={song.title}
                    className="song-image"
                    onClick={() => {handleMusic(index)}}
                />
                <div className="song-info">
                  <div className="d-flex">
                    <div>
                      <div className="song-title vicc ">
                        <div className="custom-link">
                          <Link to={`/detail/${song.id}`} className="white-text link">
                            {song.title}{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="media-right col-2">
                      <Button
                          className="btn btn-outline-secondary btn-sm custom-btn vi22"
                          onClick={() => setModalShow(true)}
                      >
                        +
                      </Button>
                      <AddSongToPlayList
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                      />
                    </div>
                  </div>
>>>>>>> 114cee5 (update audioPlayer)
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default SongList;
