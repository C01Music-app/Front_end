import React, {useEffect, useState} from "react";
import {artistsService, getByIdArtistsService} from "../../../service/ArtistsService";
import {Link} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";



export function Artists() {
    const [artists, setArtists] = useState([]);

    const getArtists = async () => {
        const res = await artistsService();
        setArtists(res);
    }

    useEffect(() => {
         getArtists()
     },[])


    if (!artists){
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1 className="ath-0" style={{paddingLeft: '10px' , color:'white'}}>Ca sĩ mới</h1>
            <div className="row-h">
                {artists.map((artist) => (
                    <div className="card-deck-h col-lg-4 col-xl-3 col-md-6" key={artist.id}>
                        <Link to={'/artists/detail/' + artist.id} className="link-none">
                            <div className="card-body">
                                <h5 className="card-title title-h" style={{textAlign:'center'}}>
                                    {artist.name}
                                </h5>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}