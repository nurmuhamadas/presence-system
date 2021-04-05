const { MongoClient } = require('mongodb');
const EmployeesModel = require('./models/employees.model');
const app = require('./server');
require('dotenv').config();

const port = process.env.PORT || 5000;

const client = new MongoClient(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);
client.connect()
  .then(() => {
    app.listen(port, async () => {
      await EmployeesModel.injectDB(client);
      console.log(`Listening on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(`Faild to connect. Error: ${error}`);
    process.exit(1);
  });
