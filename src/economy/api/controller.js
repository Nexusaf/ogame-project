import economy from '../domain/economyActions.js'


const economyController = {
  listAllBuildings: async (req, res) => {
    try {
      const buildings = await economy.listBuildings()
      res.status(200).json(buildings)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  tableCostReference: async (req, res) => {
    try {
      const buildings = await economy.generateTable()
      res.status(200).json(buildings)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}



export default economyController