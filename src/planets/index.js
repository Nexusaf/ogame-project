// For stand alone use

import express from 'express'
import router from './api/routes.js'

const plantesApi = express()
plantesApi.use('/api', router)
plantesApi.listen(3001, () => console.log('Planets server is running'))