import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../instances/pg";

interface AnimeInstance extends Model {
    id: number,
    animename: string,
    animedesc: string,
    animerate: string,
    firstadd: number,
    lastchange: number,
    addressimage1: string,
    useremail: string,
};

export const Anime = sequelize.define<AnimeInstance>("Anime", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    animename: {
        type: DataTypes.STRING
    },
    animedesc: {
        type: DataTypes.STRING
    },
    animerate: {
        type: DataTypes.FLOAT
    },
    firstadd: {
        type: DataTypes.BIGINT
    },
    lastchange: {
        type: DataTypes.BIGINT 
    },
    addressimage1: {
        type: DataTypes.STRING
    },
    useremail: {
        type: DataTypes.STRING
    },
    
}, {
    tableName: "animelist",
    timestamps: false
});

const init = async() => {
    await Anime.sync()
}

init();