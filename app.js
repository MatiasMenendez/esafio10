//import
import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import messagesRouter from './routes/messages.router.js'
import mongoose from 'mongoose'

//express
const app = express()
const PORT = 8080



app.use(express.json());
app.use(express.urlencoded({extended:true}))


try {

    await mongoose.connect('mongodb+srv://userTest:abc@ecommercecluster.x8dnx5s.mongodb.net/?retryWrites=true&w=majority');

    

    app.listen(PORT, () => {

        console.log(`listening at port ${PORT}`);

    });

} catch(err) {

    console.log('No se puede conectar con el servidor de bbdd');

}

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/messages', messagesRouter)