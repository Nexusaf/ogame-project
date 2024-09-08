import express from 'express'
import defenseRouter from './api/routes.js'

const defenseApi = express()
defenseApi.use('/api', defenseRouter)
defenseApi.listen(3003, () => console.log('Defense server is running'))