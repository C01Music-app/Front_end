import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ArtistCarousel.css';
import Card from 'react-bootstrap/Card';
import {Link} from "react-router-dom";

const ArtistCarousel = () => {
    const [artists, setArtists] = useState([]);

    const getRandomArtists = (artists, count) => {
        let shuffled = [...artists].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await axios.get('http://localhost:8080/artists'); // Thay thế bằng URL API thực tế
                const randomArtists = getRandomArtists(response.data, 5);
                setArtists(randomArtists);
            } catch (error) {
                console.error('Có lỗi xảy ra khi gọi API:', error);
            }
        };
        fetchArtists();
    }, []);

    return (
        <div className="app12">
            <h1 className="zm-section-title12 ">Ca sĩ đang hot </h1>
            <div className="zm-carousel-wrapper12">
                <div className="zm-carousel">
                    <div className="zm-carousel__container12">
                        {artists.map((artist, index) => (
                            <div className="zm-carousel-item12" key={artist.id}
                                 style={{width: "100%", padding: '0 50px'}}>
                                <div className="">
                                    <div className="zm-card">
                                        <Link to={`/artists/detail/${artist.id}`} title={artist.name}>
                                            <div className="zm-card-image">
                                                <figure className="image">
                                                    <img src={artist.img} alt={artist.name}
                                                         style={{ height: '150px', width: '300px' }} />
                                                </figure>
                                            </div>
                                        </Link>
                                        <div className="zm-card-content12 ">
                                            <h3 className="subtitle12" style={{left: "100px"}}>{artist.name}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistCarousel;
