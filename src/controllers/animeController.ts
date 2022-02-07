import { Request, Response } from "express";
import { Anime } from "../models/Animes";
import sharp from "sharp";  
import { unlink } from "fs/promises";
import JWT from 'jsonwebtoken'
import { newToken } from '../middllewares/passport'

function getCurrentUser(req: Request): string {
    const token = req.cookies.loginToken
    const newToken: newToken | any =  JWT.verify(token, process.env.JWT_SECRET as string)

    return newToken.email as string
}

export const home = async (req: Request, res: Response) => {
    let animeDB = await Anime.findAll({where: {
    userEmail: getCurrentUser(req)
    }, order: [
        ['lastChange', 'desc'] // ASC ou DESC
    ]});;
    if(req.query){ 
        if(req.query.nome){
            var ordern = req.query.nome;
            if(ordern == 'ASC' || ordern == 'DESC') {
                animeDB = await Anime.findAll({where: {
                    userEmail: getCurrentUser(req)
                    }, order: [
                    ['animeName', ordern] // ASC ou DESC
                ]});
            }
        }
        if(req.query.recentes){
            var ordern = req.query.recentes;
       
            if(ordern == 'ASC' || ordern == 'DESC') {
                animeDB = await Anime.findAll({where: {
                    userEmail: getCurrentUser(req)
                    },order: [
                    ['lastChange', ordern] // ASC ou DESC
                ]});
            }
            
        }
        if(req.query.rate){
            var ordern = req.query.rate;
            if(ordern == 'ASC' || ordern == 'DESC') {
                animeDB = await Anime.findAll({where: {
                    userEmail: getCurrentUser(req)
                    }, order: [
                    ['animeRate', ordern] // ASC ou DESC
                ]});
            }
        }
    }
    res.render('pages/home', {animeDB});
}

export const newAnime = async (req: Request, res: Response) => {
    res.render('pages/form', {});
}

export const loadingNewAnime = async (req: Request, res: Response) => {
    if(req.file) {
        const filepath = `/images/${req.file.filename}.jpg`;

        await sharp(req.file.path)
            .resize(150, 200)
            .toFormat('jpg')
            .toFile('./public'+filepath);

        const newAnime = Anime.build({
            animeName: req.body.name,
            animeDesc: req.body.desc,
            animeRate: req.body.rate,
            firstAdd: Date.now(),
            lastChange: Date.now(),
            addressImage1: '.'+filepath,
            userEmail: getCurrentUser(req)
        });
        await newAnime.save();

        await unlink(req.file.path);
    }
    
    res.redirect('/home');
}
export const homeId = async (req: Request, res: Response) => {
    const itemId = parseInt(req.params.id)
    console.log('PARAMS', itemId)
    if(itemId) {
        const animeDB = await Anime.findOne({where: {
            userEmail: getCurrentUser(req),
            id: itemId
        }});;
        console.log(animeDB)
        if(animeDB) {
            res.render('pages/id', { animeDB });
        } else {
            res.send('Esta página não existe ou pertence a outro usuário');
        }
    } else {
        res.redirect('/home');
    }
} 