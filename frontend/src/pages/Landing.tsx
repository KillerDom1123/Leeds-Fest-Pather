import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="h-center-text">Path Finder</h1>
            <div className="centered">
                <button onClick={() => navigate('/select-acts')}>Start</button>
                <button>View Results</button>
            </div>
        </div>
    );
};

export default Landing;
