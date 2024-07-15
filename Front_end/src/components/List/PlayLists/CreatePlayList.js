import React, {useEffect, useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function CreatePlayList(props) {
    const [playlistName, setPlaylistName] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [isShuffle, setIsShuffle] = useState(true);
    const navigate = useNavigate();
    const id = localStorage.getItem("idUser");


    const handleCreate = async () => {
        try {
            const playlist = {
                title: playlistName,
                user: { id: id }, // Đảm bảo cấu trúc user đúng
                isPublic: isPublic,
                isShuffle: isShuffle
            };

            const res = await axios.post(`http://localhost:8080/playlists/create`, playlist);

            console.log("API Response:", res.data);

            setPlaylistName('');
            setIsPublic(true);
            setIsShuffle(true);
            props.onHide();
            toast.success("Playlists Created Successfully");
        } catch (err) {
            console.log("Error:", err);
            toast.error("Failed to create playlist. Please try again.");
        }
    };

    return (
        <div style={{ backgroundColor: "#33224E" }}>
            <Modal {...props} centered style={{ color: "black" }}>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo playlist mới</Modal.Title>
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
                    <Button
                        variant="primary"
                        onClick={handleCreate}
                        disabled={!playlistName}
                    >
                        Tạo mới
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
