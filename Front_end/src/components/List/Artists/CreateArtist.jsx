import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";

const CreateArtist = () => {
    const [name, setName] = useState('');
    const [info, setInfo] = useState('');
    const [img, setImg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/artists/create', { name, info, img });
            navigate('/artists');
            toast.success('Artist successfully created!');
        } catch (error) {
            console.error('Error creating artist:', error);
        }
    }

    return (
        <div className={'d-flex w-100 justify-content-center align-items-center '}>
            <div className={'w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'}style={{color : "black"}}>
                <h1>Add a Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className={'mb-2'}>
                        <label htmlFor={'name'}>Name:</label>
                        <input
                            type={'text'}
                            className={'form-control'}
                            id={'name'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={'Enter Name'}
                            required
                        />
                    </div>
                    <div className={'mb-2'}>
                        <label htmlFor={'info'}>Info:</label>
                        <textarea
                            className={'form-control'}
                            id={'info'}
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                            placeholder={'Enter Info'}
                            required
                        />
                    </div>
                    <div className={'mb-2'}>
                        <label htmlFor={'img'}>Image URL:</label>
                        <input
                            type={'text'}
                            className={'form-control'}
                            id={'img'}
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                            placeholder={'Enter Image URL'}
                        />
                    </div>
                    <button type={'submit'} className={'btn btn-success'}>Create</button>
                    <Link to={'/artists'} className={'btn btn-primary m-3'}>Back</Link>
                </form>
            </div>
        </div>
    );
}

export default CreateArtist;
