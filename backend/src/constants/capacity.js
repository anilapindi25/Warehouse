/**
 * CAPACITY constant object
 * Defines maximum number of packages that can be stored for each size
 */
const CAPACITY = {
  SMALL: 5,
  MEDIUM: 3,
  LARGE: 2,
};

/**
 * Get total warehouse capacity
 * @returns {number} Total capacity across all sizes
 */
const getTotalCapacity = () => {
  return Object.values(CAPACITY).reduce((sum, capacity) => sum + capacity, 0);
};

/**
 * Validate if size is available in capacity config
 * @param {string} size - Package size (SMALL, MEDIUM, LARGE)
 * @returns {boolean} True if size exists in CAPACITY
 */
const isValidSize = (size) => {
  return size in CAPACITY;
};

/**
 * Get capacity for specific size
 * @param {string} size - Package size (SMALL, MEDIUM, LARGE)
 * @returns {number|null} Capacity or null if size doesn't exist
 */
const getCapacityForSize = (size) => {
  return CAPACITY[size] || null;
};

module.exports = {
  CAPACITY,
  getTotalCapacity,
  isValidSize,
  getCapacityForSize,
};
