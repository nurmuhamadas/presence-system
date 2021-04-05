const RecordDataModel = require('../models/recordData.model');

class RecordDataController {
  static async getRecordDataByUserId(req, res) {
    const { userId, desc, sortBy } = req.params;
    const { month, year } = req.query;

    if (!userId || userId === undefined || userId === '') {
      res.status(400).json({ error: 'userId is required' });
      return;
    }

    if (!month || month === undefined || month === '') {
      res.status(400).json({ error: 'month query is required' });
      return;
    }

    if (!year || year === undefined || year === '') {
      res.status(400).json({ error: 'year query is required' });
      return;
    }

    try {
      const response = await RecordDataModel.getRecordDataByUserId({ userId, desc, sortBy });
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  static async getRecordDataByTimeObject(req, res) {
    const { date, month, year } = req.params;

    if (!date || date === undefined || date === '') {
      res.status(400).json({ error: 'date query is required' });
      return;
    }
    if (!month || month === undefined || month === '') {
      res.status(400).json({ error: 'month query is required' });
      return;
    }
    if (!year || year === undefined || year === '') {
      res.status(400).json({ error: 'year query is required' });
      return;
    }

    try {
      const { desc, sortBy } = req.query;
      const response = await RecordDataModel.getRecordDataByTimeObject({
        time: { date, month, year },
        desc,
        sortBy,
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  static async addRecordData(req, res) {
    const { userId, glucose, temperature } = req.body;

    if (!userId || userId === undefined || userId === '') {
      res.status(400).json({ error: 'userId is required' });
      return;
    }

    if (!glucose || glucose === undefined || glucose === '') {
      res.status(400).json({ error: 'glucose is required' });
      return;
    }

    if (!temperature || temperature === undefined || temperature === '') {
      res.status(400).json({ error: 'temperature is required' });
      return;
    }

    try {
      const response = await RecordDataModel
        .addRecordData({ userId, glucose, temperature });
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ error });
    }
  }
}

module.exports = RecordDataController;
