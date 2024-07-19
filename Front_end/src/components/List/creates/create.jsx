import React, { useEffect, useState } from "react";
import "../creates/cre.css";
import { Button } from "react-bootstrap";
import { CreateSongs } from "../SongList/CreateSongs";
import { descSongs } from "../../../service/SongsService";
import { Link } from "react-router-dom";
import PopupMenu from "../SongList/popupMenu"; // Đảm bảo đường dẫn tới thành phần đúng

export const Create = () => {
  const [show, setShow] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("");
  const [id, setID] = useState(-1);
  const [reload, setReload] = useState(false);
  const [songs, setSongs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const togglePopup = (song) => {
    setSelectedSong(song);
    setShowPopup(!showPopup);
  };

  const closeModal = () => {
    setShow(false);
  };

  const makeReload = () => {
    setSelectedRadio("");
    setID(-1);
    setReload(!reload);
  };
  const handleRadioChange = (id) => {
    setID(id);
  };

  useEffect(() => {
    console.log(show);
    getAll();
  }, [show, id, reload]);
  const getAll = () => {
    descSongs().then((res) => {
      setSongs(res);
    });
  };

  if (!songs) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div className="horizontal-layout zm-navbar-menu-container">
        <div className="text">
          <h1>Thư viện</h1>
        </div>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <g filter="url(#filter0_d_3141_46346)">
            <circle cx="22" cy="21" r="18" fill="#FEFFFF"></circle>
          </g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.8449 13.5557C18.1011 13.14 17.7292 12.9322 17.4248 12.9672C17.1591 12.9977 16.9187 13.1388 16.7624 13.3558C16.5833 13.6045 16.5833 14.0305 16.5833 14.8825V27.1179C16.5833 27.9698 16.5833 28.3958 16.7624 28.6445C16.9186 28.8615 17.1591 29.0026 17.4247 29.0331C17.7292 29.0681 18.101 28.8604 18.8447 28.4448L29.7922 22.3277C30.568 21.8942 30.9559 21.6775 31.0849 21.3922C31.1973 21.1434 31.1973 20.8584 31.0849 20.6096C30.956 20.3243 30.5681 20.1076 29.7923 19.674L18.8449 13.5557Z"
            fill="#141414"
          ></path>
          <defs>
            <filter
              id="filter0_d_3141_46346"
              x="0"
              y="0"
              width="44"
              height="44"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              ></feColorMatrix>
              <feOffset dy="1"></feOffset>
              <feGaussianBlur stdDeviation="2"></feGaussianBlur>
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
              ></feColorMatrix>
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_3141_46346"
              ></feBlend>
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_3141_46346"
                result="shape"
              ></feBlend>
            </filter>
          </defs>
        </svg>
      </div>

      <ul className="zm-navbar-menu">
        <li className="zm-navbar-item is-active">
          <div className="navbar-link">
            <a className="" href="/mymusic/song">
              BÀI HÁT
            </a>
          </div>
        </li>
        <li className="zm-navbar-item">
          <div className="navbar-link">
            <a className="" href="/mymusic/album">
              ALBUM
            </a>
          </div>
        </li>
        <li className="zm-navbar-item">
          <div className="navbar-link">
            <a className="" href="/mymusic/mv">
              MV
            </a>
          </div>
        </li>
      </ul>
      <hr className="sidebar-divider d-none d-md-block" />
      <a className="item active button" href="/in">
        Yêu thích
      </a>
      <a className="item active button" href="/in">
        Đã tải lên
      </a>

      <div className="zm-empty">
        <div className="icon upload-song"> </div>
        <div className="songs-list">
          {songs.map((song, index) => (
            <div className="song-item" key={song.id}>
              <img
                src={song.imgSongs || "default-image-url.jpg"}
                alt={song.title}
                className="song-image"
              />
              <div className="song-info">
                <div className="d-flex">
                  <div>
                    <div className="song-title">
                      <div className="custom-link">
                        <Link
                          to={`/songs/detail/${song.id}`}
                          className="white-text link"
                        >
                          {song.title}
                        </Link>
                      </div>
                      {song.premium && <span className="premium">PREMIUM</span>}
                    </div>
                    <div>
                      {/*<p className="song-artist">{song.artist[0].name}</p>*/}
                      <p className="song-time">{song.dateStart}</p>
                    </div>
                  </div>
                  <div className="media-right">
                    <button
                      className="btn btn-outline-secondary btn-sm custom-btn"
                      onClick={() => togglePopup(song)}
                    >
                      <i className="icon ic-more"></i>
                      <h3>...</h3>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <Button
            onClick={() => {
              setShow(true);
            }}
            className="is-outlined active is-medium is-upper zm-btn"
          >
            Khởi tạo
          </Button>
        </div>
      </div>
      <CreateSongs
        show={show}
        closeModal={closeModal}
        makeReload={makeReload}
      />
      {showPopup && (
        <PopupMenu
          makeReload={makeReload}
          song={selectedSong}
          closePopup={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};
