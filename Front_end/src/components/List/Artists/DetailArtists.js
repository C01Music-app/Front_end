import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import * as songs from "react-bootstrap/ElementChildren";

export function DetailArtists() {
    const [artist, setArtist] = useState(null);
    const {id} = useParams();
    const [song, setSongs] = useState([]);


    const getByIdArtists = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/artists/detail/${id}`);
            console.log("Artist Data:", res.data);
            setArtist(res.data);
        } catch (error) {
            console.error('Error fetching artist data:', error);
        }
    }
    useEffect(() => {
        if (id) {
            getAllSongs();
            getByIdArtists();
        }
    }, [id]);

    const getAllSongs = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/songs`);
            console.log("Songs Data:", res.data);
            setSongs(res.data);
        } catch (error) {
            console.error('Error fetching songs data:', error);
        }
    };

    const filteredSongs = Array.isArray(song) ? song.filter(song =>
        song.artist.some(p => p.id === parseInt(id))
    ) : [];

    if (!artist) {
        return <div>...Loading</div>;
    }

    return (
        <>
            <div className="playlist1 col-12 px-5">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="card">
                                <img src={artist.img} className="card-img-top" alt={artist.name}
                                     style={{maxWidth: '100%', height: 'auto'}}/>
                                <div className="card-body" style={{color:"black"}}>
                                    <h5 className="card-title">{artist.name}</h5>
                                    <p className="card-text">{artist.info}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-5">
                    <h2 className="mb-4">Danh sách các bài hát</h2>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Ảnh bìa</th>
                            <th scope="col">Bài hát</th>
                            <th scope="col">Nghệ sĩ</th>
                            <th scope="col">Album</th>
                            <th scope="col">Thời gian</th>
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
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
