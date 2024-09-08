import { readFile, writeFile } from "fs/promises"

const SHIPS_PATH = process.env.SHIPS_PATH

const getShipsData = async () => {
  try {
    const ships = await readFile(SHIPS_PATH, 'utf-8')
    return JSON.parse(ships)
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export { getShipsData } 