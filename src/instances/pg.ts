import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.PGSQL_DB as string,
    process.env.PGSQL_USER as string,
    process.env.PGSQL_PASSWORD as string,
    {
        dialect: 'postgres',
        port: parseInt(process.env.PGSQL_PORT as string)
    }
);