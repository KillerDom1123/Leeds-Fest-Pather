import React, { useState } from 'react';
import Act from '../components/Act';
import acts from '../shared/acts.json';
import { useNavigate } from 'react-router-dom';

console.log(acts);

const SelectAct = () => {
    const navigate = useNavigate();
    const [selectedActs, setSelectedActs] = useState<string[]>([]);

    const actOnClick = (name: string) => {
        const currentActs = [...selectedActs];
        const actIndex = currentActs.indexOf(name);
        if (actIndex > -1) {
            currentActs.splice(actIndex, 1);
        } else {
            currentActs.push(name);
        }
        setSelectedActs(currentActs);
    };

    const orderedActs = acts.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });

    const goToSubmit = () => {
        navigate('/submit-acts', {
            state: selectedActs,
        });
    };

    return (
        <div>
            <h1 className="h-center-text">Select Acts</h1>
            <div className="centered">
                <div className="content">
                    {orderedActs.map((act, index) => {
                        return (
                            <Act
                                key={`${act.name}-${index}`}
                                name={act.name}
                                imageUrl={act.imageUrl}
                                stage={act.stage}
                                timeStart={act.startTime}
                                timeEnd={act.endTime}
                                selected={selectedActs.includes(act.name)}
                                onClick={() => actOnClick(act.name)}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="next-page-sticky">
                <button onClick={() => goToSubmit()}>Submit</button>
            </div>
        </div>
    );
};

export default SelectAct;
