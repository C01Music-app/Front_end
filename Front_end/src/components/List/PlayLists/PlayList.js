import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import "./PlayList.css";
import { EditPlaylistModal } from "./EditPlaylistModal";
import LikeButton from './LikeButton';  // Import the LikeButton component
// import { EditPlaylistModal } from "./EditPlaylistModal";
import { useDispatch, useSelector } from "react-redux";
import { selectIndex, selectSongs } from "../../../redux/action";

export function Playlist() {
    const [modalShow, setModalShow] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const [songs, setSongs] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const { id } = useParams();
    const dispatch = useDispatch();
    const listSongs = useSelector(state => state.songs);
    const userId = parseInt(localStorage.getItem("idUser"));  // Assuming userId is stored in localStorage

    const openModal = () => {
        setModalShow(true);
    };

    const getPlaylistById = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/playlists/detail/${id}`);
            console.log("Playlist Data:", res.data);
            setPlaylist(res.data);
            setNewTitle(res.data.title);
        } catch (error) {
            console.error('Error fetching playlist data:', error);
        }
    };

    const getAllSongs = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/songs`);
            console.log("Songs Data:", res.data);
            setSongs(res.data);
        } catch (error) {
            console.error('Error fetching songs data:', error);
        }
    };

    const handleEditTitle = async () => {
        try {
            const res = await axios.put(`http://localhost:8080/playlists/${id}`, { title: newTitle });
            console.log("Updated Playlist Data:", res.data);
            setPlaylist(res.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating playlist title:', error);
        }
    };

    useEffect(() => {
        if (id) {
            getPlaylistById();
            getAllSongs();
        }
    }, [id, modalShow]);
    // code của trường
    useEffect(() => {
        if (Array.isArray(songs)) {
            const filtered = songs.filter(song =>
                song.playlists.some(p => p.id === parseInt(id))
            );
            // thêm phần này
            dispatch(selectSongs(filtered));
        }
    }, [songs, id, dispatch]);

    if (!playlist) {
        return <div>...Loading</div>;
    }

    const handleClickSong = (index) =>{
        dispatch(selectIndex(index));
    }

    const handleDelete = async (songId, playlistId) => {
        try {
            const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá playlist này khỏi bài hát không?");
            if (confirmDelete) {
                const response = await axios.delete(`http://localhost:8080/songs/${songId}/playlists/${playlistId}`);
                if (response.status === 204) {
                    setSongs(songs => songs.map(song => {
                        if (song.id === songId) {
                            return {
                                ...song,
                                playlists: song.playlists.filter(p => p.id !== playlistId)
                            };
                        }
                        return song;
                    }));
                    console.log(`Playlist có ID ${playlistId} đã được xoá khỏi bài hát có ID ${songId}`);
                } else {
                    console.error('Lỗi khi xoá playlist từ bài hát:', response.data);
                }
            } else {
                console.log("Hoạt động xoá playlist đã bị huỷ bỏ.");
            }
        } catch (error) {
            console.error('Lỗi khi xoá playlist từ bài hát:', error);
        }
    };


    return (
        <div className="playlist1 col-12 px-5">
            <div className="playlist">
                <div className="playlist-header">
                    <div className="playlist-thumbnail">
                        <img src="https://photo-zmp3.zmdcdn.me/album_default.png" alt="Playlist Thumbnail" />
                    </div>
                    <div className="playlist-info">
                        <div>
                            <h3 className="playlist-title">
                                <span>{playlist.title}</span>
                                <Button variant="info" onClick={openModal}>
                                    <FaPencilAlt />
                                </Button>
                            </h3>
                            <EditPlaylistModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                playlistId={playlist.id} // Pass playlistId to EditPlaylistModal
                            />
                        </div>
                        <div className="playlist-creator">
                            Tạo bởi <span>{playlist.user ? playlist.user.userName : 'Unknown'}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container1">
                <h2 className="mt-5 mb-4">Danh sách các bài hát</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Ảnh bìa</th>
                        <th scope="col">Bài hát</th>
                        <th scope="col">Nghệ sĩ</th>
                        <th scope="col">Album</th>
                        <th scope="col">Thời gian</th>
                        <th scope="col">Chức năng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listSongs.map((song, index) => (
                        <tr key={index}>
                            <td>
                                <img
                                    src={song.imgSongs}
                                    alt={song.title}
                                    className="img-fluid rounded-circle"
                                    onClick={() => { handleClickSong(index) }}
                                />
                            </td>
                            <td>{song.title}</td>
                            <td>{song.artist.map((a) => a.name).join(', ')}</td>
                            <td>{song.album || 'N/A'}</td>
                            <td>{song.duration}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(song.id, parseInt(id))}>Xoá</button>
                                <div className="like-button-wrapper">
                                    <LikeButton userId={userId} itemId={song.id} itemType="song" />  {/* Like button for song */}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
