import React from 'react';

type ActProps = {
    name: string;
    stage: string;
    timeStart: number;
    timeEnd: number;
};

const Act = ({ name, stage, timeStart, timeEnd }: ActProps) => {
    return (
        <div className="act-container">
            <p>{name}</p>
        </div>
    );
};

export default Act;
