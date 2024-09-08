import { getDefense } from "../data/dataAccess.js"

// Default defense ratio reference
const DEFAULT_DEFENSE_RATIO = [120, 96, 24, 5, 22, 1]
const DEFENSE_RATIO = process.env.DEFENSE_RATIO 
  ? process.env.DEFENSE_RATIO.split(',').map(Number)
  : DEFAULT_DEFENSE_RATIO

/**
 * Fetches defensive structures data.
 * 
 * @returns {Promise<Object>} The defense data object. 
 * If successful, returns the data. If unsuccessful, returns an error message.
 */
const getDefensiveStructures = async () => {
  try {
    const { success, data } = await getDefense()
    
    if (!success) {
      return { success: false, message: `Error reading defense data: ${data}` }
    }
    
    return { success: true, data }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

/**
 * Calculates the ratio of defensive structures based on a given factor.
 * 
 * @param {number} [factor=1] - The factor by which to multiply the defense ratio.
 * @returns {Promise<Object>} The calculated ratio data including total costs and details.
 */
const getRatio = async (factor = 1) => {
  try {
    const { success, data: defense } = await getDefense()
    
    if (!success) {
      return { success: false, message: `Error reading defense data: ${defense}` }
    }

    const ratio = DEFENSE_RATIO.reduce((acc, r, i) => {
      const { name, cost } = defense[i]
      const quantity = r * factor
      const metal = cost.metal * quantity
      const crystal = cost.crystal * quantity
      const deuterium = cost.deuterium * quantity

      acc.total.totalUnits += metal + crystal + deuterium
      acc.total.metal += metal
      acc.total.crystal += crystal
      acc.total.deuterium += deuterium

      acc.details.push({
        name,
        quantity,
        cost: { metal, crystal, deuterium }
      })

      return acc
    }, { total: { metal: 0, crystal: 0, deuterium: 0, totalUnits: 0 }, details: [] })

    return { success: true, data: ratio }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export { getDefensiveStructures, getRatio }
