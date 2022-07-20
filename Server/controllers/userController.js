
const asyncHandler = require('express-async-handler')
const generateToken = require('../config/generateToken')
const User = require('../models/user')
// import bcrypt from "bcryptjs";
const bcrypt =require('bcryptjs')
const jwt =require('jsonwebtoken')
// const User=require('')
// const signupUser =asyncHandler(async(req,res) =>{

//     const{name,email,password,image} =req.body

//     if(!name || !email||!password)
//      {
//         res.status(400)
//         throw new Error("Pleasee Enter All fields")
//     }

//     const userexist = await User.findOne({ email})
//     if(userexist){
//         res.status(400);
//         throw new Error("User Already Exists")
//     }

//     const newuser = await User.create({
//         name,
//         email, password,image
//     })

//     if(newuser){
//         res.status(201).json({
//             _id: newuser._id,
//             name: newuser.name,
//             email: newuser.email,
           
//             image: newuser.image,
//             token:generateToken(newuser._id)
//             //let me check 705 815 Maza pase aahe
//         })
//     }
//     else{
//         res.status(400);
//         throw new Error('Failed to create new user')
//     }

// })

// const signinUser =asyncHandler(async(req,res)=>{
//     const {email,password} = req.body
//     console.log("hello");
//     const user =await User.findOne({ email}); 
    
//     if(user && (await user.matchPassword(password))){
//         res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             image: user.image,
//             token:generateToken(user._id)
//         })
//     }
//     else{
//         res.status(401);
//         throw new Error('Invalid email or password')
//     }
// })

     const signupUser = async (req, res) => {

    const { email, password, name, image } = req.body;
  
    try {
      const oldUser = await User.findOne({ email });
      
      if (oldUser) return res.status(400).json({errors:'User already exist'});
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await User.create({ email:email, password: hashedPassword, name: name,image:image});
   
      const token = jwt.sign( { email: result.email, id: result._id }, process.env.SECRET, { expiresIn: "1h" } );
      
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
    
    }
  };

 const signinUser = async (req, res) => {
  
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    // console.log(user)
    if (!user) return res.status(404).json({errors:[{msg:'User Does Not Exist'}]});

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    // console.log("isPasswordCorrect")
    if (!isPasswordCorrect) return res.status(400).json({ errors:[{msg:'Invalid Credentials'}]});
   
    
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET, { expiresIn: "1h" });
    res.status(200).json({ result: user, token });

  } catch (err) {
    
    res.status(500).json(err);
  }
};


const allUsers = asyncHandler(async (req, res) => {
    // console.log("first")
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
    // console.log(users)
  });

  
module.exports = {signinUser,signupUser,allUsers}
