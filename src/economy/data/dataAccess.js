import { readFile, writeFile } from "fs/promises"

const BUILDINGS_PATH = process.env.BUILDINGS

const getBuildings = async () => {
  try {
    const buildings = await readFile(BUILDINGS_PATH, 'utf-8')
    return JSON.parse(buildings)
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export default getBuildings