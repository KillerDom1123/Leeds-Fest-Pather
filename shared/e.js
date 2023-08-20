var Scraper = require('images-scraper');
const fs = require('fs');

const google = new Scraper({
    puppeteer: {
        headless: true,
    },
});

(async () => {
    const data = JSON.parse(fs.readFileSync('./acts.json').toString());
    const withImg = [];

    for (const e of data) {
        const results = await google.scrape(`${e.name} Spotify Profile Picture`, 1);
        let url = '';
        if (results.length !== 0) {
            url = results[0].url || '';
        }
        console.log(e.name, url);
        withImg.push({ ...e, imageUrl: url });
    }

    fs.writeFileSync('./actsWithImage.json', JSON.stringify(withImg));
})();
