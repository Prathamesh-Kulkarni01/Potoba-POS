const Table = require('../models/Table');

const createTable = async (tableData, restaurantId) => {
  const table = new Table({
    ...tableData,
    restaurant: restaurantId
  });
  return await table.save();
};

const updateTableStatus = async (tableId, status, restaurantId) => {
  const table = await Table.findOneAndUpdate(
    { _id: tableId, restaurant: restaurantId },
    { status },
    { new: true }
  );
  if (!table) {
    throw new Error('Table not found');
  }
  return table;
};

const getTables = async (restaurantId, filters = {}) => {
  const query = { restaurant: restaurantId };
  if (filters.status) {
    query.status = filters.status;
  }
  if (filters.capacity) {
    query.capacity = { $gte: filters.capacity };
  }
  return await Table.find(query).sort({ tableNumber: 1 });
};

const getTableById = async (tableId, restaurantId) => {
  const table = await Table.findOne({ 
    _id: tableId, 
    restaurant: restaurantId 
  });
  if (!table) {
    throw new Error('Table not found');
  }
  return table;
};

module.exports = {
  createTable,
  updateTableStatus,
  getTables,
  getTableById
};