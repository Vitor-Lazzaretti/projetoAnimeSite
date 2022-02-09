import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface UserInstance extends Model {
    id: number,
    useremail: string,
    userpassword: string
    username: string
}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    useremail: {
        primaryKey: false,
        type: DataTypes.STRING,
    },
    userpassword: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    }
}, {
    tableName: "usercad",
    timestamps: false
});

const init = async() => {
    await User.sync()
}

init()