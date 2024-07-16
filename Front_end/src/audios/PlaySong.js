import {useEffect, useState} from "react";
import {descSongs} from "../service/SongsService";

 export function PlaySong() {
    const[songs, setSongs] = useState([]);

    const getSongs = async () => {
        try {
            const res = await descSongs();
            setSongs(res);
        }catch(e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getSongs();
    }, []);

    // descSongs

}