const router = require('express').Router();
const { getChats, postChats } = require('../controllers/chat.controller')

router.get('/get-chats', getChats);
router.post('/post-chats', postChats);

module.exports = router