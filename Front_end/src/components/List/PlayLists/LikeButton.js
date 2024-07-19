import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LikeButton = ({ itemId, itemType }) => {
    const [liked, setLiked] = useState(false);
    const userId = parseInt(localStorage.getItem("idUser"));

    useEffect(() => {
        if (!userId) {
            console.error('User ID not found in localStorage');
            return;
        }
        // Optional: Check if the user has already liked the item (if your API supports this)
        // axios.get(`http://localhost:8080/likes/check?userId=${userId}&itemId=${itemId}&itemType=${itemType}`)
        //     .then(response => setLiked(response.data.liked))
        //     .catch(error => console.error('Error checking like status:', error));
    }, [userId, itemId, itemType]);

    const handleLike = async () => {
        if (!userId) {
            alert("Please log in to like items");
            return;
        }

        try {
            const like = { user: { id: userId }, [itemType]: { id: itemId } };
            await axios.post(`http://localhost:8080/likes/${itemType}`, like);
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
            await axios.delete(`http://localhost:8080/likes/${itemType}`, {
                params: { userId, itemId }
            });
            setLiked(false);
        } catch (error) {
            console.error('Error unliking item:', error);
        }
    };

    return (
        <div>
            {liked ? (
                <button onClick={handleUnlike}>Unlike</button>
            ) : (
                <button onClick={handleLike}>Like</button>
            )}
        </div>
    );
};

export default LikeButton;
