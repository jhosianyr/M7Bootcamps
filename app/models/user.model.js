import { Sequelize, DataTypes as dt } from 'sequelize'
import { db } from '../config/db.config.js'

export const User = db.define('User', {
    id: {
        type: dt.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    firstName: {
        type: dt.STRING(255),
        allowNull: false,
        validate: {
            len: {
                args: [2, 255],
                msg: 'Nombre debe tener un mínimo de 2 caracteres'
            }
        }
    },
    lastName: {
        type: dt.STRING(255),
        allowNull: false,
        validate: {
            len: {
                args: [2, 255],
                msg: 'Apellido debe tener un mínimo de 2 caracteres'
            }
        }
    },
    email: {
        type: dt.STRING(255),
        allowNull: false,
        unique: {
            args: true,
            msg: "El email ya está registrado"
        },
        validate: {
            isEmail: true,
        }
    },
    createdAt: {
        type: dt.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: true,
        validate: {
            noUpdate(value) {
                if (this.changed('createdAt')) {
                    throw new Error('No se puede actualizar el campo createdAt');
                }
            }
        }
    },
    updatedAt: {
        type: dt.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    }
})

User.associate = (models) => {
    User.belongsToMany(models.Bootcamp, { through: 'UserBootcamp' })
}