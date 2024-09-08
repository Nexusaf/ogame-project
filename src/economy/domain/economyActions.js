import getBuildings from '../data/dataAccess.js'

const economy = {
  listBuildings: async () => {
    try {
      const buildings = await getBuildings()
      return buildings
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  generateTable: async () => {
    try {
      const buildings = await getBuildings()
      const maxLevel = 35
      
      const formatNumber = new Intl.NumberFormat("de-DE")
      const calculateLevelCost = (cost, base, level) => (cost * Math.pow(base, level - 1)).toFixed(0)

      const table = buildings.map((building) => {
        const levels = []
        for (let lvl = 1; lvl <= maxLevel; lvl++) {
          const metal = formatNumber.format(calculateLevelCost(building.cost.metal, building.base, lvl))
          const crystal = formatNumber.format(calculateLevelCost(building.cost.crystal, building.base, lvl))
          const deuterium = formatNumber.format(calculateLevelCost(building.cost.deuterium, building.base, lvl))

          const cost = {
            level: lvl,
            metal,
            crystal,
            deuterium
          }

          levels.push(cost)
        }
        return {
          name: building.name,
          levels
        }
      })

      return table
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}


export default economy