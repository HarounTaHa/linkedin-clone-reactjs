import React from 'react';
import './App.css';
import {BrowserRouter, Route,Routes} from "react-router-dom";
import Profile from "./Profile";
import Home from "./Home";

function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/profile' element={<Profile />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
