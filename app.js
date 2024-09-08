import express from 'express'
import planetRouter from './src/planets/api/routes.js'
import economyRouter from './src/economy/api/routes.js'
import defenseRouter from './src/defense/api/routes.js'
import shipsRouter from './src/ships/api/routes.js'

const app = express()
app.use(express.json())
app.use('/api', [defenseRouter, planetRouter, economyRouter, shipsRouter] )
app.use('*', (req, res) => { res.status(404).json({ error: '404 Page Not Found' }) })

app.listen(3000, () => console.log('Planets server is running'))