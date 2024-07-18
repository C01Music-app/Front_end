import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {toast} from "react-toastify";

const UpdateArtist = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [info, setInfo] = useState('');
    const [img, setImg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        loadArtist();
    }, []);

    const loadArtist = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/artists/detail/${id}`);
            const artist = response.data;
            setName(artist.name);
            setInfo(artist.info);
            setImg(artist.img);
        } catch (error) {
            console.error('Error fetching artist:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/artists/update/${id}`, { name, info, img });
            navigate('/artists');
            toast.success('Artist successfully updated!');
            // Optionally: Redirect or handle as needed
        } catch (error) {
            console.error('Error updating artist:', error);
        }
    }

    return (
        <div className="d-flex w-100 justify-content-center align-items-center">
            <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded" style={{ color: "black" }}>
                <h1>Edit Artist</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Name"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="info">Info:</label>
                        <textarea
                            className="form-control"
                            id="info"
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                            placeholder="Enter Info"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="img">Image URL:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="img"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                            placeholder="Enter Image URL"
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Update</button>
                    <Link to="/artists" className="btn btn-primary m-3">Back</Link>
                </form>
            </div>
        </div>
    );
}

export default UpdateArtist;
