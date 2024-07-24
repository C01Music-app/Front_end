import React, { useEffect, useState } from "react";
import "./Popup.css";
import DeleteSongs from "./DeleteSongs"; // Import mặc định
import { Button } from "react-bootstrap";
import { DetailSong } from "./DetailSong";
import { UpdateSongs } from "./UpdateSongs";

const PopupMenu = ({ song, closePopup, makeReload, position }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [id, setId] = useState(-1);
  const [showUpdate, setShowUpdate] = useState(false);

  const closeModal = () => {
    makeReload();
    setShowDelete(false);
    setShowUpdate(false);
  };

  useEffect(() => {}, [showDelete, showUpdate]);

  const handleRadioChange = (id) => {
    setId(id);
    console.log(id);
  };

  return (
    <div className="popup" style={{ top: position.top, left: position.left }}>
      <div className="popup-content">
        <div className="popup-header">
          <img src={song.imgSongs} alt="Album Art" className="album-art" />
          <div className="song-info">
            <strong>{song.title}</strong>
            {/*<span>{song.artist.name}</span>*/}
          </div>
        </div>
        <div className="popup-body">
          <Button
            variant="danger"
            className="popup-item"
            onClick={() => {
              setShowDelete(true);
              handleRadioChange(song.id);
              // Thiết lập id của bài hát để xóa
            }}
          >
            Xóa
          </Button>

          <Button
            className="popup-item"
            onClick={() => {
              setShowUpdate(true);
              handleRadioChange(song.id);
              // Thiết lập id của bài hát để chỉnh
            }}
          >
            Chỉnh sửa
          </Button>
          <button className="popup-item" onClick={closePopup}>
            Thoát
          </button>
        </div>
        {/* <div className="popup-footer">
          <span>Tải lên bởi {song.artist[0].name}</span>
        </div> */}
      </div>
      {showDelete && (
        <DeleteSongs
          closeModal={closeModal}
          id={id}
          showDelete={showDelete}
          closePopup={closePopup}
        />
      )}

      <UpdateSongs closeModal={closeModal} showUpdate={showUpdate} id={id} />
    </div>
  );
};

export default PopupMenu;
