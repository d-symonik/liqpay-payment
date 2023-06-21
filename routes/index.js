const {Router} = require('express');
const {billRouter} = require("./billRouter");
const router = Router();

router.use('/liqpay', billRouter);

module.exports = router;