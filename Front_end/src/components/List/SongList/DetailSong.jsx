import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.css";
import { detailSongs, findByID } from "../../../service/SongsService";
import {
  createComment,
  getAllCommentSongId,
  removeComment,
} from "../../../service/CommentService";
import { Button, Modal } from "react-bootstrap";

const DetailSong = () => {
  const { id } = useParams();
  const [songs, setSongs] = useState(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const userName = localStorage.getItem("userName");

  const isRoleName = localStorage.getItem("roles");



  const handleShowModal = (commentId) => {
    setCommentToDelete(commentId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCommentToDelete(null);
  };

  const getSong = async () => {
    try {
      const res = await findByID(id);
      setSongs(res);
      const resComment = await getAllCommentSongId(id);
      setComments(resComment);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSong();
  }, [id]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return;

    try {
      const newComment = await createComment(id, { content: comment });
      setComments([...comments, newComment]);
      setComment("");
      setShowCommentBox(false);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleDeleteComment = async () => {
    if (commentToDelete === null) return;

    try {
      await removeComment(id, commentToDelete);
      console.log(id, commentToDelete);
      setComments(comments.filter((comment) => comment.id !== commentToDelete));
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (!songs) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="song-detail">
        <div className="song-header">
          <img
            src={songs.imgSongs || "default-image-url.jpg"}
            alt={songs.title}
            className="song-image vi"
          />
          <div className="song-meta">
            <h2>{songs.title}</h2>

            {songs.artist && songs.artist.length > 0 ? (
              <ul>
                {songs.artist.map((artist) => (
                  <li key={artist.id}> Ca sĩ:{artist.name}</li>
                ))}
              </ul>
            ) : (
              <p>No artists found for this song.</p>
            )}
            <p>mô tả:{songs.description}</p>
            <p>
              Ngày phát hành: {new Date(songs.dateStart).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="song-player">
          <audio ref={audioRef} src={songs.lyrics} />
        </div>
        <button className="play-button" onClick={togglePlay}>
          {isPlaying ? "Tạm Dừng" : "Tiếp Tục Phát"}
        </button>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton className="vixinh">
            <Modal.Title >Xác Nhận Xóa</Modal.Title>
          </Modal.Header>
          <Modal.Body className="nam">
            Bạn có chắc chắn muốn xóa bình luận này không?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Hủy
            </Button>
            <Button variant="danger" onClick={handleDeleteComment}>
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="comment-section">
        {(isRoleName==="ADMIN" || isRoleName === "USER" ) && (
        <Button
          className="comment-button"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          Bình luận
        </Button>
        )}
        {showCommentBox && (
          <div className="comment-box nam">
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Nhập bình luận của bạn"
            ></textarea>
            <Button className="submit-button nu" onClick={handleCommentSubmit}>
              Gửi
            </Button>
          </div>
        )}
        <div className="comments-list nu">
          {comments.map((cmt, index) => (
            <div key={index} className="comment-item">
              <h1>{userName}:</h1>
              <p>{cmt.content}</p>
              <button onClick={() => handleShowModal(cmt.id)}>Xóa</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailSong;
