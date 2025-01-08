const validateTable = (data) => {
  const { tableNumber, capacity } = data;

  if (!tableNumber || tableNumber.trim().length < 1) {
    return 'Table number is required';
  }

  if (!capacity || typeof capacity !== 'number' || capacity < 1) {
    return 'Capacity must be a positive number';
  }

  if (data.status && !['available', 'occupied', 'reserved'].includes(data.status)) {
    return 'Invalid table status';
  }

  return null;
};

module.exports = {
  validateTable
};