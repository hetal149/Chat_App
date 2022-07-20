const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
 
  if (
  
  (typeof req.headers.authorization === 'string') &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      
      token = req.headers.authorization.split(" ")[1];
      // console.log(token)
      //decodes token id
      const decoded = jwt.verify(token, process.env.SECRET);
      // console.log(decoded)
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      // console.log('error')
      res.status(401);
      throw new Error(error.message);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };