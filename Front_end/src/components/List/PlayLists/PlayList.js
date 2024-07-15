import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function Playlist() {
    const [playlist, setPlaylist] = useState(null);
    const [songs, setSongs] = useState([]);
    const { id } = useParams();

    const getPlaylistById = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/playlists/detail/${id}`);
            console.log("Playlist Data:", res.data);
            setPlaylist(res.data);
        } catch (error) {
            console.error('Error fetching playlist data:', error);
        }
    }

    const getAllSongs = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/songs`);
            console.log("Songs Data:", res.data);
            setSongs(res.data);
        } catch (error) {
            console.error('Error fetching songs data:', error);
        }
    }

    useEffect(() => {
        if (id) {
            getPlaylistById();
            getAllSongs();
        }
    }, [id]);

    if (!playlist) {
        return <div>...Loading</div>;
    }

    // Lọc các bài hát dựa trên id của playlist
    const filteredSongs = Array.isArray(songs) ? songs.filter(song =>
        song.playlists.some(p => p.id === parseInt(id))
    ) : [];

    const handleDelete = async (playlistId) => {
        try {
            // Sao chép mảng songs
            const updatedSongs = [...songs];

            // Tìm bài hát cần cập nhật dựa trên playlistId
            const songToUpdate = updatedSongs.find(song => song.playlists.some(p => p.id === playlistId));

            if (!songToUpdate) {
                console.error(`Không tìm thấy bài hát có playlist ${playlistId}.`);
                return;
            }

            // Hiển thị cửa sổ xác nhận
            const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xoá playlist này khỏi bài hát "${songToUpdate.title}" không?`);

            if (confirmDelete) {
                // Lọc bỏ playlist có id là playlistId khỏi bài hát
                songToUpdate.playlists = songToUpdate.playlists.filter(p => p.id !== playlistId);

                // Gửi yêu cầu cập nhật đến server
                await axios.put(`http://localhost:8080/songs/update/${songToUpdate.id}`, songToUpdate);

                // Cập nhật state của songs
                setSongs(updatedSongs);

                // Hiển thị thông báo thành công
                console.log(`Playlist có ID ${playlistId} đã được xoá khỏi bài hát có ID ${songToUpdate.id}`);
            } else {
                console.log("Hoạt động xoá playlist đã bị huỷ bỏ.");
            }
        } catch (error) {
            console.error('Lỗi khi xoá playlist từ bài hát:', error);
        }
    }


    return (
        <div className="playlist1">
            <div className="playlist">
                <div className="playlist-header">
                    <div className="playlist-thumbnail">
                        <img src="https://photo-zmp3.zmdcdn.me/album_default.png" alt="Playlist Thumbnail"/>
                    </div>
                    <div className="playlist-info">
                        <h3 className="playlist-title">
                            {playlist.title}
                            <button className="edit-btn">
                                <i className="icon ic-edit"></i>
                            </button>
                        </h3>
                        <div className="playlist-creator">Tạo bởi <span>{playlist.user.userName}</span></div>
                        <div className="playlist-privacy">Công khai</div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h2 className="mt-5 mb-4">Danh sách các bài hát</h2>
                <table className="table table-dark table-striped">
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
                    {filteredSongs.map((song, index) => (
                        <tr key={index}>
                            <td><img src={song.imgSongs} alt={song.title} className="img-fluid rounded-circle"/></td>
                            <td>{song.title}</td>
                            <td>{song.artist.map((a) => a.name).join(', ')}</td>
                            <td>{song.album || 'N/A'}</td>
                            <td>{song.duration}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(song.id)}>Xoá</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
