const express = require('express');
require('./config');
const users = require("./model/users");
const products = require("./model/products");
const  cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const Jwt = require('jsonwebtoken');
const {JwtKey} = require('./config/keys')
const YAML = require("yamljs");
const swaggerJSDocs = YAML.load("./api.yaml");
const swaggerUI = require("swagger-ui-express");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));
const PORT = 8080;


app.post('/register', async(req,resp)=>{

    try {
        let user = new users(req.body);
        let data = await user.save();
        data = data.toObject();
        delete data.password;
        Jwt.sign({data},JwtKey,{expiresIn:'6h'},(err,token)=>{
            if(err){
                resp.send({result : "Something Wrong Please Try Again In 1 hour"})
            }else{
                resp.send({data , auth : token});
            }
        })
        // resp.status(200).send(data);
    } catch (error) {
        resp.status(404).json({message : error.message});
    }
});



app.post('/login', async (req,resp)=>{
    // console.log(req.body);
    if (req.body.email && req.body.password){
    const userResult = await users.findOne(req.body).select("-password");    
    if(userResult){
        Jwt.sign({userResult},JwtKey,{expiresIn : "6h"},(err,token)=>{
            if(err){
                resp.send({result: "try again"});
            }else{
                resp.send({userResult, auth:token});
            }
        });
        // resp.send(userResult)
    }else{
        resp.send("Result Not Match")
    }
}
    else{
        resp.send("Result Not Match")
    }
    
});



app.post('/addProduct', async(req,resp)=>{
    
    let product = new products(req.body);
    let result = await product.save();
    resp.send(result);

});

app.get('/products', async(req,resp)=>{
    let product =  await products.find();
    if(product.length>0){
        resp.send(product);
    }else{
        resp.send({result: "No Product Found"});
    }
    
});


app.delete('/delete/:id' , async(req,resp)=>{
    const result = await products.deleteOne({_id:req.params.id})
    resp.send(result); 
});


app.get('/update/:id', async(req,resp)=>{
    const result = await products.findOne({_id:req.params.id})
        result ? resp.send(result) : resp.send({Result : "No Result Found"})
});


app.put('/updateProduct/:id', async (req,resp)=>{
    const result = await products.updateOne(
        {_id : req.params.id},
        {
            $set : req.body
        }
    );
        resp.send(result);
});


app.get('/search/:key', async(req,resp)=>{
  const result = await products.find(
        {
            "$or" : [
                {productName : {$regex : req.params.key}},
                {productCategory : {$regex : req.params.key}},
                {company : {$regex : req.params.key}}
            ]
        }
    );
    resp.send(result);
});

// function verifytoken(req,resp,next){
//     const token = req.headers['Authorization'];
//     console.log("middleware called"+token);
//     next();
// }

if(process.env.NODE_ENV=='production'){
    const path = require('path')

    app.get('/',(req,res)=>{
        app.use(express.static(path.resolve(__dirname,'front-end','build')))
        res.sendFile(path.resolve(__dirname,'front-end','build','index.html'))
    })
}


app.listen(8080);
