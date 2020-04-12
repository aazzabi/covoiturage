var express = require('express');
var router = express.Router();
var claimController = require('../controllers/ClaimsController');

router.post('/add/:idUser', claimController.add);
router.get('/getAll/:idUser', claimController.getAll);
router.get('/getById/:idClaim/:idUser', claimController.getById);
router.get('/delete/:id', claimController.deleteClaim);
router.post('/resolve/:id', claimController.resolveClaim);
router.post('/changeStatus/:id/:status', claimController.changeStatus);
router.post('/addComment/:idClaim/:idUser', claimController.addCommentToClaim);

module.exports = router;
