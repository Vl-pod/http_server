const Router = require('express');
const router = new Router();
const ticketController = require('../controllers/ticketController');

router.get('/getAll', ticketController.getAll);
router.get('/:id', ticketController.getInfoId);
router.get('/delete/:id', ticketController.delete);

router.post('/create', ticketController.create);
router.post('/edit/:id', ticketController.edit);




module.exports = router;