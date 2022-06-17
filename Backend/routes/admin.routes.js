// const { application } = require('express');

// var express = require('express')

// var router = express.Router();
// var models = require('../models')
// var jwtAdmin = require('../jwt/admin_jwt')


// router.post("/addDriver",jwtAdmin, async(req,res)=>{
//     console.log("DriverBody::",req.body);
//     const {name,email,phonenumber,password,role_id} = req.body;


//     var newDriver = {name,email,phonenumber,password,role_id}

//     try{
//         let existDriver = await models.users.findOne({where:{email:email}})

//         if(!existDriver){
//             let createNewDriver = await models.users.create(newDriver)
//             res.status(200).json({message:'Driver Created'})
//         }
//         else{
//             res.status(400).json({message:'Driver Already Exist'})
//         }
//     }
//     catch(err){
//         res.status(500).send("Driver Err",err)
//     }  
// })

// router.post('/addCategory',jwtAdmin, async(req,res)=>{
//     console.log("cat Body::",req.body);
//     const {category} =req.body;

//     var newCategory = {category}

    
//     try{
//         categoryExist = await models.categories.findOne({where:{category:category}})

//         if(!categoryExist){
//             let createNewCategory = await models.categories.create(newCategory)
//             res.status(200).json({message:"Category Created Successfully"})
//         }
//         else{
//             res.status(400).json({message:"Category Already Exist"})
//         }
//     }

//     catch(err){
//         res.status(500).send("Internal Server Error",err)
//     }
// })

// router.post('/addProduct',jwtAdmin,async(req,res)=>{
//     console.log("Product BOdy;;",req.body);

//     const{product_name,price,image,available_status,category_id}=req.body;

//     var newProduct = {product_name,price,image,available_status,category_id};

//     try{
//         productExist = await models.products.findOne({where:{product_name:product_name}})

//         if(!productExist){
//             let createNewProduct = await models.products.create(newProduct);
//             res.status(200).json({message:'Product Added Successfully'})
//         }
//         else{
//             res.status(400).json({message:'Product Already Exist'})
//         }
//     }
//     catch(err){
//         res.status(500).send("Product Error::",err)
//     }
// })

// router.get('/getDrivers',jwtAdmin,async(req,res)=>{
//     try{
//         console.log("*********I am at Get Drivers***********")
//         let data = await models.users.findAll({where:{role_id:2}})
//         res.send(data)
//         console.log('Driver Data:: Get:: ',data)
//     }
//     catch(err){
//         res.status(500).send('Drivers ERR::',err)
//     }
// })

// router.get('/getCategories',jwtAdmin,async(req,res)=>{
//     try{
//         let data = await models.categories.findAll();
//         res.send(data)
//     }
//     catch(err){
//         res.status(500).send("Categories Server Err",err)
//     }
// })

// router.get('/getProducts',jwtAdmin,async(req,res)=>{
//     try{
//         let data = await models.products.findAll();
//         res.send(data)
//     }
//     catch(err){
//         res.status(500).send("Products Server Err",err)
//     }
// })

// module.exports= router

