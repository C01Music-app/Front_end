import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { findByID } from '../../../service/SongsService';
import { Field, Formik } from 'formik';
import axios from 'axios';
import { useParams } from "react-router-dom";
import {toast} from "react-toastify";

function AddPlaylistToSongModal(props) {
    const [playlists, setPlaylists] = useState([]);
    const [song, setSong] = useState(null);
    const idUser = parseInt(localStorage.getItem("idUser"));
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/playlists`);
                const filteredPlaylists = response.data.filter(playlist => playlist.user && playlist.user.id === idUser);
                setPlaylists(filteredPlaylists);
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };
        fetchPlaylists();
    }, [show]);

    useEffect(() => {
        const getSongById = async (songId) => {
            try {
                const res = await findByID(songId);
                setSong(res);
            } catch (error) {
                console.log('Error fetching song:', error);
            }
        };
        if (props.songId) {
            getSongById(props.songId);
        }
    }, [props.songId]);

    const handleClose = () => setShow(false);

    const handleSubmitSong = async (values) => {
        console.log(values)
        try {
            const selectedPlaylist = JSON.parse(values.playlist);
            const response = await axios.patch(`http://localhost:8080/songs/${song.id}/add-to-playlist/${selectedPlaylist.id}`);
            toast.success("Add song successfully");
            handleClose();
            if (response.status === 200) {
                console.log(`Successfully updated song with playlist ID ${selectedPlaylist.id}`);
                handleClose();
            } else {
                console.error('Failed to update song:', response.data);
            }
        } catch (error) {
            console.error('Error updating song:', error);
        }
    };

    return (
        <>
            <div className="media-right col-12">
                <button className="btn-outline-secondary  custom-btn vi22" onClick={() => setShow(true)}>
                    <h3>...</h3>
                </button>
            </div>
            <Modal style={{ color: "black" }} show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm bài hát vào playlist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            title: song ? song.title : '',
                            playlist: playlists.length > 0 ? JSON.stringify(playlists[0]) : '',
                            id: song ? song.id : null, // Ensure id is included in initial values
                        }}
                        onSubmit={(values) => {
                            handleSubmitSong(values);
                        }}
                    >
                        {({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Tên bài hát</label>
                                    <Field name="title" type="text" className="form-control" id="title" readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="playlist" className="form-label">Chọn playlist</label>
                                    <Field name="playlist" as="select" className="form-control" id="playlist" required>
                                        {Array.isArray(playlists) && playlists.length > 0 ? (
                                            playlists.map((playlist) => (
                                                <option key={playlist.id} value={JSON.stringify(playlist)}>
                                                    {playlist.title}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">Không có playlist nào</option>
                                        )}
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
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddPlaylistToSongModal;