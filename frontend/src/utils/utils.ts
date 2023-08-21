import type acts from '../shared/acts.json';

export const sortAct = (sortActs: typeof acts): typeof acts => {
    return sortActs.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
};
