import { Router } from 'express'
const shipsRouter = Router()
import shipsController from './controller.js'

shipsRouter.get("/ships", shipsController.listShips)
shipsRouter.get("/fleet/cargo", shipsController.fleetCargo)
shipsRouter.post("/ships/cargo", shipsController.cargo)
shipsRouter.post("/ships/cost", shipsController.cost)

export default shipsRouter