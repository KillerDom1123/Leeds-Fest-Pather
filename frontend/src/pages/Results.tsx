import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiUrl } from '../utils';
import type acts from '../shared/acts.json';
import Act from '../components/Act';

const Results = () => {
    const { roomId } = useParams();
    const [loading, setLoading] = useState(true);
    const [selectedActs, setSelectedActs] = useState<Record<string, typeof acts>>({});

    const getResults = async () => {
        try {
            const resp = await axios.get(`${apiUrl}/results/${roomId}`);
            const { filteredActs, room } = resp.data as { filteredActs: typeof acts; room: Record<string, string[]> };

            const userSelectedActs: Record<string, typeof acts> = {};
            for (const [name, selections] of Object.entries(room)) {
                console.log(name, selections);
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
                        <div>
                            <div>
                                <h2 key={person}>{person}</h2>
                            </div>
                            <div className="content">
                                {acts.map((act, index) => (
                                    <Act
                                        key={`${act.name}-${index}`}
                                        name={act.name}
                                        imageUrl={act.imageUrl}
                                        stage={act.stage}
                                        timeStart={act.startTime}
                                        timeEnd={act.endTime}
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
