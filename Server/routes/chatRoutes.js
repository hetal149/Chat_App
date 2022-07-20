const express = require("express")
const { accessChat, getChat, createGroup, renameGroup, removeFromGroup, addToGroup } = require("../controllers/chatController")
// const accessChat = require("../controllers/chatController")
const { protect } = require("../middleware/authmiddleWare")
// const protect = require("../middleware/authmiddleWare")
const router=express.Router()
router.route('/').post(protect,accessChat)
router.route('/').get(protect,getChat)
router.route('/group').post(protect,createGroup)
router.route('/rename').put(protect,renameGroup)
router.route('/remove').put(protect,removeFromGroup)
router.route('/groupadd').put(protect,addToGroup)

module.exports = router