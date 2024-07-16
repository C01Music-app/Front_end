import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArtistsList = () => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/artists')
            .then(response => {
                setArtists(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the artists!', error);
            });
    }, []);

    return (
        <div>
            <h1>Artists List</h1>
            {artists.map(artist => (
                <div key={artist.id}>
                    <h2>{artist.name}</h2>
                    <h3>Songs</h3>
                    <ul>
                        {artist.songs && artist.songs.length > 0 ? (
                            artist.songs.map(song => (
                                <li key={song.id}>
                                    <h4>{song.title}</h4>
                                    <img src={song.imgSongs} alt={song.title} />
                                    <p>{song.description}</p>
                                    <p>{song.time}</p>
                                    <p>{song.dateStart}</p>
                                    <p>{song.lyrics}</p>
                                    <p>{song.listens}</p>
                                    <p>{song.likes}</p>
                                    <p>{song.lableSong}</p>
                                </li>
                            ))
                        ) : (
                            <p>No songs available</p>
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ArtistsList;
