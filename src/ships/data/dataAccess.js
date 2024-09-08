import { readFile, writeFile } from "fs/promises"

const SHIPS_PATH = process.env.SHIPS_PATH
const FLEET_PATH = process.env.FLEET

const getShipsData = async () => {
  try {
    const ships = await readFile(SHIPS_PATH, 'utf-8')
    return JSON.parse(ships)
  } catch (error) {
    return { success: false, error: error.message }
  }
}

const getFleetData = async () => {
  try {
    const fleet = await readFile(FLEET_PATH, 'utf-8')
    return JSON.parse(fleet)
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export { getShipsData, getFleetData } 