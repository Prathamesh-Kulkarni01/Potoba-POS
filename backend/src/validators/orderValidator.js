const validateOrder = (data) => {
  const { table, items } = data;

  if (!table) {
    return 'Table is required';
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return 'Order must contain at least one item';
  }

  for (const item of items) {
    if (!item.menuItem) {
      return 'Menu item is required for each order item';
    }
    if (!item.quantity || typeof item.quantity !== 'number' || item.quantity < 1) {
      return 'Valid quantity is required for each order item';
    }
  }

  if (data.status && !['pending', 'preparing', 'served'].includes(data.status)) {
    return 'Invalid order status';
  }

  return null;
};

module.exports = {
  validateOrder
};