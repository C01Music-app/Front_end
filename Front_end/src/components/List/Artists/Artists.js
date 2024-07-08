import React, {useEffect, useState} from "react";
import {artistsService} from "../../../service/ArtistsService";
import {Link} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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
        return <div>..loading...</div>;
    }

    return (
        <>
            <h1 className="ath-0" style={{paddingLeft: '10px' , color:'white'}}>Ca sĩ mới</h1>
            <div className="row-h">
                {artists.map((artist) => (
                    <div className="card-deck-h col-lg-4 col-xl-3 col-md-6" key={artist.id}>
                        <Link to={'/detail/' + artist.id} className="link-none">
                            <div className="card-h1"
                                 style={{background: `url(${artist.img})`, backgroundSize: 'cover'}}>
                            </div>
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