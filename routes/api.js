const express=require('express');
const router=express.Router();

//Importing the item model
const Item=require('../models/Item');
const User=require('../models/User');

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


module.exports=router;