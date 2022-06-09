var {sequelize,users} = require('./models');
// var bcrypt = require('bcrypt');
sequelize.authenticate();

console.log("database connected");


(async () => {
    // const hashedPassword = bcrypt.hashSync('surya123');

    var newAdmin = {name:"surya",email:"surya@gmail.com",phonenumber:9398612750,password:"surya123",role_id:1}


    try{
        const existAdmin = await users.findOne({where:{email:newAdmin.email}})

        if(existAdmin){
            console.log("Admin exist Already");
        }
        else{
            users.create(newAdmin);
            console.log("Admin Created");
        }
    }
    catch(err){
        console.log("I am Error Coming point")
        console.log("error is",err);
    }

}
)();