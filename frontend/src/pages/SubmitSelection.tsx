import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiUrl } from '../utils';

const newResultsChoice = 'NEW_RESULTS';
const existingResultsChoice = 'EXISTING_RESULTS';

const SubmitSelection = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [choice, setChoice] = useState<undefined | string>(undefined);
    const [nameInput, setNameInput] = useState<undefined | string>(undefined);
    const [roomInput, setRoomInput] = useState<undefined | string>(undefined);

    const newResults = async () => {
        try {
            const resp = await axios.post(`${apiUrl}/create-room`, { selectedActs: state, name: nameInput });
            navigate(`/results/${resp.data.roomNumber}`);
        } catch (err) {
            console.error(err);
        }
    };

    const existingResults = async () => {
        try {
            const resp = await axios.post(`${apiUrl}/add-to-room`, {
                selectedActs: state,
                name: nameInput,
                roomNumber: roomInput,
            });
            navigate(`/results/${resp.data.roomNumber}`);
        } catch (err) {
            console.error(err);
        }
    };

    if (choice === undefined) {
        return (
            <div>
                <h1 className="h-center-text">Submit Selected Acts</h1>
                <div className="centered">
                    <button onClick={() => setChoice(newResultsChoice)}>Create New Results Room</button>
                    <button onClick={() => setChoice(existingResultsChoice)}>Submit To Existing Results Room</button>
                </div>
            </div>
        );
    }

    if (choice === newResultsChoice) {
        return (
            <div>
                <h1 className="h-center-text">Submit Selected Acts</h1>
                <div className="centered">
                    <h2>Name</h2>
                    <input name="nameInput" onChange={(e) => setNameInput(e.target.value)} />
                    <button onClick={() => newResults()}>Submit</button>
                    <button onClick={() => setChoice(undefined)}>Back</button>
                </div>
            </div>
        );
    }

    if (choice === existingResultsChoice) {
        return (
            <div>
                <h1 className="h-center-text">Submit Selected Acts</h1>
                <div className="centered">
                    <h2>Room Code</h2>
                    <input name="roomInput" onChange={(e) => setRoomInput(e.target.value)} />
                    <h2>Name</h2>
                    <input name="nameInput" onChange={(e) => setNameInput(e.target.value)} />
                    <button onClick={() => existingResults()}>Submit</button>
                    <button onClick={() => setChoice(undefined)}>Back</button>
                </div>
            </div>
        );
    }
};

export default SubmitSelection;
