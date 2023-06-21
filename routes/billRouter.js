const {Router} = require("express");
const billController = require("../controllers/billController");
const router = Router();

router.get('/',billController.sendForm);
router.post('/result',billController.check);

module.exports = {
    billRouter: router
}