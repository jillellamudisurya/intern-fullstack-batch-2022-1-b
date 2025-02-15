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
// var adminRoutes = require('./routes/amdin_routes')
// var userRoutes = require('./routes/user_routes')
// var driverRoutes = require('./routes/driver_routes')

//jwt
var jwt = require('jsonwebtoken');
// var jwtAdmin = require('./jwt/admin_jwt')
// var jwtUser = require('./jwt/user_jwt')
// var jwtDriver = require('./jwt/driver_jwt')

const getDistancesFromOrigin = require('./routes/distancematrix.js');

var port = process.env.PORT || 3700

app.get('/',async(req,res)=>{
    res.send("Hello World")
})

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
    const {name,phonenumber,password,role_id,email} = req.body;

    var newUser = {name,email,phonenumber,password,role_id}
    console.log("New User:::",newUser)


    try{
        let userExist = await models.users.findOne({where:{email:email}})

        // console.log("Hey I am executing")

        if(!userExist){
            // console.log("Hey I am also Executing")
            let createNewUser = await models.users.create(newUser);
            // console.log("I am new User::",createNewUser)
            // console.log("New User ID:: ",createNewUser.id)
            await models.allcarts.create({user_id:parseInt(createNewUser.id)})
            // console.log("Dandalu Dhora")
            res.status(200).json({message:'User Created'});
        }
        else{
            res.status(400).json({message:'User Already Exist'})
        }
    }
    catch(err){
        // console.log("NO one executing")
        res.status(500).send(err);
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

    console.log("Product Body::",req.body)

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

app.post('/addaddress',async(req,res)=>{
    var localUser = JSON.parse(req.headers.user)
    const{address,lanlat}=req.body;

    const newAddress = {
        user_id:localUser.id,
        address:address,
        lanlat:lanlat
    }

    try{
        const data = await models.addresses.create(newAddress);
        res.send(data)
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.delete('/removeaddress/:id',async(req,res)=>{
    try{
        const data = await models.addresses.destroy({where:{id:parseInt(req.params.id)}})
        res.send(data)
    }
    catch(err){
        res.status(500).send(err)
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


app.get('/allcartitems',async(req,res)=>{
    try{
        var localUser = JSON.parse(req.headers.user)
        const allcartsref = await models.allcarts.findOne({where:{user_id:localUser.id}})
        console.log("allcartsref",allcartsref)
        console.log("mannnn;;;",typeof(allcartsref.id))
        const cart_products = await models.usercarts.findAll({where:{cart_id:allcartsref.id}})
        console.log("cart_products",cart_products)
        const allproducts = await models.products.findAll()
        const cartprod = []
        cart_products.map((ecp)=>{
            allproducts.map((ap)=>{
                if(ecp.product_id==ap.id){
                    cartprod.push({id:ecp.id,product:ap,quantity:ecp.quantity,cart_id:ecp.cart_id})
                }
            })
        })
        res.send(cartprod)
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.get('/addtocart/:id',async(req,res)=>{
    console.log("Params::",req.params);
    var localUser = JSON.parse(req.headers.user)
    // console.log("Local User",localUser)
    // console.log(typeof(localUser.id))
    // console.log("userid",parseInt(req.headers.user.id))
    try{
        const productsref = await models.products.findOne({where:{id:parseInt(req.params.id)}})        
        const allcartsref = await models.allcarts.findOne({where:{user_id:localUser.id}})
        console.log(typeof(allcartsref.id))
        console.log("allcartsrefid",parseInt(allcartsref.id))
        console.log("productrefid",productsref.id)
        console.log(typeof(productsref.id))
        const usercartsref = await models.usercarts.findOne({where:{cart_id:parseInt(allcartsref.id),product_id:parseInt(productsref.id)}})
        console.log("Usercartsref",usercartsref)
        if(usercartsref){
            usercartsref.quantity+=1;
            usercartsref.save(),
            res.send(usercartsref);
        }
        else{
            await models.usercarts.create({cart_id:parseInt(allcartsref.id),product_id:parseInt(productsref.id),quantity:1})
            res.send(usercartsref)
        }
    }
    catch(err){
        res.status(500).send(err)
    }
})

//Decrease and Increase Qunatity in Cart
app.get('/decquantity/:id',async(req,res)=>{
    try{
        const check = await models.usercarts.findOne({where:{id:parseInt(req.params.id)}})
        if(check.quantity === 0||check.quantity<=0){
            check.quantity = 1
            check.save()
            res.send(check)
        }
        else{
            check.quantity -= 1
            check.save()
            res.send(check)
        }
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.get('/incquantity/:id',async(req,res)=>{
    try{
        const check = await models.usercarts.findOne({where:{id:parseInt(req.params.id)}})
        check.quantity+=1
        check.save()
        res.send(check)
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.get('/alladdresses',async(req,res)=>{
    var localUser = JSON.parse(req.headers.user);
    try{
        const data = await models.addresses.findAll({where:{user_id:localUser.id}})
        res.send(data)
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.post('/placeallorders',async(req,res)=>{
    var localUser = JSON.parse(req.headers.user)
    var ta = 0
    var ci = null
    // console.log("I am produts in placeorders",req.body.products)
    req.body.products.map((pro)=>{
        console.log("Product price is::",pro.product.price)
        console.log("Product Qunatity is:",pro.quantity)
        ta = ta+((pro.product.price)*(pro.quantity))
        console.log("Total amount inside::",ta)
        ci = pro.cart_id;
    })
    console.log("Total amount::",ta)

    const no={
        user_id:localUser.id,
        address_id:parseInt(req.body.address.id),
        delivered_status:false,
        order_status:1,
        order_amount:ta,
        ordered_at:new Date(),
    }

    try{
        const data = await models.allorders.create(no);
        const bo = [];
        req.body.products.map((pro)=>{
            const ap={
                order_id:data.id,
                product_id:pro.product.id,
                price:pro.product.price,
                quantity:pro.quantity
            }
            bo.push(ap)
        })
        const fr = await models.orderedproducts.bulkCreate(bo);
        const de = await models.usercarts.destroy({where:{cart_id:ci}})
        res.send(data)
        
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.get('/allorders',async(req,res)=>{
    var localUser = JSON.parse(req.headers.user);
    // console.log("I am local user allorders::",localUser)==accepted
    try{
        const orderArray = await models.allorders.findAll({where:{user_id:parseInt(localUser.id)}})
        // console.log("Order Array::",orderArray)==accepted
        const userRef = await models.users.findOne({where:{id:localUser.id}})
        // console.log("I am userRef::",userRef)==accepted
        const drivers = await models.users.findAll({where:{role_id:2}})
        // console.log("drivers::",drivers)==accepted
        const productsRef = await models.products.findAll()
        // console.log("ProductsRef::",productsRef)==accepted
        const addressRef = await models.addresses.findAll({where:{user_id:localUser.id}})
        // console.log("AddressRef::",addressRef)==accepted
        const statusRef = await models.orderstatuses.findAll()
        // console.log("StatusRef::",statusRef)
        const orderedProductsArray = await models.orderedproducts.findAll();
        // console.log("OrderedProductsArray::",orderedProductsArray)

        const allOrders = []
        orderArray.map((eachOrder,i)=>{
            const order = {}
            order.id = eachOrder.id,
            order.user_id = eachOrder.user_id,
            order.phonenumber = userRef.phonenumber,
            order.amount = eachOrder.order_amount,

            drivers.map((driver,i)=>{
                if(eachOrder.driver_id===driver.id){
                    order.driver_id = driver.id,
                    order.driver_name = driver.name
                }
            })

            order.delivered_status = eachOrder.delivered_status,
            statusRef.map((eachStatus,i)=>{
                if(eachStatus.id===eachOrder.order_status){
                    order.order_status = eachStatus.status
                }
            })
            addressRef.map((eachAddress,i)=>{
                if(eachAddress.id===eachOrder.address_id){
                    order.address = eachAddress
                }
            })

            let date = new Date(eachOrder.ordered_at)
            date.setDate(date.getDate()+7)
            order.ordered_at = eachOrder.ordered_at.getDate()+"/"+eachOrder.ordered_at.getMonth()+'/'+eachOrder.ordered_at.getFullYear(),
            order.delivery_date =date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
            const allProducts = []
            
            orderedProductsArray.map((productsArray)=>{
                if(eachOrder.id===productsArray.order_id){
                    productsRef.map((eachProduct)=>{
                        if(productsArray.product_id===eachProduct.id){
                            const prod = {
                                product_id:productsArray.product_id,
                                name:eachProduct.product_name,
                                price:productsArray.price,
                                quantity:productsArray.quantity
                            }
                            allProducts.push(prod)
                        }
                    })
                }
            })
            order.products = allProducts
            allOrders.push(order)
        })
        res.send(allOrders)
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.put('/enableproduct/:id',async(req,res)=>{
    console.log("avail::",req.params)
    try{
        const data = await models.products.update({available_status:true},{where:{id:req.params.id}})
        res.send(data)
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.put('/disableproduct/:id',async(req,res)=>{
    console.log("dis::",req.params)
    try{
        const data = await models.products.update({available_status:false},{where:{id:req.params.id}})
        res.send(data)
    }
    catch(err){
        res.status(500).send(err)
    }
})

// Driver Routes

app.get('/alldriverorders',async(req,res)=>{
    try{
        const orderArray = await models.allorders.findAll({where:{order_status:2}})
        // console.log("OrdersArray::",orderArray)
        const userRef = await models.users.findAll()
        // console.log("UserRef::",userRef)
        const productsRef = await models.products.findAll()
        // console.log("ProductsRef",productsRef)
        const addressesRef = await models.addresses.findAll()
        const statusRef = await models.orderstatuses.findAll()
        const orderedProductsArray = await models.orderedproducts.findAll();

        const allOrders = []
        orderArray.map((oa)=>{
            const order = {}
            order.id = oa.id,
            userRef.map((user)=>{
                if(oa.user_id===user.id){
                    order.user_id=user.id;
                    order.customer=user.name;
                    order.phonenumber = user.phonenumber
                }
            })
            order.amount = oa.order_amount,
            order.driver_id = oa.driver_id,
            order.delivered_status=oa.delivered_status,

            statusRef.map((eachStatus)=>{
                if(eachStatus.id===oa.order_status){
                    order.order_status=eachStatus.status
                }
            })
            addressesRef.map((eachAddress)=>{
                if(eachAddress.id===oa.address_id){
                    order.address = eachAddress
                }
            })
            let date = new Date(oa.ordered_at)
            date.setDate(date.getDate()+7)
            order.ordered_at=oa.ordered_at.getDate()+"/"+oa.ordered_at.getMonth()+"/"+oa.ordered_at.getFullYear(),
            order.delivery_date=date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();

            const allProducts = []
            orderedProductsArray.map((productsarray)=>{
                if(oa.id===productsarray.order_id){
                    productsRef.map((eachProduct)=>{
                        if(productsarray.product_id==eachProduct.id){
                            const pro = {
                                product_id:productsarray.product_id,
                                name:eachProduct.product_name,
                                price:productsarray.price,
                                quantity:productsarray.quantity
                            }
                            allProducts.push(pro)
                        }
                    })
                }
            })
            order.products = allProducts

            allOrders.push(order)
            console.log("order::::",order)
        })

        res.send(allOrders)
        console.log("all Orders::",allOrders)
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.put('/selectedorder/:id',async(req,res)=>{
    localUser = JSON.parse(req.headers.user)
    try{
     console.log("Local User Driver:::",localUser)
     const data = await models.allorders.update({driver_id:localUser.id,order_status:3},{where:{id:req.params.id}})
     const newSelection = {
       driver_id:localUser.id,
       order_id:req.params.id,
       delivered_status:false
     }
  
     const driverOrdersRef = await models.driverorders.create(newSelection);
     console.log("Driver Orders Reference",driverOrdersRef)
     res.send(driverOrdersRef)
  
    }
    catch(err){
      console.log(err)
    }
  })

  app.post('/deliveredorder',async(req,res)=>{
    console.log("DeliveredBody::",req.body)
    const{currentAddress,NextAddress,index,length}=req.body;
    localUser = JSON.parse(req.headers.user)
    try{  
        console.log(index);
        console.log(length)
        if(index===length){
            console.log("I am condition performing")
            const order=await models.allorders.findOne({where:{id:currentAddress.id}})
            const drord=await models.driverorders.findOne({where:{order_id:currentAddress.id}})
            const pr=await models.routes.findOne({where:{order_id:currentAddress.id}})
            const ar=await models.allroutes.findOne({where:{id:pr.route_id}})
            
            order.delivered_status=true
            order.order_status=4
            drord.delivered_status=true
            ar.visited_status=true
            pr.flag=false

            drord.save()
            order.save()
            pr.save()
            ar.save()
        }
        else{
            console.log("I am Performing HEre I am else")
            const order=await models.allorders.findOne({where:{id:currentAddress.id}})
            console.log("OrderrraUnga::",order)
            const drord=await models.driverorders.findOne({where:{order_id:currentAddress.id}})
            const pr=await models.routes.findOne({where:{order_id:currentAddress.id}})
            const nr=await models.routes.findOne({where:{order_id:NextAddress.id}})
            const ar=await models.allroutes.findOne({where:{id:pr.route_id}})

            order.delivered_status=true
            order.order_status=4
            drord.delivered_status=true
            nr.flag=true
            pr.flag=false

            drord.save()
            order.save() 
            nr.save()
            pr.save()

        }
        res.send("success")
    }
    catch(err){
        res.status(500).send(err)
    }
  })

  app.get('/selectedorders',async(req,res)=>{
      var localUser = JSON.parse(req.headers.user)
    try{
        const orderArray = await models.allorders.findAll({where:{driver_id:localUser.id,delivered_status:false}})
        // console.log("OrdersArray::",orderArray)
        const userRef = await models.users.findAll()
        // console.log("UserRef::",userRef)
        const productsRef = await models.products.findAll()
        // console.log("ProductsRef",productsRef)
        const addressesRef = await models.addresses.findAll()
        const statusRef = await models.orderstatuses.findAll()
        const orderedProductsArray = await models.orderedproducts.findAll();

        const allOrders = []
        orderArray.map((oa)=>{
            const order = {}
            order.id = oa.id,
            userRef.map((user)=>{
                if(oa.user_id===user.id){
                    order.user_id=user.id;
                    order.customer=user.name;
                    order.phonenumber = user.phonenumber
                }
            })
            order.amount = oa.order_amount,
            order.driver_id = oa.driver_id,
            order.delivered_status=oa.delivered_status,

            statusRef.map((eachStatus)=>{
                if(eachStatus.id===oa.order_status){
                    order.order_status=eachStatus.status
                }
            })
            addressesRef.map((eachAddress)=>{
                if(eachAddress.id===oa.address_id){
                    order.address = eachAddress
                }
            })
            let date = new Date(oa.ordered_at)
            date.setDate(date.getDate()+7)
            order.ordered_at=oa.ordered_at.getDate()+"/"+oa.ordered_at.getMonth()+"/"+oa.ordered_at.getFullYear(),
            order.delivery_date=date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();

            const allProducts = []
            orderedProductsArray.map((productsarray)=>{
                if(oa.id===productsarray.order_id){
                    productsRef.map((eachProduct)=>{
                        if(productsarray.product_id==eachProduct.id){
                            const pro = {
                                product_id:productsarray.product_id,
                                name:eachProduct.product_name,
                                price:productsarray.price,
                                quantity:productsarray.quantity
                            }
                            allProducts.push(pro)
                        }
                    })
                }
            })
            order.products = allProducts

            allOrders.push(order)
            console.log("order::::",order)
        })

        res.send(allOrders)
        console.log("all Orders::",allOrders)
    }
    catch(err){
        res.status(500).send(err)
    }
})

  app.get('/alladminorders',async(req,res)=>{
    try{
        const orderArray = await models.allorders.findAll()
        // console.log("OrdersArray::",orderArray)
        const userRef = await models.users.findAll()
        // console.log("UserRef::",userRef)
        const productsRef = await models.products.findAll()
        console.log("ProductsRef",productsRef)
        const addressesRef = await models.addresses.findAll()
        const statusRef = await models.orderstatuses.findAll()
        const orderedProductsArray = await models.orderedproducts.findAll();

        const allOrders = []
        orderArray.map((oa)=>{
            const order = {}
            order.id = oa.id,
            userRef.map((user)=>{
                if(oa.user_id===user.id){
                    order.user_id=user.id;
                    order.customer=user.name;
                    order.phonenumber = user.phonenumber
                }
            })
            order.amount = oa.order_amount,
            order.driver_id = oa.driver_id,
            order.delivered_status=oa.delivered_status,

            statusRef.map((eachStatus)=>{
                if(eachStatus.id===oa.order_status){
                    order.order_status=eachStatus.status
                }
            })
            addressesRef.map((eachAddress)=>{
                if(eachAddress.id===oa.address_id){
                    order.address = eachAddress
                }
            })
            let date = new Date(oa.ordered_at)
            date.setDate(date.getDate()+7)
            order.ordered_at=oa.ordered_at.getDate()+"/"+oa.ordered_at.getMonth()+"/"+oa.ordered_at.getFullYear(),
            order.delivery_date=date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();

            const allProducts = []
            orderedProductsArray.map((productsarray)=>{
                if(oa.id===productsarray.order_id){
                    productsRef.map((eachProduct)=>{
                        if(productsarray.product_id==eachProduct.id){
                            const pro = {
                                product_id:productsarray.product_id,
                                name:eachProduct.product_name,
                                price:productsarray.price,
                                quantity:productsarray.quantity
                            }
                            allProducts.push(pro)
                        }
                    })
                }
            })
            order.products = allProducts

            allOrders.push(order)
            console.log("order::::",order)
        })

        res.send(allOrders)
        console.log("all Orders::",allOrders)
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.put('/orderaccept/:id',async(req,res)=>{
    try{
        const data = await models.allorders.update({order_status:2},{where:{id:req.params.id}})
        res.send(data)
    }
    catch(err){
        res.status(500).send(err)
    }
})
app.put('/orderreject/:id',async(req,res)=>{
    try{
        const data = await models.allorders.update({order_status:5},{where:{id:req.params.id}})
        res.send(data)
    }
    catch(err){
        res.status(500).send(err)
    }
})

//Routes
app.get('/setroute',async(req,res)=>{
    var localUser = JSON.parse(req.headers.user);
    const id = localUser.id
    const ar = await models.allroutes.create({driver_id:parseInt(localUser.id),visited_status:false})
    await models.sequelize.query(`SELECT *  from allorders,driverorders,addresses where driverorders.order_id=allorders.id AND driverorders.driver_id=${id} AND driverorders.delivered_status=false AND allorders.address_id=addresses.id`)
    .then((data)=>{
        console.log("Data",data)
        console.log("I am Here in SetRoute")
        if(data[0].length>0){
            const routes = [];
            const latLangs = data[0].map((item) => item.lanlat);
            console.log("latLangs",latLangs)
            const addresses = data[0].map((item) => item.address);
            const origins=['Ullagallu, Andhra Pradesh, India']

            var destinations = latLangs.map(
                (item)=>
                    JSON.parse(item).lat+
                    ','+
                    JSON.parse(item).lng
            );
            console.log("Destinations",destinations)
            getDistancesFromOrigin(origins, destinations)
                .then((distances) => {
                    console.log("I am inside destinations")
                    for (let i = 0; i < data[0].length; i++) {
                        if (i === 0) {
                            routes.push({
                                route_id:ar.id,
                                order_id: data[0][i].order_id,
                                address: data[0][i].address,
                                distance: distances[i].distance,
                                flag: false,
                            });
                        } else {
                            routes.push({
                                route_id:ar.id,
                                order_id: data[0][i].order_id,
                                address: data[0][i].address,
                                distance: distances[i].distance,
                                flag: true,
                            });
                        }
                    }
                    console.log("Hey Routes",routes)
                    routes.sort((a,b)=>{
                        return parseInt(a.distance)-parseInt(b.distance)
                      }
                    )
                    
                    const ir=models.routes.bulkCreate(routes)
                    console.log("ir",ir)
                    res.status(200).send("Created")
                })
                .catch((err) => {
                    console.log(err);
                });

        }
        else{
            console.log("No Data");
            res.status(200).json({
                success:false,
                message:'No Orders Found'
            });
        }
    })
})

app.get('/getroutes',async(req,res)=>{
    var localUser = JSON.parse(req.headers.user);

    // console.log("Local User in GetRoute",localUser)
    // console.log(typeof(localUser.id))

    try{
        // console.log("I am inside try")
        const orderarray=await models.allorders.findAll({where:{driver_id:localUser.id,delivered_status:false}})
        // console.log(orderarray)
        const u=await models.users.findAll()
        const productsarray=await models.orderedproducts.findAll();
        const rel=await models.allroutes.findAll({where:{visited_status:false,driver_id:localUser.id}})
        // console.log(rel)
        const rts=await models.routes.findAll({where:{route_id:rel[0].id}})
        console.log("I am rts",rts)
        const p=await models.products.findAll()
        const allorders=[]
        orderarray.map((oa)=>{
            console.log("I am inside orderarray")
            const order={}
            order.id=oa.id,
            u.map((user)=>{
                if(oa.user_id===user.id){
                    order.user_id=user.id;
                    order.customer=user.name
                    order.phonenumber=user.phonenumber
                }
            })
            rts.map((rt,i)=>{
                console.log("I am inside rts")
                if(rt.order_id===oa.id){
                    const root={
                        distance:rt.distance,
                        flag:rt.flag,
                        address:rt.address,
                        route_id:rt.route_id,

                    }
                    order.route=root
                }
            })
            console.log(order.route)
            order.amount=oa.order_amount,
            order.driver_id=oa.driver_id,
            order.delivered_status=oa.delivered_status;
            let date=new Date(oa.ordered_at)
            date.setDate(date.getDate()+7)
            order.ordered_at=oa.ordered_at.getDate()+"/"+parseInt(oa.ordered_at.getMonth()+1)+"/"+oa.ordered_at.getFullYear();
            const allproducts=[]
            productsarray.map((pa)=>{
                if(oa.id===pa.order_id){
                    p.map((ep)=>{
                        if(pa.product_id===ep.id){
                            const pro={
                                product_id:pa.product_id,
                                name:ep.name,
                                price:pa.price,
                                quantity:pa.quantity
                            }
                            allproducts.push(pro)
                        }
                    })
                }

            })
            order.products=allproducts

            allorders.push(order)
           
        })  

            var values=allorders.sort((a,b)=>{
                return parseInt(a.route.distance)-parseInt(b.route.distance)
            })
            console.log("I am Values::",values)
            for(var i=0;i<values.length;i++){
                if(i==0){
                    const r=await models.routes.findOne({where:{order_id:values[i].id}})
                    r.flag=true
                    r.save()
                    values[i].route.flag=true
                }
                else{
                    values[i].route.flag=false
                }
            }
            res.send(values)
            
            
        }
    catch(err){
        
        res.status(500).send(err)

    }
})



app.listen(port,function(req,res){console.log("Port is Running",port)})