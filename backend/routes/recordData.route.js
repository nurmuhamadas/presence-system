const { Router } = require('express');
const RecordDataController = require('../controllers/recordData.controller');

const router = new Router();

router.route('/date/:year/:month/:date').get(RecordDataController.getRecordDataByTimeObject);
router.route('/:userId').get(RecordDataController.getRecordDataByUserId);
router.route('/').post(RecordDataController.addRecordData);

module.exports = router;
