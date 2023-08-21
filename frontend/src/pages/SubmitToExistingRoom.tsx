import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitToExistingResults } from '../utils/api';

const SubmitToExistingRoom = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [nameInput, setNameInput] = useState<undefined | string>(undefined);
    const [roomInput, setRoomInput] = useState<undefined | string>(undefined);

    const existingResults = async () => {
        try {
            const resp = await submitToExistingResults(state, nameInput!, roomInput!);
            navigate(`/results/${resp.data.roomNumber}`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1 className="h-center-text">Submit Selected Acts</h1>
            <div className="centered full-view-height">
                <h2>Room Code</h2>
                <input name="roomInput" onChange={(e) => setRoomInput(e.target.value)} />
                <h2>Name</h2>
                <input name="nameInput" onChange={(e) => setNameInput(e.target.value)} />
                <button onClick={() => existingResults()}>Submit</button>
            </div>
        </div>
    );
};

export default SubmitToExistingRoom;
