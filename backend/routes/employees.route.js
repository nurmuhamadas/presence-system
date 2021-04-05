const { Router } = require('express');
const EmployeesController = require('../controllers/employees.controller');

const router = new Router();

router.route('/').get(EmployeesController.getAllEmployees);

module.exports = router;
