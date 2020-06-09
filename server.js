const express=require('express');
const bodyParser=require('body-parser')
const bcrypt=require('bcrypt-nodejs')
const cors=require('cors')
const knex=require('knex');

const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const db=knex({
    client: 'mysql',
    connection: {
      host: 'us-cdbr-east-05.cleardb.net',
      user: 'be4b1b1e656b37',
      password:'34ad5860',
      database:'heroku_1a3c60a75c4443d',


      // host : 'cleardb-lively-68863',
      // user : 'root',
      // password : 'kc0405',
      // database : 'smartbrain',
    }
  });

const app=express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{res.send('It is working !!');})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=> {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)});

app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)});

app.listen(process.env.PORT || 3000,()=>{
    console.log(`Running on port ${process.env.PORT}`)
})
