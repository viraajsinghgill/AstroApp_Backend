const express = require('express');
const router = express.Router();
// No REST endpoints needed – we use socket.io
router.get('/', (req, res) => res.send('Chat endpoint'));
module.exports = router;