const express = require('express');
const router = express.Router();
const cors = require('cors');
var Container = require('typedi').Container;
const productClass = require('../services/productClass');
router.use(cors());

router.post('/addNewProduct', async (req, res) => {
    const { newProduct } = req.body;
    if (!newProduct)
        res.status(404).send("needProduct");
    const addNewProduct = Container.get(productClass);
    await addNewProduct.sendProduct(newProduct)
        .then(result => {
            res.status(200).send();
        })
        .catch(err => res.status(500).send())
})

router.get('/getAllProduct', async (req, res) => {
    const getNewProduct = Container.get(productClass);
    await getNewProduct.getProduct()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => res.status(500).send());
})
module.exports = router;
