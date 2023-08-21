var Scraper = require('images-scraper');
const fs = require('fs');

const google = new Scraper({
    puppeteer: {
        headless: true,
    },
});

(async () => {
    const data = JSON.parse(fs.readFileSync('./acts.json').toString());
    const alreadyImage = JSON.parse(fs.readFileSync('./actsWithImage.json').toString());
    const withImg = [];

    for (const e of data) {
        const alreadyWithImage = alreadyImage.filter((a) => a.name === e.name);

        let url = '';
        if (alreadyWithImage.length > 0) {
            url = alreadyWithImage[0].imageUrl;
        } else {
            const results = await google.scrape(`${e.name} Spotify Profile Picture`, 1);
            if (results.length !== 0) {
                url = results[0].url || '';
            }
        }
        console.log(e.name, url);
        withImg.push({ name: e.name, stage: e.stage, startTime: e.startTime, endTime: e.endTime, imageUrl: url });
    }

    fs.writeFileSync('./actsWithImage.json', JSON.stringify(withImg));
})();
