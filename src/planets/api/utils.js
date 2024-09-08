/**
 * Validate the structure and required fields of a planet object.
 * 
 * @param {object} planet - The planet object to validate.
 * @returns {object} - An object containing the status of the validation and a message.
 */
const validatePlanetData = (planet = {}) => {
  const requiredKeys = ['id', 'name', 'fields', 'maxTemperature', 'minTemperature', 'production']
  const requiredProductionKeys = ['metal', 'crystal', 'deuterium']

  // Check for required keys in the planet object
  const planetHasAllKeys = requiredKeys.every(key => planet.hasOwnProperty(key))
  if (!planetHasAllKeys) {
    return { success: false, message: `Error: Missing one or more required keys in the planet object.` }
  }

  // Check for required keys in the production object
  if (typeof planet.production !== 'object' || planet.production === null) {
    return { success: false, message: `Error: Production must be a valid object.` }
  }

  const productionHasAllKeys = requiredProductionKeys.every(key => planet.production.hasOwnProperty(key))
  if (!productionHasAllKeys) {
    return { success: false, message: `Error: Missing one or more required keys in the production object.` }
  }

  return { success: true, message: `Planet data validated.` }
}

export { validatePlanetData }