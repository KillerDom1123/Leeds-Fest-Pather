import axios from 'axios';
import { apiUrl } from '../utils';

export const submitToExistingResults = async (selectedActs: string[], name: string, roomNumber: string) => {
    const resp = await axios.post(`${apiUrl}/add-to-room`, {
        selectedActs,
        name,
        roomNumber,
    });
    return resp;
};
