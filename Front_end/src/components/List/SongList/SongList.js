import React from "react";
import "./SongList.css";
import "../../vicss/vi.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { descSongs } from "../../../service/SongsService";
import { Button } from "react-bootstrap";
import AddSongToPlayList from "../PlayLists/AddSongToPlayList";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();

  // const getAll = () => {
  //   showSongs("", "").then((res) => {
  //     setSongs(res.content);
  //   });
  // };

  const getAll = () => {
    descSongs().then((res) => {
      setSongs(res);
    });
  };
  // const getA = () => {
  //   artistsService().then((res) => {
  //     setartist(res);
  //   });
  // };

  useEffect(() => {
    getAll();
    // getA();
  }, []);

  // useEffect(() => {
  //   console.log("kak");
  //   console.log(songs);
  // }, [songs]);

  if (!songs) {
    <div>loading...</div>;
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
            <img src={song.imgSongs} alt={song.title} className="song-image" />
            <div className="song-info">
              <div className="d-flex">
                <div>
                  <div className="song-title vicc ">
                    <div className="custom-link">
                      <Link
                        to={`songs/detail/${song.id}`}
                        className="white-text link"
                      >
                        {song.title}{" "}
                      </Link>
                    </div>

                    {song.premium && <span className="premium">PREMIUM</span>}
                  </div>
                  <div>
                    <p className="song-artist col-10 viii">
                      {song.artist[0].name}
                    </p>
                    <p className="song-time">
                      {/* {format(parseISO(song.dateStart), "dd/MM/yyyy", {
                        locale: vi,
                      })} */}
                      {song.dateStart}
                    </p>
                  </div>
                </div>
                <div className="media-right col-2">
                  <Button
                    className="btn btn-outline-secondary btn-sm custom-btn vi22"
                    onClick={() => setModalShow(true)}
                  ></Button>
                  <AddSongToPlayList
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;
