const Router = require('express');
const router = new Router();
const ticketRouter = require('./ticketRouter');


router.use('/ticket', ticketRouter)


module.exports = router;