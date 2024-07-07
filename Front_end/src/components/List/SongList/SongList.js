import React from 'react';
import './SongList.css';

const songs = [
    { id: 1, title: "Đông Mặt (feat...)", artist: "Lý Bự, The Cassette", time: "Hôm nay", premium: true, image: "url_to_image1" },
    { id: 2, title: "It's A Feeling", artist: "Sigala, Trevor Daniel, 24KGoldn", time: "Hôm nay", premium: true, image: "url_to_image2" },
    { id: 3, title: "Hurt", artist: "OneRepublic", time: "Hôm nay", premium: true, image: "url_to_image3" },
    { id: 4, title: "Chuyến Đi Rực Rỡ", artist: "Vicky Nhung, Wezza", time: "Hôm nay", premium: false, image: "url_to_image4" },
    { id: 5, title: "Hell No", artist: "Saabirose", time: "Hôm qua", premium: true, image: "url_to_image5" },
    { id: 6, title: "Hạ Rơi Ngoài Sân", artist: "Thế Bảo", time: "2 ngày trước", premium: false, image: "url_to_image6" },
    { id: 7, title: "Don't", artist: "LEE CHAE YEON", time: "2 ngày trước", premium: false, image: "url_to_image7" },
    { id: 8, title: "Tough", artist: "Quavo, Lana Del Rey", time: "2 ngày trước", premium: true, image: "url_to_image8" },
    { id: 9, title: "Mẹ Anh Thường Nhắc Về Em", artist: "Freaky, O.lew", time: "3 ngày trước", premium: false, image: "url_to_image9" },
    { id: 10, title: "Lâu phai", artist: "Kai Đinh, GREY D", time: "4 ngày trước", premium: false, image: "url_to_image10" },
    { id: 11, title: "Thoáng Qua (My Love)", artist: "Quang Vinh", time: "4 ngày trước", premium: false, image: "url_to_image11" },
    { id: 12, title: "FOREVER", artist: "BABYMONSTER", time: "4 ngày trước", premium: false, image: "url_to_image12" }
];

const SongList = () => {
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
                {songs.map(song => (
                    <div className="song-item" key={song.id}>
                        <img src={song.image} alt={song.title} className="song-image" />
                        <div className="song-info">
                            <h2 className="song-title">{song.title} {song.premium && <span className="premium">PREMIUM</span>}</h2>
                            <p className="song-artist">{song.artist}</p>
                            <p className="song-time">{song.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SongList;
