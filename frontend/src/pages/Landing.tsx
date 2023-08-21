import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="h-center-text absolute">Leeds Clasher</h1>
            <div className="centered full-view-height">
                <button onClick={() => navigate('/select-acts')}>Start</button>
                <button onClick={() => navigate('/go-to-room')}>View Results</button>
            </div>
        </div>
    );
};

export default Landing;
