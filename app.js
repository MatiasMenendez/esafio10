//import
import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import messagesRouter from './routes/messages.router.js'
import mongoose from 'mongoose'

//express
const app = express()
const PORT = 8080
const dataBase = `ecommerce`
const dbClusterName = `ecommercecluster`

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/messages', messagesRouter)