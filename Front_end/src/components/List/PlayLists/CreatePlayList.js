import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from "axios";

export function CreatePlayList(props) {
    const [playlistName, setPlaylistName] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [isShuffle, setIsShuffle] = useState(true);

    const handleCreate = async () => {
        try {
            const playlist = {
                title: playlistName,
                user: {
                    id: 1 // Giả sử user id là 1 hoặc bạn có thể lấy từ state hoặc context
                },
                isPublic: isPublic,
                isShuffle: isShuffle
            };

            const res = await axios.post(`http://localhost:8080/playlists/create`, playlist);

            console.log("API Response:", res.data);

            setPlaylistName('');
            setIsPublic(true);
            setIsShuffle(true);
            props.onHide();
        } catch (err) {
            console.log("Error:", err);
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
                        <Row className="mt-3">
                            <Col xs={8}>
                                <Form.Label>Công khai</Form.Label>
                                <Form.Text>Mọi người có thể nhìn thấy playlist này</Form.Text>
                            </Col>
                            <Col xs={4}>
                                <Form.Check
                                    type="switch"
                                    id="public-switch"
                                    checked={isPublic}
                                    onChange={(e) => setIsPublic(e.target.checked)}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col xs={8}>
                                <Form.Label>Phát ngẫu nhiên</Form.Label>
                                <Form.Text>Luôn phát ngẫu nhiên tất cả bài hát</Form.Text>
                            </Col>
                            <Col xs={4}>
                                <Form.Check
                                    type="switch"
                                    id="shuffle-switch"
                                    checked={isShuffle}
                                    onChange={(e) => setIsShuffle(e.target.checked)}
                                />
                            </Col>
                        </Row>
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
