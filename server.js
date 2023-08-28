import express from 'express'
import { users } from './app/controllers/user.controller.js'
import { bootcamps } from './app/controllers/bootcamp.controller.js'

const app = express();
const PORT = 3000

// MIDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// RUTAS
app.use('/users', users)
app.use('/bootcamps', bootcamps)

// SERVER
app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto: ${PORT}`)
})