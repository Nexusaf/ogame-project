import express from 'express'
import shipsRouter from './api/routes.js'

const shipsApi = express()
shipsApi.use('/api', shipsRouter)
shipsApi.listen(3004, () => console.log('Ships server is running'))