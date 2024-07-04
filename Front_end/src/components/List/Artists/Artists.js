import React, {useEffect, useState} from "react";
import {artistsService} from "../../../service/ArtistsService";


export function Artists() {
    const [artists, setArtists] = useState([]);

    const getAllArtists = async () => {
        const response = await artistsService();
        setArtists(response);
    }

    useEffect(() => {
        getAllArtists();
    }, [])

    if (!artists) {
        return <div>Loading...</div>;
    }

    return (
        <>

            <h1 className="ath-0" style={{paddingLeft : '10px'}}>Ca sĩ mới</h1>

            <div className="row-h">
                {artists.map((artist) => (
                <div className="card-deck-h">
                    <div className="card">
                        <img className="card-img-top" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">{artist.name}</h5>
                            <h5 className="card-title">{artist.songs.category}</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </>
    )
}