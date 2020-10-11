const express = require('express');
const router = express.Router();
const data = require('../database/dataPrototype.json');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

router.get('/price', function (req, res) {
    try {
        let arr = [];
        let dataSample = data.price;
        const lstStock = req.query.listStock || [];
        if(lstStock.length > 0){
            arr = dataSample.filter(item => lstStock.includes(item.stockCode) === true);
        }
        let arrRes = arr.map(item => {
            let lastRandom = getRandomInt(item.last);
            return{
                ...item,
                averagePrice: lastRandom + 10000,
                floorPrice: lastRandom - 7000,
                last: lastRandom
            }
        });

        res.status(200).json({
            status: 200,
            message: 'OK',
            data: arrRes
        });
    } catch (error) {
        res.status(500).json({ error: error});
    }
})

router.put('/price', function (req, res) {
    try {
        const dataRep = req.body;
        const arrData = dataRep.arrData;
        const SMA = dataRep.SMA;
        const time = dataRep.time;
        let dataNew = [];
        let dataSample = data.price;
        if(dataRep.stockCode){
            dataNew = dataSample.map(item =>{
                if(item.stockCode === dataRep.stockCode){
                    return{
                        ...item,
                        arrData: [
                            ...item.arrData,
                            {
                                "averagePrice": 1234,
                                "floorPrice": 124,
                                "last": 6666
                            }
                        ],
                        SMA: [
                            ...item.SMA,
                            {
                                "value_1": 120321232
                            }
                        ],
                        lastUpdate: {
                            time: time,
                            arrData: {
                                "averagePrice": 62700,
                                "floorPrice": 55900,
                                "last": 47500
                            },
                            SMA: {
                                "value_1": 110022
                            }
                        }
                    }
                }else{
                    return{
                        ...item
                    }
                }
            })
        }

        res.status(200).json({
            status: 200,
            message: 'OK',
            data: dataNew
        });
    } catch (error) {
        res.status(500).json({ error: error});
    }
})

module.exports = router;