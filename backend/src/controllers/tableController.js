const tableService = require('../services/tableService');
const { validateTable } = require('../validators/tableValidator');

const createTable = async (req, res) => {
  try {
    const validationError = validateTable(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const table = await tableService.createTable(req.body, req.params.restaurantId);
    res.status(201).json(table);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTableStatus = async (req, res) => {
  try {
    const table = await tableService.updateTableStatus(
      req.params.tableId,
      req.body.status,
      req.params.restaurantId
    );
    res.json(table);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getTables = async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      capacity: req.query.capacity ? parseInt(req.query.capacity) : null
    };
    const tables = await tableService.getTables(req.params.restaurantId, filters);
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTableById = async (req, res) => {
  try {
    const table = await tableService.getTableById(
      req.params.tableId,
      req.params.restaurantId
    );
    res.json(table);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createTable,
  updateTableStatus,
  getTables,
  getTableById
};