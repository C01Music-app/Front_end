import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserPlaylists = ({ userId }) => {
    const [playlists, setPlaylists] = useState([]);

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
    }, [userId]);

    return (
        <div>
            <h3>Playlists for User {userId}</h3>
            {playlists.length > 0 ? (
                <ul>
                    {playlists.map(playlist => (
                        <li key={playlist.id}>{playlist.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No playlists found for this user.</p>
            )}
        </div>
    );
};

export default UserPlaylists;
