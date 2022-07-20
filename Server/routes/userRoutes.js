const express = require('express');
const { signupUser, signinUser, allUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authmiddleWare');
// const protect = require('../middleware/authmiddleWare');
const router = express.Router();

router.route('/signin').post(signinUser)
router.route('/').post(signupUser).get(protect,allUsers)


module.exports=router
