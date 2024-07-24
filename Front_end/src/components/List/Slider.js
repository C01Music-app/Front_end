import React, { useState, useEffect } from 'react';
import './img/ImageSlider.css';

const images = [
    'https://photo-zmp3.zmdcdn.me/banner/c/b/0/d/cb0dee2e4aec359faa6014d565dc6045.jpg',
    'https://photo-zmp3.zmdcdn.me/banner/f/c/7/e/fc7e6d84f690eb1e1e3b029b229e1617.jpg',
    'https://photo-zmp3.zmdcdn.me/banner/a/9/d/7/a9d7fb528fa70ad2c33e175d99a89d7c.jpg'
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
