const handleRegister=(req,res,db,bcrypt)=>{
    const {email,name,password}=req.body;
    if(!email || !name || !password){
        return res.status(400).json('incorrect form submission');
    }
    const hash=bcrypt.hashSync(password);
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash);
    // });
    //console.log(hash);
    db.transaction(trx =>{
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .then(inserted =>{
            //console.log(inserted[0]);
            trx('login').where('id','=',inserted[0]).select('email')
            .then(loginEmail=>{
                //console.log(loginEmail[0]);
                return trx('users')
                .insert({
                         email: loginEmail[0].email,
                         name: name,
                         joined: new Date(),
                     })
                .then(insertedTodo => {
                    //console.log(insertedTodo[0]);
                trx('users')
                .where('id','=',insertedTodo[0]).select('*')
                .then(selectedTodo => {
                    //console.log(selectedTodo);
                return res.json(selectedTodo[0])
                })
                }) 
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err =>{
            res.status(400).json("User already exists");
        })
    })
    .catch(err=>{
        res.status(400).json("Unable to register");
    });   
}

module.exports={
    handleRegister: handleRegister
};