import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

export function EditPlaylistModal(props) {
    const { playlistId, onHide } = props;
    const [playlistName, setPlaylistName] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [isShuffle, setIsShuffle] = useState(true);

    useEffect(() => {
        // Fetch playlist details when component mounts
        fetchPlaylistDetails();
    }, [playlistId]);

    const fetchPlaylistDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/playlists/detail/${playlistId}`);
            const playlist = response.data;
            setPlaylistName(playlist.title);
            setIsPublic(playlist.isPublic);
            setIsShuffle(playlist.isShuffle);
        } catch (error) {
            console.error('Error fetching playlist details:', error);
        }
    };

    const handleEdit = async () => {
        try {
            const updatedPlaylist = {
                id: playlistId,
                title: playlistName,
                isPublic: isPublic,
                isShuffle: isShuffle
            };

            const response = await axios.put(`http://localhost:8080/playlists/edit/${playlistId}`, updatedPlaylist);
            console.log("Updated Playlist:", response.data);
            toast.success("Playlist updated successfully");
            onHide(); // Close modal
        } catch (error) {
            console.error('Error updating playlist:', error);
            toast.error("Failed to update playlist. Please try again.");
        }
    };

    return (
        <div>
            <Modal {...props} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{color : "black"}}>Chỉnh sửa playlist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="playlistName">
                            <Form.Label>Nhập tên playlist</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên playlist"
                                value={playlistName}
                                onChange={(e) => setPlaylistName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Đóng</Button>
                    <Button variant="primary" onClick={handleEdit} disabled={!playlistName}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
