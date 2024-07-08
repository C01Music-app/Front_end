import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getByIdArtistsService} from "../../../service/ArtistsService";

export function DetailArtists() {
    const [artists, setArtists] = useState(null);
    const {id} = useParams();


    const getByIdArtists = async () => {
        const res = await getByIdArtistsService(id);
        setArtists(res);
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (id) {
            getByIdArtists(id);
        }
    }, [id])

    if (!artists) {
        <div>...Loading</div>
    }
    return (
        <>
            <div>{artists.name}</div>
        </>)
}