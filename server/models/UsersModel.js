import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Users = db.define('users', 
    {
        userId: {
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true , field: 'user_id'
        },
        firstName: {
            type: DataTypes.STRING, allowNull: false, field: 'firstname'
        },
        lastName: {
            type: DataTypes.STRING, allowNull: false, field: 'lastname'
        },
        address: {
            type: DataTypes.STRING, allowNull: true, field: 'address'
        },
        city: {
            type: DataTypes.STRING, allowNull: true, field: 'city'
        },
        zipcode: {
            type: DataTypes.STRING, allowNull: true, field: 'zipcode'
        },
        country: {
            type: DataTypes.STRING, allowNull: true, field: 'country'
        },
        phone: {
            type: DataTypes.STRING, allowNull: false, field: 'phone'
        },
        email: {
            type: DataTypes.STRING, allowNull: false, field: 'email'
        },
        password: {
            type: DataTypes.STRING, allowNull: false, field: 'password'
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'users'
    }
)

export default Users

