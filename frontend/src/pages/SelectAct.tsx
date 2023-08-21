import React, { useState } from 'react';
import Act from '../components/Act';
import acts from '../shared/acts.json';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitToExistingResults } from '../utils/api';
import { sortAct } from '../utils/utils';

type State = {
    state: {
        acts: string[];
        room: number;
        person: string;
    };
};

const SelectAct = () => {
    const navigate = useNavigate();
    const { state }: State = useLocation();
    const [selectedActs, setSelectedActs] = useState<string[]>([]);
    const [checkedState, setCheckedState] = useState(false);

    const [forPerson, setForPerson] = useState<string | undefined>(undefined);
    const [forRoom, setForRoom] = useState<number | undefined>(undefined);

    if (!checkedState) {
        if (state) {
            setSelectedActs(state.acts);
            setForPerson(state.person);
            setForRoom(state.room);
        }

        setCheckedState(true);
    }

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

    const goToSubmit = async () => {
        if (forPerson && forRoom) {
            try {
                const resp = await submitToExistingResults(selectedActs, forPerson, String(forRoom));
                navigate(`/results/${resp.data.roomNumber}`);
            } catch (err) {
                console.error(err);
            }
        } else {
            navigate('/submit-acts', {
                state: selectedActs,
            });
        }
    };

    return (
        <div>
            <h1 className="h-center-text">Select Acts</h1>
            <div className="centered">
                <div className="content">
                    {sortAct(acts).map((act, index) => {
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
                <button onClick={() => goToSubmit()}>Submit {selectedActs.length} Acts</button>
            </div>
        </div>
    );
};

export default SelectAct;
