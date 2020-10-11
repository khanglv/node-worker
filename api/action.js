const express = require('express');
const router = express.Router();
const dbo = require('../database/connection');
router.get('/:name', function (req, res) {
    let name = req.params.name;
    const db = dbo.getDb();
    res.send(200);
    db.createCollection(name, function(err, res) {
        if (err) throw err;
    });
})

router.post('/', (req, res)=> {
    console.log(req.body);
    res.send(200);
    //db = dbo.getDb();
    // db.createCollection("customers_3", function(err, res) {
    //     if (err) throw err;
    //     console.log("Collection created!");
    // });
})

module.exports = router;