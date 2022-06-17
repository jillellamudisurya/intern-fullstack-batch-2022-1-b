var express=require('express');
var router=express.Router();
var jwtUser=require('../jwt/user_jwt')
router.get('/',jwtUser,(req,res)=>{
    res.send('driver');
});
module.exports=router