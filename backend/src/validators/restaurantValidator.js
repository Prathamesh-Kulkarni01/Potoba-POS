const validateRestaurant = (data) => {
  const { name, address } = data;

  if (!name || name.trim().length < 2) {
    return 'Restaurant name must be at least 2 characters long';
  }

  if (!address || address.trim().length < 5) {
    return 'Address must be at least 5 characters long';
  }

  if (data.businessHours) {
    const { open, close } = data.businessHours;
    if (open && !isValidTimeFormat(open)) {
      return 'Invalid opening time format (use HH:MM)';
    }
    if (close && !isValidTimeFormat(close)) {
      return 'Invalid closing time format (use HH:MM)';
    }
  }

  return null;
};

const isValidTimeFormat = (time) => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

module.exports = {
  validateRestaurant
};