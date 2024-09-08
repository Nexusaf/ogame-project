
import { Router } from 'express'
const planetRouter = Router()
import planetController from './controller.js'

// Actions related to planets
planetRouter.get('/planets', planetController.listAll)
planetRouter.get('/planets/report', planetController.report)
planetRouter.get('/planets/id/:id', planetController.findById)
planetRouter.get('/planets/name/:name', planetController.findByName)
planetRouter.put('/planets/update', planetController.updatePlanet)
planetRouter.put('/planets/updateall', planetController.updateAll)

export default planetRouter
