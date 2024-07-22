import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const LikeButton = ({ itemId, itemType }) => {
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const userId = parseInt(localStorage.getItem("idUser"));

    useEffect(() => {
        const checkIfLiked = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/likes/check`, {
                    params: {
                        userId,
                        itemId,
                        itemType
                    }
                });
                console.log('Like check response:', response.data); // Log response data
                setLiked(response.data.liked);
            } catch (error) {
                console.error('Error checking like status:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId && itemId && itemType) {
            checkIfLiked();
        }
    }, [userId, itemId, itemType]);

    const handleLike = async () => {
        if (!userId) {
            alert("Please log in to like items");
            return;
        }

        try {
            await axios.post(`http://localhost:8080/likes/${itemType}/${itemId}/like`, { userId });
            setLiked(true);
        } catch (error) {
            console.error('Error liking item:', error);
        }
    };

    const handleUnlike = async () => {
        if (!userId) {
            alert("Please log in to unlike items");
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/likes/${itemType}/${itemId}/unlike`, {
                data: { userId }
            });
            setLiked(false);
        } catch (error) {
            console.error('Error unliking item:', error);
        }
    };

    if (loading) {
        return <button disabled>Loading...</button>;
    }

    return (
        <button
            onClick={liked ? handleUnlike : handleLike}
            style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: liked ? 'red' : 'gray'
            }}
        >
            <FontAwesomeIcon icon={liked ? solidHeart : regularHeart} size="2x"/>
        </button>
    );
};

export default LikeButton;
