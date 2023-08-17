import React from 'react';
import Act from '../components/Act';
import fs from 'fs';
import acts from '../shared/acts.json';

console.log(acts);

const SelectAct = () => {
    return (
        <div>
            <h1 className="h-center-text">Select Acts</h1>
            <div className="centered">
                <div className="content">
                    {acts.map((act) => (
                        <Act
                            key={act.name}
                            name={act.name}
                            stage={act.stage}
                            timeStart={act.startTime}
                            timeEnd={act.endTime}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectAct;
