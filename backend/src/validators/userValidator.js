const validateRegistration = (data) => {
  const { name, email, password, role } = data;

  if (!name || name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }

  if (!email || !isValidEmail(email)) {
    return 'Invalid email format';
  }

  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters long';
  }

  if (!role || !['owner', 'staff', 'kitchen', 'customer', 'admin'].includes(role)) {
    return 'Invalid role specified';
  }

  // Role-specific validations
  if (role === 'staff' || role === 'kitchen') {
    if (!data.restaurantId) {
      return 'Restaurant ID is required for staff and kitchen roles';
    }
  }

  if (role === 'customer') {
    if (data.preferences && !Array.isArray(data.preferences)) {
      return 'Preferences must be an array';
    }
    if (data.allergies && !Array.isArray(data.allergies)) {
      return 'Allergies must be an array';
    }
  }

  return null;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = {
  validateRegistration
};