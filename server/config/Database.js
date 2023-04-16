import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

//const db = new Sequelize(process.env.DATABASE_URL)


const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
  });

  try {
    await db.authenticate();
        console.log('Connection has been established successfully.');
  } catch (error) {
        console.error('Unable to connect to the database:', error);
  }
export default db