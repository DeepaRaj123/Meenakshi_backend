const express = require('express');
const {sendMessage,postMessage,showwelcomeMessage} = require('../controllers/userController');
const AuthMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.get('/sendMessage', sendMessage);
router.post('/postMessage', postMessage);
router.get('/', showwelcomeMessage);

module.exports = {
    routes: router
}