const express = require('express');
const cartManager = require('../container/CartManager');
const router = express.Router();
const cm = new cartManager('../files/Cart.JSON');


//Incompleto
router.get('/cart/:cid', async (req,res) =>{
    const newCart = cm;
    let cart = await newCart.getCartById(req.params.cid)
    res.json(cart)
}
)

router.get('/carts', async (req,res) =>{
    const newCart = cm;
    let carts = await newCart.getCarts()
    res.json(carts)
}
)


//Incompleto
router.post('/:cid/product/:pid', async (req,res)=>{
    const newCart = cm;
    let cartAdded = await newCart.updateCart(req.params.cid, req.params.pid)
    res.send(cartAdded)
})




















//Incompleto
router.post('/cart', async (req,res)=>{
    const newCart = cm;
    let cartAdded = await newCart.createNewCart()
    res.send(cartAdded)
}
)

module.exports = router;