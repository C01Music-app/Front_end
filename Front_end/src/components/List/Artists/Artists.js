import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ArtistCarousel.css';
import Card from 'react-bootstrap/Card';

const ArtistCarousel = () => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await axios.get('http://localhost:8080/artists'); // Thay thế bằng URL API thực tế
                setArtists(response.data);
            } catch (error) {
                console.error('Có lỗi xảy ra khi gọi API:', error);
            }
        };

        fetchArtists();
    }, []);

    return (
        <div className="app12">
            <h1 className="zm-section-title12 ">Ca sĩ đang hot </h1>
            {/* <Link to="/son">vi du</Link> */}
            <div className="zm-carousel-wrapper12">
                <div className="zm-carousel">
                    <div className="zm-carousel__container12">
                        {artists.map((album, index) => (
                            <div className="zm-carousel-item12" key={album.id} style={{ width : "50%",padding:'0 80px'}}  >
                                <div className="">
                                    <div className="zm-card">
                                        <a href="/" title={album.name}>
                                            <div className="zm-card-image">
                                                <figure className="image is-20x48">
                                                    <img src={album.img} alt={album.name} style={{height:'150px'}}/>
                                                </figure>
                                            </div>
                                        </a>
                                        <div className="zm-card-content12 ">
                                            <h3 className=" subtitle12 " style={{left : "100px"}}>{album.name}</h3>
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
