const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const request = require('request');
const cheerio = require('cheerio');

var db;
var offers = {
    titles: [],
    addresses: [],
    prices: []
}

MongoClient.connect('mongodb://ETL:admin123@ds151012.mlab.com:51012/etl', (err, client) => {
    if (err) return console.log(err);
    db = client.db('etl');
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    db.collection('offers').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.render('index.ejs', {offers: result})
    })
})

app.post('/offers', (req, res) => {
    scrape(res);
})

app.delete('/offers', (req, res) => {
    db.collection('offers').drop((err, delOK) => {
        if(err) return res.send(500, err);
        if(delOK) console.log('Collection deleted');
        res.redirect('/');
    })
})

function scrape(res) {
    request('https://rynekpierwotny.pl/oferty/?region=11158&distance=0&type=1&rooms_0=3&rooms_1=3&price_0=400000&price_1=550000&area_0=30&area_1=70&construction_end_date=24&floor_0=5', (error, response, html) => {
        if(!error && response.statusCode == 200){
            const $ = cheerio.load(html);
            console.log('Scraping...');
            $('.offer-item-name').each((i, el) => {
                const title = $(el).text();
                offers.titles.push(title);
            });
            $('.offer-item-address').each((i, el) => {
                const address = $(el).text().replace(/\s\s+/g, '');
                offers.addresses.push(address);
            });
            $('.media-right strong').each((i, el) => {
                const price = $(el).text().replace(/\s\s+/g, '');
                offers.prices.push(price);
            });

            db.collection('offers').save(offers, (err, result) => {
                if (err) return console.log(err)
                console.log('saved to database')
                res.redirect('/')
            })
        } else {
            console.log(error);
        }
    });
}