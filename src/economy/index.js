import express from 'express'
import economyRouter from './api/routes.js'

const economyApi = express()
economyApi.use('/api', economyRouter)
economyApi.listen(3002, () => console.log('Economy server is running'))