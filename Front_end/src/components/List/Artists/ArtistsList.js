import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import thư viện toast

const ArtistsList = () => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/artists')
            .then(response => {
                setArtists(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the artists!', error);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            const confirm = window.confirm("Are you sure you want to delete?");
            if (confirm) {
                await axios.delete(`http://localhost:8080/artists/delete/${id}`);
                setArtists(artists.filter(artist => artist.id !== id));
                toast.success("Artist deleted successfully!");
            }
        } catch (error) {
            console.error('Error deleting artist:', error);
            toast.error("Failed to delete artist.");
        }
    }

    return (
        <div>
            <h1>Artists List</h1>
            <Link to={`/artists/create`} className="btn btn-success mr-2">Create</Link>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Info</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {artists.map(artist => (
                    <tr key={artist.id}>
                        <td>{artist.name}</td>
                        <td>{artist.info}</td>
                        <td><img src={artist.img} alt={artist.name} style={{ maxWidth: '100px' }} /></td>
                        <td>
                            <Link to={`/artists/detail/${artist.id}`} className="btn btn-primary mr-2">Detail</Link>
                            <Link to={`/artists/update/${artist.id}`} className="btn btn-warning mr-2">Edit</Link>
                            <button
                                className="btn btn-danger mr-2"
                                onClick={() => handleDelete(artist.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ArtistsList;
