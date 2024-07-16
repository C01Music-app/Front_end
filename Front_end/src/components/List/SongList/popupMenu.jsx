import React, { useEffect, useState } from "react";
import "./Popup.css";
import DeleteSongs from "./DeleteSongs"; // Import mặc định
import { Button } from "react-bootstrap";

const PopupMenu = ({ song, closePopup, makeReload }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [id, setId] = useState(-1);

  const closeModal = () => {
    makeReload();
    setShowDelete(false);
  };

  useEffect(() => {}, [showDelete]);

  const handleRadioChange = (id) => {
    setId(id);
    console.log(id);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <div className="popup-header">
          <img src={song.imgSongs} alt="Album Art" className="album-art" />
          <div className="song-info">
            <strong>{song.title}</strong>
            <span>{song.artist.name}</span>
          </div>
        </div>
        <div className="popup-body">
          <button className="popup-item">Lời bài hát</button>
          <button className="popup-item">Chặn</button>
          <button className="popup-item">Thêm vào danh sách phát</button>
          <button className="popup-item">Phát tiếp theo</button>
          <Button
            variant="danger"
            onClick={() => {
              setShowDelete(true);
              handleRadioChange(song.id); // Thiết lập id của bài hát để xóa
            }}
          >
            Xóa
          </Button>
          <button className="popup-item">Thêm vào playlist</button>
          <button className="popup-item">Chỉnh sửa</button>
          <button className="popup-item" onClick={closePopup}>
            thoát
          </button>
        </div>
        <div className="popup-footer">
          <span>Tải lên bởi {song.artist.name}</span>
        </div>
      </div>
      {showDelete && (
        <DeleteSongs closeModal={closeModal} id={id} showDelete={showDelete} />
      )}
    </div>
  );
};

export default PopupMenu;
