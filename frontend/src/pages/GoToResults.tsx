import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GoToResults = () => {
    const navigate = useNavigate();
    const [roomInput, setRoomInput] = useState<undefined | string>(undefined);

    return (
        <div>
            <h1 className="h-center-text absolute">Submit Selected Acts</h1>
            <div className="centered full-view-height">
                <h2>Room Code</h2>
                <input name="roomInput" onChange={(e) => setRoomInput(e.target.value)} />
                <button onClick={() => navigate(`/results/${roomInput}`)}>Submit</button>
            </div>
        </div>
    );
};

export default GoToResults;
