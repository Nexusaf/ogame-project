import { Router } from 'express'
const defenseRouter = Router()
import defenseController from './controller.js'

defenseRouter.get("/defense/list", defenseController.listDefensives)
defenseRouter.get("/defense/ratio/:factor", defenseController.defenseRatio)

export default defenseRouter