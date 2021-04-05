let employees;

class EmployeesModel {
  static async injectDB(connection) {
    try {
      if (employees) {
        return;
      }
      employees = await connection.db(process.env.DB_NAME)
        .collection('employees');
    } catch (error) {
      console.error(
        `Unable to establish a collection handle in Employees model: 
          ${error}`,
      );
    }
  }

  static async getAllEmployees({
    sortBy = 'name',
    desc = false,
  }) {
    try {
      const cursor = await employees.find({}).sort({ [sortBy]: desc ? -1 : 1 });
      return cursor.toArray();
    } catch (error) {
      console.error('Something went wrong in getAllEmployees:', error);
      throw new Error(error);
    }
  }
}

module.exports = EmployeesModel;
