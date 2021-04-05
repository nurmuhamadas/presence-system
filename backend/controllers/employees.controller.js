const EmployeesModel = require('../models/employees.model');

class EmployeesController {
  static async getAllEmployees(req, res) {
    try {
      const { desc, sortBy } = req.query;
      const response = await EmployeesModel.getAllEmployees({ desc, sortBy });
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ error });
    }
  }
}

module.exports = EmployeesController;
