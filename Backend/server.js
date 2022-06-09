var express = require('express');
var app = express();
var bodyparser = require('body-parser');
const { urlencoded } = require('body-parser');

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

var cors = require('cors');
app.use(cors());

//Models
var models=require('./models')

//Routes
var adminRoutes = require('./routes/amdin_routes')
var userRoutes = require('./routes/user_routes')
var driverRoutes = require('./routes/driver_routes')

//jwt
var jwt = require('jsonwebtoken');
var jwtAdmin = require('./jwt/admin_jwt')
var jwtUser = require('./jwt/user_jwt')
var jwtDriver = require('./jwt/driver_jwt')

var port = process.env.PORT || 2424


app.post('/loginauthentication',async(req,res)=>{
    const {email,password} = req.body

    console.log("Body::",req.body);

    try{
        const rel = await models.users.findOne({where:{email:email}})
        console.log("Rel::",rel);
        if(rel){
            // const validPassword = compareSync(password,rel.password)

            if(password===rel.password){
                const payload = {email}

                const token = jwt.sign(payload,'secretkey')
                const result = {token:token,user:rel}
                res.status(200).send(result)
            }

            else{
                res.status(405).send('Password is incorrect')
            }
        }
        else{
            res.status(410).send('User not found')
        }
    }

    catch(err){
        res.send(500).send('internal server error')
    }
})

app.post('/registeruser',async(req,res)=>{
    console.log("********Register Here***********")
    console.log("Body:::::",req.body)
    const {name,email,phonenumber,password,role_id} = req.body;

    var newUser = {name,email,phonenumber,password,role_id}
    console.log("New User:::",newUser)


    try{
        let userExist = await models.users.findOne({where:{email:email}})

        if(!userExist){
            let createNewUser = await models.users.create(newUser);
            res.status(200).json({message:'User Created'});
        }
        else{
            res.status(400).json({message:'User Already Exist'})
        }
    }
    catch(err){
        res.status(500).send("Hi Bro",err);
    }
})

app.post("/addDriver",async(req,res)=>{
    console.log("DriverBody::",req.body);
    const {name,email,phonenumber,password,role_id} = req.body;


    var newDriver = {name,email,phonenumber,password,role_id}

    try{
        let existDriver = await models.users.findOne({where:{email:email}})

        if(!existDriver){
            let createNewDriver = await models.users.create(newDriver)
            res.status(200).json({message:'Driver Created'})
        }
        else{
            res.status(400).json({message:'Driver Already Exist'})
        }
    }
    catch(err){
        res.status(500).send("Driver Err",err)
    }  
})

app.post('/addCategory',async(req,res)=>{
    console.log("cat Body::",req.body);
    const {category} =req.body;

    var newCategory = {category}

    
    try{
        categoryExist = await models.categories.findOne({where:{category:category}})

        if(!categoryExist){
            let createNewCategory = await models.categories.create(newCategory)
            res.status(200).json({message:"Category Created Successfully"})
        }
        else{
            res.status(400).json({message:"Category Already Exist"})
        }
    }

    catch(err){
        res.status(500).send("Internal Server Error",err)
    }
})

app.post('/addProduct',async(req,res)=>{
    console.log("Product BOdy;;",req.body);

    const{product_name,price,image,available_status,category_id}=req.body;

    var newProduct = {product_name,price,image,available_status,category_id};

    try{
        productExist = await models.products.findOne({where:{product_name:product_name}})

        if(!productExist){
            let createNewProduct = await models.products.create(newProduct);
            res.status(200).json({message:'Product Added Successfully'})
        }
        else{
            res.status(400).json({message:'Product Already Exist'})
        }
    }
    catch(err){
        res.status(500).send("Product Error::",err)
    }
})

app.get('/allusers',async(req,res)=>{
    try{
        let data = await models.users.findAll()
        res.send(data)
    }
    catch(err){
        res.status(500).send("Internal Server Error in ServerJS")
    }
})

app.get('/getDrivers',async(req,res)=>{
    try{
        console.log("*********I am at Get Drivers***********")
        let data = await models.users.findAll({where:{role_id:2}})
        res.send(data)
        console.log('Driver Data:: Get:: ',data)
    }
    catch(err){
        res.status(500).send('Drivers ERR::',err)
    }
})

app.get('/getCategories',async(req,res)=>{
    try{
        let data = await models.categories.findAll();
        res.send(data)
    }
    catch(err){
        res.status(500).send("Categories Server Err",err)
    }
})

app.get('/getProducts',async(req,res)=>{
    try{
        let data = await models.products.findAll();
        res.send(data)
    }
    catch(err){
        res.status(500).send("Products Server Err",err)
    }
})



app.listen(port,function(req,res){console.log("Port is Running")})