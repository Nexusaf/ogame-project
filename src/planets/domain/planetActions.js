import { getPlanets, updateOne, updateMany, saveUpdateReport } from "../data/dataAccess.js"

/**
 * Utility function to find a planet by a specific key and value.
 * 
 * @param {string} key - The key to search by (e.g., 'id' or 'name').
 * @param {string} value - The value to match with the key.
 * @param {Array} planetsList - The list of planets to search in (optional).
 * @returns {object} - An object containing the status of the operation and the planet data or an error message.
 */
const findPlanet = async (key, value) => {
  try {
    const { success, data: planets } = await getPlanets()

    if (!success) {
      return { success: false, message: `Planet with ${key} "${value}" not found.` }
    }

    return planets.find(planet => planet[key].toLowerCase() === value.toLowerCase())
  } catch (error) {
    return { success: false, message: `Error while finding planet by ${key}.`, details: error.message }
  }
}

const findPlanetById = (id) => findPlanet('id', id)
const findPlanetByName = (name) => findPlanet('name', name)

/**
 * List all planets.
 * 
 * @returns {Promise<object>} - An object containing the status of the operation and the list of planets or an error message.
 */
const listPlanets = async () => {
  try {
    const { success, data: planets, message } = await getPlanets()

    if (!success) {
      return { success: false, message }
    }

    return { success: true, data: planets }
  } catch (error) {
    return { success: false, message: `Error while listing planets.`, details: error.message }
  }
}

const update = async (id, planet) => {
  try {
    const { success, data: planets } = await getPlanets()

    const planetIndex = planets.findIndex(planet => planet.id === id)
    if (planetIndex === -1) {
      return { success: false, message: `Planet with id "${id}" not found.` }
    }

    return await updateOne(planet, planetIndex, planets)
  } catch (error) {
    return { success: false, message: `Error while updating planet.`, details: error.message }
  }
}

/**
 * Update multiple planets' data in the list.
 * 
 * @param {Array} planetsToUpdate - An array of planet objects containing updated data.
 * @returns {Promise<object>} - An object containing the status of the operation and a success message or an error message.
 */
const updateAll = async (planetsToUpdate) => {
  try {
    const { success, data: planets } = await getPlanets()

    if (!success) {
      throw new Error("Failed to retrieve planets.")
    }

    const updatedPlanets = planets.map(planet => {
      const findedPlanet = planetsToUpdate.find(p => p.id === planet.id)
      return findedPlanet ? { ...planet, ...findedPlanet } : planet
    })

    const updateOperation = await updateMany(updatedPlanets)
    if (!updateOperation.success) {
      throw new Error("Failed to update planets.")
    }

    updatedPlanets.sort((a, b) => a.id.localeCompare(b.id))
    planets.sort((a, b) => a.id.localeCompare(b.id))

    const report = updatedPlanets.reduce((acc, planet, i) => {
      const metal = planet.production.metal - planets[i].production.metal
      const crystal = planet.production.crystal - planets[i].production.crystal
      const deuterium = planet.production.deuterium - planets[i].production.deuterium

      const planetReport = {
        planet: planet.name,
        productionDiff: {
          metal,
          crystal,
          deuterium
        }
      }

      acc.total.metal += metal
      acc.total.crystal += crystal
      acc.total.deuterium += deuterium

      acc.updateReport.push(planetReport)
      return acc
    }, { total: { metal: 0, crystal: 0, deuterium: 0 }, updateReport: [], })

    const { lastId, message } = await saveUpdateReport(report)

    return {
      success: true,
      id: lastId,
      report
    }
  } catch (error) {
    return { success: false, message: "Error while updating planets.", details: error.message }
  }
}

const generateReport = async () => {
  try {
    const { success, data: planets, message } = await getPlanets()

    if (!success) {
      return { success: false, message }
    }

    const totalProduction = planets.reduce((total, { production }) => ({
      metal: total.metal + production.metal * 24,
      crystal: total.crystal + production.crystal * 24,
      deuterium: total.deuterium + production.deuterium * 24,
    }), { metal: 0, crystal: 0, deuterium: 0 })

    const getBestAndWorstProducer = (type) => {
      return planets.reduce(
        (acc, planet) => {
          if (planet.production[type] > acc.best.production[type]) acc.best = planet
          if (planet.production[type] < acc.worst.production[type]) acc.worst = planet
          return acc
        },
        { best: { production: { [type]: 0 } }, worst: { production: { [type]: Infinity } } }
      )
    }

    const metalProduction = getBestAndWorstProducer('metal')
    const crystalProduction = getBestAndWorstProducer('crystal')
    const deuteriumProduction = getBestAndWorstProducer('deuterium')

    const moreFields = planets.reduce((more, planet) => {
      return planet.fields > more.fields ? planet : more
    }, { fields: 0 })

    return {
      success: true,
      data: {
        dailyMetalProduction: totalProduction.metal,
        dailyCrystalProduction: totalProduction.crystal,
        dailyDeuteriumProduction: totalProduction.deuterium,
        moreFields,
        metalProduction,
        crystalProduction,
        deuteriumProduction
      }
    }
  } catch (error) {
    return { success: false, message: `Error while generating report.`, details: error.message }
  }
}

export {
  findPlanetById,
  findPlanetByName,
  listPlanets,
  update,
  updateAll,
  generateReport
}
