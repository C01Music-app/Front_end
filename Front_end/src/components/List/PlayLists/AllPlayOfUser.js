import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import {render} from "@testing-library/react";

const UserPlaylists = ({show}) => {
    const [playlists, setPlaylists] = useState([]);
    const userId = parseInt(localStorage.getItem("idUser")); // Chuyển đổi userId thành số nguyên
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName");



    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/playlists`);
                // Lọc các playlist theo user ID
                const filteredPlaylists = response.data.filter(playlist => playlist.user && playlist.user.id === userId);
                setPlaylists(filteredPlaylists);
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };
        fetchPlaylists();
    }, [show]); // Thêm userId vào mảng phụ thuộc

    if (!userId || userId === 0) {
        return null;
    }

    return (
        <>
            <li className="nav-item">
                <h1>Playlist của {userName} </h1>
                <a className="nav-link" href="/">
            <span>
              <h6>
                <div style={{marginTop: -20}}>
                {playlists.length > 0 ? (
                    <ul style={{listStyleType: 'none', paddingLeft: 5}}>
                        {playlists.map(playlist => (
                            <li key={playlist.id} style={{marginTop: 10, paddingLeft: 0}}>
                                <Link to={`/playlists/detail/${playlist.id}`}>{playlist.title}</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{marginLeft: 0}}></p>
                )}
            </div>
              </h6>
            </span>
                </a>
            </li>

        </>
    );
};

export default UserPlaylists;