import axios from 'axios';
import React, { useState } from 'react';
import { apiUrl } from '../utils';
import { useLocation, useNavigate } from 'react-router-dom';

const SubmitToNewRoom = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [nameInput, setNameInput] = useState<undefined | string>(undefined);

    const newResults = async () => {
        try {
            const resp = await axios.post(`${apiUrl}/create-room`, { selectedActs: state, name: nameInput });
            navigate(`/results/${resp.data.roomNumber}`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1 className="h-center-text">Submit Selected Acts</h1>
            <div className="centered">
                <h2>Name</h2>
                <input name="nameInput" onChange={(e) => setNameInput(e.target.value)} />
                <button onClick={() => newResults()}>Submit</button>
            </div>
        </div>
    );
};

export default SubmitToNewRoom;
