var express=require('express');
var router=express.Router();
var jwtDriver=require('../jwt/driver_jwt')
router.get('/',jwtDriver,(req,res)=>{
    res.send('driver');
});
module.exports=router