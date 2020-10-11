const express = require('express');
const router = express.Router();
const axios = require('axios');

const TIME_START = new Date().setHours(08,55,0,0)
const TIME_END = new Date().setHours(14,49,0,0)
let count = 0;

// function actionApiTimeout (){
//     setTimeout(()=>{
//         const dataApi = getApiPrice();
//         if(dataApi){

//         }
//         let timeNow = new Date().getTime();
//         if(TIME_START < timeNow && timeNow < TIME_END){
//             actionApiTimeout();
//         }
//     }, 15000);
// }

// function handlePriceHasChange(){
//     setTimeout(()=>{
//         count = count + 1;
//         console.log("aa " + count);
//     }, 2000);
// }

function updateDataLazyLoad (obj){
    //call api update input
}

function handleAllWait (actionSMA, actionOHLC, dataMaster){
    if(dataMaster){
        if(actionSMA){
            const d1 = handleSMAlazyLoad(dataRes);
        }
        if(actionOHLC){
            const d2 = handleOHLClazyLoad(dataRes);
        }
        if(d1 && d2){
            Promise.all([d1, d2]).then(async result => {
                updateDataLazyLoad({actionSMA: result[0], actionOHLC: result[1]});
            })
        }
    }
}

function handleSMAlazyLoad(){
    setTimeout(()=>{
        count = count + 1;
    }, 2000);
}

function handleOHLClazyLoad(){
    setTimeout(()=>{
        count = count + 1;
    }, 2000);
}

async function getApiPrice (lstStock){
    try {
        const result = await axios.get('http://localhost:3000/random/dataSystem/price', {
            params: {
                listStock: lstStock
            }
        })
        return result.data;
    } catch (error) {
        console.log("catch " + error);
    }
}

router.post('/', async function (req, res) {
    try {
        // actionApiTimeout();
        let dataRes = [];
        const data = req.body;
        const listStock = data.listStock || [];
        const actionSMA = data.actionSMA || false;
        const actionOHLC = data.actionOHLC || false;
        const dataTmp = await getApiPrice(listStock);
        if(dataTmp.data.length > 0){
            dataRes = dataTmp.data;
        }
        handleAllWait(actionSMA, actionOHLC, dataRes);
        
        // if(stockCode && Array.isArray(stockCode) === true){

        // }
        res.status(200).json({
            status: 200,
            message: 'OK',
            data: dataRes
        });
    } catch (error) {
        res.status(500).json({ error: error});
    }
})

module.exports = router;