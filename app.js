const express = require('express');
import { engine } from 'express-handlebars';

const routerp = require('./routes/products.routes');
const routerc = require('./routes/cart.routes');
const PORT = 8080

const server = express();

server.use(express.json())
server.use(express.urlencoded({extended:true}))

//server.use('/api', routerp);
//server.use('/api', routerc);

server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', './views');

server.get('/', (req,res) => {
    res.render('index');
})

server.listen(PORT, () =>{
    console.log(`Server listening at port ${PORT}`)
});