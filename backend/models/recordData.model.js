const ObjectID = require('mongodb');
const { getObjectTime } = require('../utils');

let recordData;

class RecordDataModel {
  static async injectDB(connection) {
    try {
      if (recordData) {
        return;
      }
      recordData = await connection.db(process.env.DB_NAME)
        .collection('recordData');
    } catch (error) {
      console.error(
        `Unable to establish a collection handle in recordData model: 
          ${error}`,
      );
    }
  }

  static async getRecordDataByUserId({
    userId,
    sortBy = 'name',
    desc = false,
  }) {
    try {
      const cursor = await recordData.find({ userId }).sort({ [sortBy]: desc ? -1 : 1 });
      return cursor.toArray();
    } catch (error) {
      console.error('Something went wrong in getRecordDataByUserId:', error);
      throw new Error(error);
    }
  }

  static async getRecordDataByTimeObject({
    time = {
      date: '01',
      month: '01',
      year: '2000',
    },
    sortBy = 'name',
    desc = false,
  }) {
    try {
      const cursor = await recordData.find({
        'time.date': time.date,
        'time.month': time.month,
        'time.year': time.year,
      }).sort({ [sortBy]: desc ? -1 : 1 });
      return cursor.toArray();
    } catch (error) {
      console.error('Something went wrong in getRecordDataByTimeObject:', error);
      throw new Error(error);
    }
  }

  static async addRecordData({
    userId, glucose, temperature,
  }) {
    try {
      const { insertedCount, ops } = await recordData.insertOne({
        _id: ObjectID,
        userId,
        time: getObjectTime(),
        data: { glucose, temperature },
        presence: {
          H: true,
          I: false,
          S: false,
          info: '',
        },
      });

      if (insertedCount !== 1) {
        throw new Error('data not saved');
      }
      return ops[0];
    } catch (error) {
      console.error('Something went wrong in getRecordDataByTimeObject:', error);
      throw new Error(error);
    }
  }
}

module.exports = RecordDataModel;
