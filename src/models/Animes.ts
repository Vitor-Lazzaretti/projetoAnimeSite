import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../instances/mysql";

interface AnimeInstance extends Model {
    id: number,
    animeName: string,
    animeDesc: string,
    animeRate: string,
    firstAdd: number,
    lastChange: number,
    addressImage1: string,
};

export const Anime = sequelize.define<AnimeInstance>("Anime", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    animeName: {
        type: DataTypes.STRING
    },
    animeDesc: {
        type: DataTypes.STRING
    },
    animeRate: {
        type: DataTypes.FLOAT
    },
    firstAdd: {
        type: DataTypes.BIGINT
    },
    lastChange: {
        type: DataTypes.BIGINT 
    },
    addressImage1: {
        type: DataTypes.STRING
    },
    
}, {
    tableName: "animelist",
    timestamps: false
});