const fs = require ('fs');

class CartManager {
    constructor() {
        this.carts = [];
        this.path = "./files/Cart.JSON"
    }


setId() {
  try {
      let idCart = 1
      if (this.carts.length > 0) {
          idCart = (Math.max(...this.carts.map(cart => cart.idCart))) + 1
      }
      return idCart
  }
  catch (err) {
      console.log(err)
  }
      
}

async getCarts() {
    try{
        const data = await fs.promises.readFile(this.path, "utf-8")
        const carts = JSON.parse(data);
        return carts;
    } 
    catch(err) {
        console.log(err)
    }
  }




//Bien
async createNewCart() {
    try {
        let newCart = {
            idCart: 0,
            products: []
        }
        this.carts = await this.getCarts()
        newCart.idCart = this.setId()
        this.carts.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
        return newCart

    } catch (err) {
        console.log (err)
    } 


}


//Bien
async getCartById(id) {
  try{
  let carts = await this.getCarts()
  carts = carts.filter(item => item.idCart == id)
  if (carts.length) {
      return carts[0].products
  } else { 
      console.log("product not founded")
  }
}
catch (err) {
  console.log (err)
}}


}



module.exports = CartManager;