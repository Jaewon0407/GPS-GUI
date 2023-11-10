import React from 'react';

// Components 
import MapComponent from './components/Map';
import CoordinateDisplay from './components/Coordinate';

// CSS 
import './styles/Web.css';

const App = () => {

    return (
        <div>
            <div className='title-container'>
                <div className='title'>SFU Aerospace GPS</div>
            </div>
            <MapComponent />
            <div className='coordinate-container'>
                <CoordinateDisplay />
            </div>
        </div>
    );

};

export default App;
