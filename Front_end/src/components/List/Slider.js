import React, { useState, useEffect } from 'react';
import './img/ImageSlider.css';

const images = [
    'https://photo-zmp3.zmdcdn.me/banner/4/9/4/a/494a2c78b19387bff1eb1da5fddbe500.jpg',
    'https://photo-zmp3.zmdcdn.me/banner/8/4/e/4/84e496159fd5e94624dc869267d6929a.jpg',
    'https://photo-zmp3.zmdcdn.me/banner/2/d/3/7/2d378748d8fec62f7270cf726d4d309d.jpg'
];

const ImageSlider = () => {
    const [currentImages, setCurrentImages] = useState(images);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImages((prevImages) => {
                const newImages = [...prevImages];
                newImages.push(newImages.shift());
                return newImages;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="gallery">
            <div className="gallery-container">
                {currentImages.map((image, index) => (
                    <div className="gallery-item" key={index}>
                        <img src={image} alt={`Slide ${index}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
