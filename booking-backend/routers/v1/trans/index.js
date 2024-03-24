const router = require('express').Router();
const transController = require('../../../controllers/trans');
const verifyPagingParams = require('../../../middlewares/verifyPagingParams');

/*
  GET /v1/trans
  GET /v1/trans?user_id
*/
router.get('/', verifyPagingParams, transController.getTrans);
/*
  POST /v1/trans
*/
router.post('/', transController.createTrans);
/*
  DELETE /v1/trans?id
  DELETE /v1/trans?user_id
*/
router.delete('/', transController.deleteTrans);

module.exports = router;
