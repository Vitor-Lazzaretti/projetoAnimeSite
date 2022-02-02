import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

interface UserInstance extends Model {
    userEmail: string,
    userPassword: string
}

export const User = sequelize.define<UserInstance>('User', {
    userEmail: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    userPassword: {
        type: DataTypes.STRING
    }
}, {
    tableName: "usercad",
    timestamps: false
});