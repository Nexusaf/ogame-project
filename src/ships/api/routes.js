import { Router } from 'express'
const shipsRouter = Router()
import shipsController from './controller.js'

shipsRouter.get("/ships", shipsController.listShips)
shipsRouter.post("/ships/cargo", shipsController.cargo)
shipsRouter.post("/fleet/cargo", shipsController.fleetCargo)
shipsRouter.post("/ships/cost", shipsController.cost)

export default shipsRouter