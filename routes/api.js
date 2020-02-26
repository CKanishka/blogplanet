const express=require('express');
const router=express.Router();

//Importing the item model
const Item=require('../models/Item');
const User=require('../models/User');
const UserAuth=require('../models/UserAuth');

const genres=['DSA','Tech Talk','Motivation','Interview Experience']
const emails=[]
const genreCount=[]
//'Get' request to show all items
router.get('/',(req,res)=>{
    Item.find()
        .sort({date: -1})
        .then((items)=>res.json(items));  //responding back with the items
});

//"Get" request to get count of all genres
router.get('/genrecount',(req,res)=>{
    Item.aggregate([
    {"$group" : {_id:"$genre", count:{$sum:1}}}])
    .then((items)=>res.json(items))
})

router.get('/articlecount',(req,res)=>{
    Item.aggregate([
    {"$group" : {_id:"$name", count:{$sum:1}}}])
    .then((items)=>res.json(items))
})

router.get('/usercount',(req,res)=>{
    Item.aggregate([
    {"$group" : {_id:{name:"$name",email:"$email"}, count:{$sum:1}}}])
    .then((items)=>res.json(items))
})


//'Post' request to update the list
router.post('/',(req,res)=>{
    const newItem=new Item({
        name:req.body.name,               //extracting name from the body of the request
        email:req.body.email,     
        content:req.body.content,
        title:req.body.title,
        genre:req.body.genre
    });
    newItem.save().then((item)=>res.json(item));
})

//'Put' request to edit a blog

router.put('/:id',(req,res)=>{
    const newItem=new Item({
        name:req.body.name,               //extracting name from the body of the request
        email:req.body.email,     
        content:req.body.content,
        title:req.body.title,
        genre:req.body.genre
    });
    console.log(newItem)
    Item.findById(req.params.id) 
        .then((item)=>item.updateOne({name:req.body.name,email:req.body.email,
            content:req.body.content, title:req.body.title,
            genre:req.body.genre}).then((items)=>res.json(items)))  
})
/****************************USER COLLECTION ********************************/

//adding a new user
router.post('/user',(req,res)=>{
    const newUser = new User({
        name:req.body.name,     //extracting name from the body of the request
        email:req.body.email,
        count:req.body.count
    });
    newUser.save().then((item)=>res.json(item));
})

//getting list of all users
router.get('/user',(req,res)=>{
    User.find()
        .sort({count:-1})
        .then((items)=>res.json(items));  //responding back with the items
    
    // //keep the genreCount array ready
    // genres.forEach(genre => {
    //     Item.countDocuments({genre:genre})
    //     .then((count)=>genreCount.push({"label":genre,"value":count}))
    //     .then(()=>console.log(genreCount))
    //     .catch(()=>res.json({sucess:false}))
    // });

    // //getting the list of all unique emails
    // Item.distinct('email')
    // .then((res)=>console.log(res))
    // .catch(()=>res.json({sucess:false}))
})

//'Put' request to edit a list component
router.put('/user/:id',(req,res)=>{
    const newItem=new User({
        name:req.body.name,     //extracting name from the body of the request
        email:req.body.email,
        count:req.body.count
    });
    User.findById(req.params.id) 
        .then((item)=>item.update({name:req.body.name,email:req.body.email,
            count:req.body.count}).then((items)=>res.json(items)))  
})

//Delete an item
router.delete('/user/:id',(req,res)=>{
    User.findById(req.params.id)    //extracting id from the request url
        .then((item)=>item.remove().then(()=>res.json({success:true}))) 
        .catch(()=>res.status(404).json({sucess:false}));   
})

/********* USER AUTHENTICATION and REGISTRATION *****************/
router.post('/register', function(req, res) {
    const { email, password } = req.body;
    const user = new UserAuth({ email, password });
    user.save(function(err) {
      if (err) {
        res.status(500)
          .send("Error registering new user please try again.");
      } else {
        res.status(200).send("Welcome to Blog Planet!");
      }
    });
  });

router.post('/authenticate', function(req, res) {
const { email, password } = req.body;
UserAuth.findOne({ email }, function(err, user) {
    if (err) {
    console.error(err);
    res.status(500)
        .json({
        error: 'Internal error please try again'
    });
    } else if (!user) {
    res.status(401)
        .json({
        error: 'Incorrect email or password'
        });
    } else {
    user.isCorrectPassword(password, function(err, same) {
        if (err) {
        res.status(500)
            .json({
            error: 'Internal error please try again'
        });
        } else if (!same) {
        res.status(401)
            .json({
            error: 'Incorrect email or password'
        });
        } else {
        res.status(200).send("Welcome to Blog Planet!");
        }
    });
    }
});
});


module.exports=router;