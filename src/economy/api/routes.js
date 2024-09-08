import { Router } from 'express'
const economyRouter = Router()
import economyController from './controller.js'

economyRouter.get('/buildings', economyController.listAllBuildings)
economyRouter.get('/buildings/table', economyController.tableCostReference)

export default economyRouter