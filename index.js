const axios = require('axios').default;
const fs = require('fs');

const config = {
    baseURL: 'https://services.swpc.noaa.gov',
    responseType: 'stream',
};
const images = require('./data/suvi-primary-195.json');

images.forEach(image => {
    axios.get(image.url, config)
        .then(res => {
            if (res.status !== 200) return;

            res.data.pipe(fs.createWriteStream('data/' + image.url.split('/').pop()));
        })
        .catch(e => console.log(e.response.status, e.response.statusText));
});