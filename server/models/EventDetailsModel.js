import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Event from './EventsModel.js'

const {DataTypes, Deferrable} = Sequelize;

const EventDetails = db.define('EventDetails', 
    {
        eventDetailsId: {
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true , field: 'event_details_id'
        },
        title: {
            type: DataTypes.STRING , allowNull:false, field: 'title'
        },
        budget: {
            type: DataTypes.DECIMAL(10,2) , allowNull:false, defaultValue:0, field: 'budget'
        },
        cost: {
            type: DataTypes.DECIMAL(10,2) , allowNull:false, defaultValue:0, field: 'cost'
        },
        deposit: {
            type: DataTypes.DECIMAL(10,2) , allowNull:false, defaultValue:0, field: 'deposit'
        },
        supplierName: {
            type: DataTypes.STRING, allowNull:false , field: 'supplier_name'
        },
        supplierPhone: {
            type: DataTypes.STRING, allowNull:false , field: 'supplier_phone'
        },
        supplierEmail: {
            type: DataTypes.STRING, allowNull:false , field: 'supplier_email'
        },
        eventId: {
            type: DataTypes.INTEGER, 
            field: 'event_id',    
            references: {
             model: Event,      
              key: 'eventId',      
              deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
          },
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'eventdetails'
    }
)

export default EventDetails

