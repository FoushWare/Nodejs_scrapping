const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const WriteStream = fs.createWriteStream('servies.csv');



// 00- Scrapping My website  [Services and skills for each service]

// Write Headers 
// WriteStream.Write(`serviceName,Skill`);
WriteStream.write(`serviceName, skills\n`);


request('https://foushware.netlify.app', (error, response, html) => {
    if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);

        $('.service').each((i, el) => {
            const serviceName = $(el).find('h4').text();
            console.log(`${serviceName}`);
            const skill = $(el).find('ul li').text();
            console.log(skill);
            WriteStream.write(`${serviceName}, ${skill} \n`);
        });
        console.log('Scraping Done...');
    }
});
