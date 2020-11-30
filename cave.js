const express = require('express');
const fs = require('fs');
const https = require('https');
const expressLayouts = require('express-ejs-layouts')
const app = express();
const db = require('./db');
// Static Files
app.use(express.static('public'))
app.use('/images', express.static(__dirname + 'public/images'))

// Set Templating Engine
app.use(expressLayouts);
app.use(express.json({limit: '2MB'}));
app.set('layout', './layouts/page')
app.set('view engine', 'ejs')

// Routes



app.get('', (req, res) => {
    db.readAll("vins",(vins) => {
        db.getNbBottles("vins",(nbVins) => {
            db.readAll("whiskies",(whiskies) => {
                db.getNbBottles("whiskies",(nbWhiskies) => {
                    db.readAll("autres",(autres) => {
                        db.getNbBottles("autres",(nbAutres) => {
                        res.render('index', 
                            { 
                                title: 'Home',
                                vinsNbTypes:vins.length,
                                vinsLength:nbVins,
                                whiskiesNbTypes:whiskies.length,
                                whiskiesLength:nbWhiskies,
                                autresNbTypes:autres.length,
                                autresLength:nbAutres
                            });
                        });
                    });
                });
            });
        });
    });
})

//route vin
app.get('/vin', (req, res) => {
    db.readAll("vins",(vins) => {
        db.getNbBottles("vins",(nbVins) => {
            res.render('bottles', { 
                bottleTitre: 'Mes vins',
                bottleType: 'vin',
                bottleImage:"images/vin.jpg",
                bottles: vins,
                test: nbVins,
                error :""
            });
        });
    });
})

//route whisky
app.get('/whisky', (req, res) => {
    db.readAll("whiskies",(whiskies) => {
        db.getNbBottles("whiskies",(nbWhiskies) => {
            res.render('bottles', {   
                bottleTitre: 'Mes whiskies',
                bottleType: 'whisky',
                bottleImage:"images/whisky.jpg",
                bottles: whiskies,
                test: nbWhiskies,
                error :""
             });
        });
    });
    
})

//route autre
app.get('/autre', (req, res) => {
    db.readAll("autres",(autres) => {
        db.getNbBottles("autres",(nbAutres) => {
            res.render('bottles', { 
                bottleTitre: 'Autres',
                bottleType: 'autre',
                bottleImage:"images/autre.jpg",
                bottles: autres,
                test: nbAutres,
                error :""
            });
        });
    });
})

//route add
app.post('/add',(req, res) => {

    let bottle = (
        {
            "qty": req.body.qty,
            "name": req.body.name,
            "age": req.body.age,
            "alcool": req.body.alcool,
            "photo": req.body.base64image,
            "distillerie": req.body.distillerie,
            "address": req.body.address,
            "message": req.body.message
        });
    db.write(req.body.db,bottle,false,(err) => {
        db.readAll(req.body.db,(bottles) => {
            db.getNbBottles(req.body.db,(nbBottles) => {
                res.send({bottles: bottles, nbBottles: nbBottles, error : err})
            });
        });
    });
})


//route edit
app.post('/edit',(req, res) => {

    let bottle = (
        {
            "qty": req.body.qty,
            "name": req.body.name,
            "age": req.body.age,
            "alcool": req.body.alcool,
            "photo": req.body.base64image,
            "distillerie": req.body.distillerie,
            "address": req.body.address,
            "message": req.body.message
        });
    db.write(req.body.db,bottle,true,(err) => {
        db.readAll(req.body.db,(bottles) => {
            db.getNbBottles(req.body.db,(nbBottles) => {
                res.send({bottles: bottles, nbBottles: nbBottles, error : err})
            });
        });
    });
})

//route add
app.post('/offset',(req, res) => {
    
    let bottle = (
        {
            "qty": req.body.qty,
            "name": req.body.name
        });
    db.addBottleQty(req.body.db,bottle,(err) => {
        db.readAll(req.body.db,(bottles) => {
            db.getNbBottles(req.body.db,(nbBottles) => {
                res.send({bottles: bottles, nbBottles: nbBottles})
            });
        });
    });
})


https.createServer({
        key: fs.readFileSync('./cert/server.key'),
        cert: fs.readFileSync('./cert/server.cert')
    }, app)
    .listen(9090);

