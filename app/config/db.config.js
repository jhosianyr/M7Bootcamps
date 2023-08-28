import dotenv from 'dotenv'
import Sequelize from 'sequelize'

dotenv.config(dotenv)

// CREACION BASE DE DATOS
export const db = new Sequelize(
    'db_bootcamp',
    'JhosianyR',
    'krisol', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
})

// CONEXIÓN BASE DE DATOS
export const db_connect = async () => {
    try {
        await db.authenticate()
            .then(() => console.log('Conexion exitosa'))
            .catch(err => console.error("No se puede conectar a la base de datos", err));
    } catch (error) {
        throw error;
    }
}

db_connect()