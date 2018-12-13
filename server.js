const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient

var db;

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
    db.collection('offers').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('saved to database')
      res.redirect('/')
    })
})

app.delete('/offers', (req, res) => {
    // db.collection('offers').findOneAndDelete({name: req.body.name},
    // (err, result) => {
    //   if (err) return res.send(500, err)
    //   res.send({message: 'A darth vadar quote got deleted'})
    // })

    // dbo.collection("customers").drop(function(err, delOK) {
    //     if (err) throw err;
    //     if (delOK) console.log("Collection deleted");
    //     db.close();
    //   });

    db.collection('offers').drop((err, delOK) => {
        if(err) return res.send(500, err);
        if(delOK) console.log('Collection deleted');
        res.redirect('/');
    })
  })