const handleSignin=(req,res,db,bcrypt)=>{
    // Load hash from your password DB.
// bcrypt.compare("newbie2",'$2a$10$j4.COHl2jrJpyq.nSjhJ1u/s0YQ8H7fcVvfK6IppfE4bnq4kjU5Ra' , function(err, res) {
//     console.log("first guess",res);
// });
// bcrypt.compare("veggies", '$2a$10$j4.COHl2jrJpyq.nSjhJ1u/s0YQ8H7fcVvfK6IppfE4bnq4kjU5Ra', function(err, res) {
//     console.log('second guess',res);
// });
const {email,password}=req.body;
if(!email || !password){
    return res.status(400).json('incorrect form submission');
}
db.select('email','hash').from('login')
.where('email','=',email)
.then(data=>{
    const isValid=bcrypt.compareSync(password,data[0].hash);
    if(isValid){
        db.select('*').from('users')
        .where('email','=',email)
        .then(user=>{
            res.json(user[0]);
        })
        .catch(err=>{
            res.status(400).json('Unable to get user');
        })
    }
    else{
        res.status(400).json('Wrong credentials');
    }
})
.catch(err=>res.status(400).json('Wrong credentials'))
}

module.exports={
    handleSignin:handleSignin
}