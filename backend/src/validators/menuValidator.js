const validateMenuItem = (data) => {
  const { name, description, price, category } = data;

  if (!name || name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }

  if (!description || description.trim().length < 10) {
    return 'Description must be at least 10 characters long';
  }

  if (!price || typeof price !== 'number' || price <= 0) {
    return 'Price must be a positive number';
  }

  if (!category || category.trim().length < 2) {
    return 'Category must be at least 2 characters long';
  }

  return null;
};

module.exports = {
  validateMenuItem
};