const express = require('express');
const router = express.Router();
const dbo = require('../database/connection');
const auth = require('../middleware/auth');

router.get('/auth', function (req, res) {
    try {
        const token = auth.create();
        res.status(200).json({
            status: 200,
            message: 'OK',
            token: token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get('/', auth.auth, function (req, res) {
    try {
        const db = dbo.getDb();
        const poster = db.collection('poster');
        poster.find({}).toArray(function (err, data) {
            if (err) throw err;
            res.status(200).json({
                status: 200,
                data: data,
                message: 'OK'
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/', (req, res)=> {
    try {
        const body = req.body;
        let data = {
            nameOfFilm: body.nameOfFilm || '',
            path: body.path || '',
            active: body.active || false
        }
        db = dbo.getDb();
        db.collection("poster").insertOne(data, function(err, res) {
            if (err) throw err;
        });
        res.status(200).json({ message: 'Successful manipulation!!!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;