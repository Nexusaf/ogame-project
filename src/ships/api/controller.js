import { getShips, calculateCargo, calculateCost, calculateFleetCargo } from '../domain/shipsActions.js'

const shipsController = {
  listShips: async (req, res) => {
    try {
      const ships = await getShips()
      res.status(200).json(ships)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve ships data' })
    }
  },

  cargo: async (req, res) => {
    try {
      const { shipName, totalUnits } = req.body

      if (!shipName || !totalUnits) {
        return res.status(400).json({ error: 'Missing shipName or totalUnits parameter' })
      }
      if (isNaN(totalUnits)) {
        return res.status(400).json({ error: 'totalUnits must be a valid number' })
      }

      const result = await calculateCargo(shipName, totalUnits)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate cargo capacity' })
    }
  },

  fleetCargo: async (req, res) => {
    try {
      const result = await calculateFleetCargo()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate fleet cargo capacity' })
    }
  },

  cost: async (req, res) => {
    try {
      const { shipName, quantity } = req.body
      if (!shipName || !quantity) {
        return res.status(400).json({ error: 'Missing shipName or quantity parameter' })
      }
      if (isNaN(quantity)) {
        return res.status(400).json({ error: 'quantity must be a valid number' })
      }

      const cost = await calculateCost(shipName, quantity)
      res.status(200).json(cost)
    } catch {
      res.status(500).json({ error: 'Failed to calculate the ship cost' })
    }
  }
}

export default shipsController
