import express, { json, Request, Response } from 'express';
import cors from 'cors';
import { JsonDB, Config } from 'node-json-db';
import { acts } from './utils';

const maxRoomNum = 999999;

const db = new JsonDB(new Config('db', true, false, '/'));

const app = express();
const port = process.env.API_PORT || 3001;

app.use(json());
app.options('*', cors<Request>());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    return next();
});

app.post('/create-room', async (req: Request, res: Response) => {
    const { selectedActs, name } = req.body;

    let continueRoom = true;
    let roomNumber;
    while (continueRoom) {
        const genRoomNumber = String(Math.floor(Math.random() * (maxRoomNum - 0 + 1)) + 0).padStart(6, '0');
        try {
            await db.getData(`/${genRoomNumber}`);
        } catch (err) {
            continueRoom = false;
            roomNumber = genRoomNumber;
        }
    }

    console.log('create-room', { name, roomNumber, selectedActs });

    db.push(`/${roomNumber}`, {
        [name]: selectedActs,
    });

    return res.status(201).json({ roomNumber });
});

app.post('/add-to-room', async (req: Request, res: Response) => {
    const { selectedActs, name, roomNumber } = req.body;

    try {
        const room = await db.getData(`/${roomNumber}`);

        console.log('add-to-room', { name, roomNumber, selectedActs });

        db.push(`/${roomNumber}`, {
            ...room,
            [name]: selectedActs,
        });
    } catch (err) {
        return res.sendStatus(404);
    }

    return res.status(200).json({ roomNumber });
});

app.get('/results/:roomId', async (req: Request, res: Response) => {
    const { roomId } = req.params;

    try {
        const room = (await db.getData(`/${roomId}`)) as Record<string, string[]>;

        const matchingActs: string[] = [];
        const clashingActs: Record<string, string[]> = {};

        let selectedActs: string[] = [];
        const actTimesSelected: Record<string, number> = {};
        for (const theseActs of Object.values(room)) {
            for (const thisAct of theseActs as string[]) {
                if (!selectedActs.includes(thisAct)) selectedActs.push(thisAct);
                actTimesSelected[thisAct] = (actTimesSelected[thisAct] || 0) + 1;
            }
        }
        const filteredActs = acts.filter((act: any) => selectedActs.includes(act.name));

        for (const [thisAct, timesSelected] of Object.entries(actTimesSelected)) {
            if (timesSelected > 1) {
                matchingActs.push(thisAct);
            }
        }

        for (const act of filteredActs) {
            for (const secondAct of filteredActs) {
                if (act.name === secondAct.name) continue;

                if (act.startTime < secondAct.endTime && act.endTime > secondAct.startTime) {
                    clashingActs[act.name] = [...(clashingActs[act.name] || []), secondAct.name];
                }
            }
        }

        console.log('results/:roomId', { room, matchingActs, clashingActs });

        return res.json({ filteredActs, room, matchingActs, clashingActs });
    } catch (err) {
        console.error(err);
        return res.sendStatus(404);
    }

    return res.sendStatus(400);
});

app.use((req, res) => {
    return res.status(404).json({
        error: 'Path not found',
    });
});

app.listen(port, async () => {
    console.log(`Leeds Fest Pather server listening on port ${port}`);
});

export default app;
