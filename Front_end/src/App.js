import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Master from "./pages/Master/Master";
import './App.css';
import Slider from "./components/List/Slider";

function App() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Master />}>
                        <Route path="/" element={<Slider />}/>
                    </Route>
                </Routes>
            </BrowserRouter>
    );
}

export default App;
