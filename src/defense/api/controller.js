import { getDefensiveStructures, getRatio } from '../domain/defenseActions.js'

const defenseController = {
  listDefensives: async (req, res) => {
    try {
      const defense = await getDefensiveStructures()
      res.status(200).json(defense)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  defenseRatio: async (req, res) => {
    try {
      const { factor } = req.params
      const ratio = await getRatio(factor)
      res.status(200).json(ratio)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default defenseController