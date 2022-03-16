import React from 'react';
import './App.css';
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";

function App() {
    return (
        <div className="app">
            <Header />
            <div className="app-body">
            <Sidebar />
            <Feed />
            </div>
            {/*App Body*/}
            {/*Sidebar*/}
            {/*Feed*/}
            {/*Widgets*/}

        </div>
    );
}

export default App;
