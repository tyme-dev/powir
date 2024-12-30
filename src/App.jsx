import React from 'react';
import { defaults }  from 'chart.js';
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Broadcast from "./components/Broadcast";

defaults.font.family = 'Neucha'


function App() {
    return (
        <div>
            {/*<Broadcast />*/}
            <Navbar />
            <Body />
            <Footer />
        </div>
    );
}

export default App;
