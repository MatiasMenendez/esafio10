const express = require('express');
const productManager = require('../container/ProductManager');
const router = express.Router();
const pm = new productManager('../files/Product.JSON');

//Bien
router.get('/products', async (req,res) =>{
    const newProduct = pm;
    if(!req.query.limit){
        res.json( await newProduct.getAll())
    }else{
        res.json(await newProduct.getFiltered(req.query.limit))
    }
}
)
//Bien
router.get('/product/:pid', async (req,res) =>{
    const newProduct = pm;
    let Product = await newProduct.getProductById(req.params.pid)
    res.json(Product)
}
)
//testear (ver campos obligatorios)
router.post('/products', async (req,res)=>{
    const newProduct = pm;
    let productAdded = await newProduct.addProduct(req.body)
    res.send(productAdded)
}
)

//incompleto
router.put('/:pid', async (req,res) => {
    const newProduct = pm;
    const productChanged = await newProduct.putProduct(req.params.pid, req.body)
    res.send(productChanged) 
})

//Bien
router.delete('/product/:pid', async (req,res) => {
    const newProduct = pm;
    const productDeleted = await newProduct.deleteProduct(req.params.pid)
    res.send(productDeleted) 
})

module.exports = router;