import React, { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type ActProps = {
    name: string;
    stage: string;
    timeStart: number;
    timeEnd: number;
    selected?: boolean;
    imageUrl?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    matching?: boolean;
    clashing?: string[];
};

const Act = ({ name, imageUrl, stage, timeStart, timeEnd, selected, onClick, matching, clashing }: ActProps) => {
    const start = new Date(timeStart).toLocaleString('en-GB', {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
    });
    const end = new Date(timeEnd).toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div
            className={`act-container ${selected ? 'selected' : ''} ${matching ? 'matching' : ''} ${
                clashing ? 'clashing' : ''
            }`}
            onClick={onClick}
            title={clashing && `Clashes with ${clashing.join(', ')}`}
        >
            <div className="act-photo">
                <img loading="lazy" src={imageUrl} alt={name} />
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
