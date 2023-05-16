//import
import fs from 'fs'

export default class Cart {
    constructor(path) {
        this.path = path
        this.carts = []
    }

    //Defines id incrementally. If there are any cart it starts in 1. Otherwise increments the last existing id in 1.
    setId() {
        try {
            let id = 1
            if (this.carts.length > 0) {
                id = (Math.max(...this.carts.map(cart => cart.id))) + 1
            }
            return id
        }
        catch (error) {
            console.log(`ERROR: ${error}`)
        }
        
    }

    async getallCarts() {
        try {
            this.carts = await fs.promises.readFile(this.path)
            if (this.carts.length == 0) {
                this.carts = []
            }
            else {
                this.carts = JSON.parse(this.carts)
            }
            return this.carts

        } catch (error) {
            console.log (`ERROR getting all carts. Msg: ${error}`)
            return {error: `Cannot get all carts. Msg: ${error}`}
        }
    }

    //Creates new cart with the proper id and an empty array of products and adds it to cart file
    async createNewCart() {
        try {
            let newCart = {
                id: 0,
                products: []
            }
            this.carts = await this.getallCarts()
            newCart.id = this.setId()
            this.carts.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts))

            return newCart

        } catch (error) {
            console.log (`ERROR creating cart. Msg: ${error}`)
            return {error: `Cannot create cart. Msg: ${error}`}
        } 


    }

    //Gets a cart by a particular id
    async getCartById(id) {
        try{
            this.carts = await this.getallCarts()
            let cartsById = this.carts.filter(item => item.id == id)
            if (cartsById.length) {
                return cartsById[0]
            } else { 
                throw new Error(`ID ${id} not found`)
            }
        }
        catch (error) {
            console.log (`ERROR getting cart with id ${id}. Msg: ${error}`)
            return {error: `Cannot get cart with id ${id}. ${error}`}
            
        }
    }

    //Updates a cart with a specific id and a specific product 
    async updateCart(cartId, productId) {
        try {
            let oldCart = await this.getCartById(cartId)
            oldCart = this.addProductToCart(productId, oldCart)
            let carts = (await this.getallCarts()).filter(item => item.id != cartId)
            carts.push(oldCart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts))

            return oldCart
        }
        catch (error) {
            console.log (`ERROR updating cart ${cartId}. Msg: ${error}`)
        }

    }
   
    //Adds a product into the cart
    addProductToCart(productId, cart) {
        try{
            let item = cart.products.filter(prod => prod.product == productId)
            if (item.length == 0) {
                cart.products.push({product: productId, quantity: 1})
            }
            else {
                cart.products = cart.products.map(key => {if (key.product == productId) {key.quantity += 1} return key})
            }
            
            return cart
            
        }catch (error) {
            console.log (`ERROR adding product ${productId}. Msg: ${error}`)
        }        
    }
}