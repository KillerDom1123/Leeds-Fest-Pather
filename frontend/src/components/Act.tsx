import React from 'react';

type ActProps = {
    name: string;
    stage: string;
    timeStart: number;
    timeEnd: number;
};

const Act = ({ name, stage, timeStart, timeEnd }: ActProps) => {
    const start = new Date(timeStart).toLocaleString('en-GB');
    const end = new Date(timeEnd).toLocaleString('en-GB');

    // https://react.dev/learn/sharing-state-between-components

    return (
        <div className="act-container">
            <div className="act-photo">
                <img alt={name} />
            </div>
            <div className="info">
                <div className="name-stage">
                    <p className="name">{name}</p>
                    <p className="stage">{stage}</p>
                </div>
                <p className="timing">
                    {start} - {end}
                </p>
            </div>
        </div>
    );
};

export default Act;
