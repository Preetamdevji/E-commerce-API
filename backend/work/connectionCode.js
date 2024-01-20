    const express = require('express')
    const mongoose = require('mongoose');
    const { MONGOURI } = require('../config/keys');

    const app = express();

    const connetDB = async() =>{
        await mongoose.connect(MONGOURI);
        // const productSchema = new mongoose.Schema({});
        // const productModel = mongoose.model('products', productSchema);
        // const data = await productModel.find();
        // console.log(data);
    };
    
    connetDB();
    
    // app.get('/', (req,resp)=>{
    //     resp.send("App is working Properly:");
    // });

    app.listen(8080);

    console.log("server is working");
    