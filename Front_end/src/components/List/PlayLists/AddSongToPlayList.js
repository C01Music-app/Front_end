import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { findByID } from '../../../service/SongsService';
import { Field, Formik } from 'formik';
import axios from 'axios';

function AddPlaylistToSongModal(props) {
    const [playlists, setPlaylists] = useState([]);
    const [song, setSong] = useState(null);
    const id = parseInt(localStorage.getItem("idUser")); // Chuyển đổi userId thành số nguyên
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const res = await axios.get("http://localhost:8080/playlists");
                setPlaylists(res.data);
            } catch (error) {
                console.log('Error fetching playlists:', error);
            }
        };
        fetchPlaylists();
    }, []);

    useEffect(() => {
        const getSongById = async (songId) => {
            try {
                const res = await findByID(songId);
                setSong(res);
            } catch (error) {
                console.log('Error fetching song:', error);
            }
        };

        if (id) {
            getSongById(id);
        }
    }, [id]);

    const handleSubmitSong = async (values) => {
        console.log('Form values:', values);
        const playlistId = JSON.parse(values.playlist).id; // Assuming values.playlist is JSON stringified object with an id field
        try {
            const response = await axios.post(`/songs/${id}/add-playlist`, { id: playlistId });
            console.log('Add playlist to song response:', response.data);
            handleClose();
        } catch (error) {
            console.error('Error adding playlist to song:', error);
        }
    };


    return (
        <>
            <div className="media-right col-2">
                <button className="btn btn-outline-secondary btn-sm custom-btn vi22" onClick={handleShow}>
                    <i className="icon ic-more"></i> <h3>...</h3>
                </button>
            </div>
            <Modal style={{color : "black"}} show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm bài hát vào playlist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            title: song ? song.title : '',
                            playlist: playlists.length > 0 ? JSON.stringify(playlists[0]) : '',
                        }}
                        onSubmit={(values) => {
                            handleSubmitSong(values);
                        }}
                    >
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Tên bài hát</label>
                                <Field name="title" type="text" className="form-control" id="title" readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="playlist" className="form-label">Chọn playlist</label>
                                <Field name="playlist" as="select" className="form-control" id="playlist" required>
                                    {Array.isArray(playlists) && playlists.map((playlist) => (
                                        <option key={playlist.id} value={JSON.stringify(playlist)}>
                                            {playlist.title}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit">
                                    Cập nhật
                                </Button>
                                <Button variant="danger" onClick={handleClose}>
                                    Hủy
                                </Button>
                            </div>
                        </Form>
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddPlaylistToSongModal;
