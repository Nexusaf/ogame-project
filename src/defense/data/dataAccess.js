import { readFile, writeFile } from "fs/promises"

const PATH = process.env.DEFENSE_PATH

const getDefense = async () => {
  try {
    const data = await readFile(PATH, "utf-8")
    const defense = JSON.parse(data)
    return { success: true, data: defense }
  } catch (error) {
    return { success: false, message: `Error reading defense data: ${error.message}` }
  }
}

export { getDefense }