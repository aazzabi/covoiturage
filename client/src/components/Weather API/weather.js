import React from 'react';
import './App.css';
import Forecast from "./Forecast/Forecast";
import Logo from './Logo/Logo';

const Weather = () => {
    return (
        <div className="App">
            <header className="App-header">
                <Logo />
                <h1>React Weather App</h1>
            </header>
            <main>
                <Forecast />
            </main>

        </div>
    );
}

export default Weather;
