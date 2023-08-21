import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../utils';
import type acts from '../shared/acts.json';
import Act from '../components/Act';

const Results = () => {
    const { roomId } = useParams();
    const [loading, setLoading] = useState(true);
    const [selectedActs, setSelectedActs] = useState<Record<string, typeof acts>>({});
    const [matchingActs, setMatchingActs] = useState<string[]>([]);
    const [clashingActs, setClashingActs] = useState<Record<string, string[]>>({});

    const getResults = async () => {
        try {
            const resp = await axios.get(`${apiUrl}/results/${roomId}`);
            const { filteredActs, room, matchingActs, clashingActs } = resp.data as {
                filteredActs: typeof acts;
                room: Record<string, string[]>;
                matchingActs: string[];
                clashingActs: Record<string, string[]>;
            };

            setMatchingActs(matchingActs);
            setClashingActs(clashingActs);

            const userSelectedActs: Record<string, typeof acts> = {};
            for (const [name, selections] of Object.entries(room)) {
                const gotActs = filteredActs.filter((act) => selections.includes(act.name));
                userSelectedActs[name] = gotActs;
            }

            setSelectedActs(userSelectedActs);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getResults().catch((err) => console.error(err));
    }, []);

    if (loading) return null;

    const personActsEntries = Object.entries(selectedActs);

    return (
        <div>
            <h1 className="h-center-text">Room {roomId}</h1>
            <div>
                {personActsEntries.map(([person, acts]) => {
                    return (
                        <div key={person}>
                            <div>
                                <h2 key={person}>{person}</h2>
                            </div>
                            <div className="content">
                                {acts.map((act, index) => (
                                    <Act
                                        key={`${person}-${act.name}-${index}`}
                                        name={act.name}
                                        imageUrl={act.imageUrl}
                                        stage={act.stage}
                                        timeStart={act.startTime}
                                        timeEnd={act.endTime}
                                        matching={matchingActs.includes(act.name)}
                                        clashing={clashingActs[act.name]}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Results;
