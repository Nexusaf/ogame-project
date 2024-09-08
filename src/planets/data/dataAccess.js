import { readFile, writeFile, appendFile } from "fs/promises"

const PATH = process.env.PLANETS_PATH
const REPORT_PATH = process.env.UPDATE_REPORT_PATH

/**
 * Retrieve a list of all planets.
 * 
 * @returns {Promise<object>} - An object containing the status of the operation and the list of planets or an error message.
 */
export const getPlanets = async () => {
  try {
    const planetsData = await readFile(PATH, "utf-8")
    const planets = JSON.parse(planetsData)

    if (!Array.isArray(planets)) {
      throw new TypeError("Planets data is not an array.")
    }

    return { success: true, data: planets }
  } catch (error) {
    return { success: false, message: `Error reading planets data: ${error.message}` }
  }
}

/**
 * Update a single planet's data in the list.
 * 
 * @param {object} planetData - The new data for the planet.
 * @param {number} idx - The index of the planet to update.
 * @param {Array} planets - The current list of planets.
 * @returns {Promise<object>} - An object containing the status of the operation and a success message or an error message.
 */
export const updateOne = async (planetData, idx, planets) => {
  try {
    planets[idx] = planetData
    await writeFile(PATH, JSON.stringify(planets, null, 2))
    return { success: true, message: `Planet ${planetData.name} updated successfully.` }
  } catch (error) {
    return { success: false, message: `Error updating planet: ${error.message}` }
  }
}

/**
 * Update the entire planets data.
 * 
 * @param {Array} planets - The current list of planets.
 * @returns {Promise<object>} - An object containing the status of the operation and a success message or an error message.
 */
export const updateMany = async (planets) => {
  try {
    await writeFile(PATH, JSON.stringify(planets, null, 2))
    return { success: true, message: "Planets updated successfully." }
  } catch (error) {
    return { success: false, message: `Error updating planets: ${error.message}` }
  }
}

export const saveUpdateReport = async (report) => {
  try {
    const reportData = JSON.parse(await readFile(REPORT_PATH, "utf-8"))
    const lastReport = {
      id: new Date(),
      report
    }

    reportData.push(lastReport)

    await writeFile(REPORT_PATH, JSON.stringify(reportData, null, 2))

    return { success: true, lastId: lastReport.id, message: `Report saved successfully. ${lastReport.id}}`}
  } catch (error) {
    return { success: false, message: `Error saving report: ${error.message}` }
  }
}