import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

export interface UserInstance extends Model {
    id: number,
    userEmail: string,
    userPassword: string
    userName: string
}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    userEmail: {
        primaryKey: false,
        type: DataTypes.STRING,
    },
    userPassword: {
        type: DataTypes.STRING
    },
    userName: {
        type: DataTypes.STRING
    }
}, {
    tableName: "usercad",
    timestamps: false
});