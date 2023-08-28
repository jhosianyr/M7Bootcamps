import express from 'express'
import { User, Bootcamp } from "../models/index.js"

const tableName = 'Bootcamps'
export const bootcamps = express.Router()

// INGRESA REGISTROS A LA TABLA Bootcamps
bootcamps.post('/createBootcamp', async (req, res) => {
    try {
        const { title, cue, description } = req.body
        const newBootcamp = await Bootcamp.create({ title, cue, description })
        res.json({ 'Se ha creado el Bootcamp': newBootcamp })
        console.log('Bootcamp creado')
    } catch (error) {
        res.json({ 'Mensaje': `Creando la tabla ${tableName}` })
        console.log(`Error al ingresar el nuevo registro a la tabla ${tableName}`, error)
    }
})

// Agrega un Usuario al Bootcamp
bootcamps.post('/addUser', async (req, res) => {
    try {
        const { bootcampId, userId } = req.body
        const bootcamp = await Bootcamp.findByPk(bootcampId)
        if (!bootcamp) return res.status(404).json({ Mensaje: 'Bootcamp no encontrado' })

        const user = await User.findByPk(userId)
        if (!user) return res.status(404).json({ Mensaje: 'Usuario no encontrado' })

        await bootcamp.addUser(user)

        res.json({ 'Usuario agregado al bootcamp correctamente': { 'Usuario': user, 'Bootcamp': bootcamp } })
        console.log(`Usuario id = ${user.id} se ha añadido al Bootcamp id = ${bootcamp.id}`)
    } catch (error) {
        res.json({ Mensaje: 'No se ha podido agregar al usuario en el Bootcamp' })
        console.log('No se llevó a cabo el registro', error)
    }
})

// Obtener los Bootcamp por id
bootcamps.get('/findById/:id', async (req, res) => {
    try {
        const id = req.params.id
        const bootcamp = await Bootcamp.findByPk(id, { include: { model: User, as: 'users' } })

        if (!bootcamp) {
            res.json({ 'Mensaje': 'El bootcamp no existe' })
            console.log('El Bootcamp no existe')
        } else {
            res.json({ 'Bootcamp': bootcamp })
            console.log('Bootcamp encontrado')
        }
    } catch (error) {
        res.json({ 'Mensaje': 'El bootcamp no pudo ser encontrado' })
        console.log('El bootcamp no pudo ser encontrado', error)
    }
})

// Obtener todos los Bootcamps incluyendo los Usuarios
bootcamps.get('/findAll', async (req, res) => {
    try {
        const bootcamps = await Bootcamp.findAll({ include: { model: User, as: 'users' } })
        res.json(bootcamps)
        console.log('Bootcamps y sus Usuarios encontrados')
    } catch (error) {
        res.json({ Mensaje: 'No se pudo obtener la lista de Bootcamps' })
        console.log('No se pudo obtener la lista de Bootcamps', error)
    }
})