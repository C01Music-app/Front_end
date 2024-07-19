import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.css"; // Đảm bảo bạn đã tạo CSS phù hợp
import { detailSongs, findByID } from "../../../service/SongsService";
import {
  createComment,
  getAllCommentSongId,
} from "../../../service/CommentService";
import { Button } from "react-bootstrap";

const DetailSong = () => {
  const { id } = useParams();
  const [songs, setSongs] = useState(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

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
  const handleDetail = async (value, id) => {
    const res = await detailSongs(value, id);
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
  // const getComments = async () => {
  //   try {
  //     const res = await axios.get(`/api/songs/${id}/comments`);
  //     setComments(res.data);
  //   } catch (error) {
  //     console.error("Error fetching comments:", error);
  //   }
  // };
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
          {songs.artist && songs.artist.length > 0 ? (
            <ul>
              {songs.artist.map((artist) => (
                <li key={artist.id}>{artist.name}</li>
              ))}
            </ul>
          ) : (
            <p>No artists found for this song.</p>
          )}
          <p>{songs.description}</p>
          <p>
            Ngày phát hành: {new Date(songs.dateStart).toLocaleDateString()}
          </p>
          <p>Cung cấp bởi: {songs.provider}</p>
        </div>
      </div>
      {/* <div className="song-player">
        <audio controls src={songs.lyrics}></audio>
      </div>
      <button className="play-button">Phát tất cả</button> */}
      <div className="song-player">
        <audio ref={audioRef} src={songs.lyrics} />
      </div>
      <button className="play-button" onClick={togglePlay}>
        {isPlaying ? "Tạm Dừng" : " Tiếp Tục Phát "}
      </button>
      <div className="comment-section">
        <Button
          className="comment-button"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          Bình luận
        </Button>
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
              <p>{cmt.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailSong;
