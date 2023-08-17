import React from 'react';
import './css/app.css';
import { BrowserRouter } from 'react-router-dom';
import NavRoutes from './components/NavRoutes';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <NavRoutes />
            </div>
        </BrowserRouter>
    );
};

export default App;
