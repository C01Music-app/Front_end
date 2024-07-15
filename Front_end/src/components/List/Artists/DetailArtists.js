import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function DetailArtists() {
    const [artist, setArtist] = useState(null);
    const [songs, setSongs] = useState([]);
    const { id } = useParams();

    const getByIdArtists = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/artists/detail/${id}`);
            console.log("Artist Data:", res.data);
            setArtist(res.data);
        } catch (error) {
            console.error('Error fetching artist data:', error);
        }
    }

    const getSongsByArtist = async () => {
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
            getByIdArtists();
            getSongsByArtist();
        }
    }, [id]);

    if (!artist) {
        return <div>...Loading</div>;
    }

    // Lọc bài hát dựa trên nghệ sĩ hiện tại
    const filteredSongs = Array.isArray(songs) ? songs.filter(song =>
        song.artist.some(a => a.id === artist.id)
    ) : [];

    return (
        <>
            <div>{artist.name}</div>
            <div>
                {filteredSongs.length > 0 ? (
                    <ul>
                        {filteredSongs.map(song => (
                            <li key={song.id}>
                                {song.title}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>No songs found</div>
                )}
            </div>
        </>
    );
}
