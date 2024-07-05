import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Master from "./pages/Master/Master";
import './App.css';
import {AllList} from "./components/List/AllList";
import {Artists} from "./components/List/Artists/Artists";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Master/>}>
                    <Route path="/" element={<AllList/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
