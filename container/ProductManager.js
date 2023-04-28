
const fs = require ('fs');

class ProductManager {
    constructor() {
        this.products = [];
        this.path = "./files/Products.JSON"
    }

//Bien
setId() {
  try {
      let idProduct = 1
      if (this.products.length > 0) {
          idProduct = (Math.max(...this.products.map(product => product.idProduct))) + 1
      }
      return idProduct
  }
  catch (err) {
      console.log(err)
  }
      
}

//Bien
async getAll(){
  try{
      const data = await fs.promises.readFile(this.path, "utf-8")
      const products = JSON.parse(data);
      return products;
  } 
  catch(err) {
      console.log(err)
  }
}

//bien
async getFiltered(id) {
  try{
    let products = await this.getAll()
    products = products.filter(item => item.idProduct <= id)
    return products
  }
  catch(err){
    console.log(err)
  }
}

//Bien
async getProductById(id) {
  try{
  let products = await this.getAll()
  products = products.filter(item => item.idProduct == id)
  if (products.length) {
      return products[0]
  } else { 
      console.log("product not founded")
  }
}
catch (err) {
  console.log (err)
}}

//bien
async addProduct(newProduct) {
  try{
    this.products = await this.getAll()
    this.validateProperties(newProduct) 
    newProduct.idProduct = this.setId()
    if(newProduct){
    this.products.push(newProduct)
    await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    return console.log('product added')}
    else{
      console.log(newProduct.length)
    }
  }catch(err){
    console.log(err)
  }
}




  //incompleto
  async putProduct(id, newValues) {
    try {
        let oldProduct = (await this.getProductById(id)).value

        Object.keys(newValues).forEach(properties => {
            if (this.validateProperties(properties, oldProduct)) {
                oldProduct[properties] = newValues[properties]
            }
        });
       
        let products = (await this.getAll()).filter(item => item.idProduct != id)
        products.push(oldProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(products))

        return console.log("product updated")
    }
    catch (err) {
      console.log(err)
        }
    }





//Bien
async deleteProduct(id){
  try{
    if(id >= 1){
    let products = (await this.getAll()).filter(item => item.idProduct != id)
    await fs.promises.writeFile(this.path, JSON.stringify(products))
    return console.log("product deleted")}

    else{ console.log("wrong params")
    }}
    catch (err){
      console.log(err)   
}
}

    validateProperties(product) {
      const properties = ['title', 'description', 'price', 'thumbnail', 'code', 'stock', 'category', 'status']

      for (let property in properties) {
          if (!(properties[property] in product)) {
              console.log("missing properties")
          }
      }

      Object.keys(product).forEach(property => {
          if (!(properties.includes(property))) {
            console.log("missing properties")
          }
      });
 
      if (product) {
          return true
      } 
      else {
          console.log("error") 
      }
  }

}

module.exports = ProductManager;