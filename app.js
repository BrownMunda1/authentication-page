const path=require('path');
const express=require('express');
const mongoose=require('mongoose');
const bodyparser = require('body-parser');

main().catch((err)=>{
    console.log(err);
});
async function main(){
    mongoose.connect('mongodb://localhost/users');
    console.log('Database Connected');
}

const user=require('./schema.js');

const app=express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})

app.get(path.join(__dirname,'register'),(req,res)=>{
    res.sendFile(path.join(__dirname,'register.html'));
});

app.post(path.join(__dirname,'register'),async (req,res)=>{
    try {
        let temp=new user(req.body);
        const password=temp.password;
        const cpassword=temp.confirm_password;
        if(password===cpassword){

            temp.save().then(()=>{
                res.send('<div style="display: flex; justify-content: center; align-items: center; flex-direction: column;"><h2>Successful Registration</h2><br><a href="/login">Login</a></div>');
            }).catch((err)=>{
                res.send("These Details already belong to a user");
            });
        }
        else{
            res.send("Passwords don't match");
        }
    } catch (error) {
        res.send(error);

    }

});

app.get(path.join(__dirname,'login'),(req,res)=>{
    res.sendFile(path.join(__dirname,'login.html'));
});

app.post(path.join(__dirname,'login'), async (req,res)=>{
    try {
        const username=req.body.username;
        const password= req.body.password;

        const userinfo=await user.findOne({username:username});
        if(userinfo.password===password){
            res.status(201).send('<h2 style="text-align: center">Successful Login</h2>');
        }
        else{
            res.send('Incorrect Password');
        }

    } catch (error) {
        res.status(400).send('Check your Username and Password');
    }
});

app.listen(3000,()=>{
    console.log('Server initiated successfully');
})