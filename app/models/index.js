import { db } from "../config/db.config.js";
import { User } from './user.model.js'
import { Bootcamp } from './bootcamp.model.js'

User.belongsToMany(Bootcamp, { through: 'UserBootcamp', as: 'bootcamps' })
Bootcamp.belongsToMany(User, { through: 'UserBootcamp', as: 'users' })

try {
    db.sync()
} catch (err) {
    console.error('No se pudo sincronizar con la tabla User_Bootcamp', err)
}

export { User, Bootcamp }