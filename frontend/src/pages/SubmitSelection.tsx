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

    return (
        <div>
            <h1 className="h-center-text">Submit Selected Acts</h1>
            <div className="centered full-view-height">
                <button onClick={() => navigate('/submit-new-room', { state })}>Create New Results Room</button>
                <button onClick={() => navigate('/submit-existing-room', { state })}>
                    Submit To Existing Results Room
                </button>
            </div>
        </div>
    );
};

export default SubmitSelection;
