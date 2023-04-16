import { Sequelize } from "sequelize";
import Users from './UsersModel.js'
import db from '../config/Database.js';

const {DataTypes, Deferrable} = Sequelize;

const Events = db.define('Events', 
    {
        eventId: {
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true , field: 'event_id'
        },
        title: {
            type: DataTypes.STRING , field: 'title'
        },
        startDate: {
            type: DataTypes.DATE , field: 'start_date'
        },
        endDate: {
            type: DataTypes.DATE , field: 'end_date'
        },
        userId: {
            type: DataTypes.INTEGER,     
            field: 'user_id',
            references: {
             model: Users,      
              key: 'userId',      
              deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
          },
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'events'
    }
)

export default Events

