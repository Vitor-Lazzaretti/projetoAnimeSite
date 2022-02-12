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
    useremail: getCurrentUser(req)
    }, order: [
        ['lastchange', 'desc'] // ASC ou DESC
    ]});;
    if(req.query){ 
        if(req.query.nome){
            var ordern = req.query.nome;
            if(ordern == 'ASC' || ordern == 'DESC') {
                animeDB = await Anime.findAll({where: {
                    useremail: getCurrentUser(req)
                    }, order: [
                    ['animename', ordern] // ASC ou DESC
                ]});
            }
        }
        if(req.query.recentes){
            var ordern = req.query.recentes;
       
            if(ordern == 'ASC' || ordern == 'DESC') {
                animeDB = await Anime.findAll({where: {
                    useremail: getCurrentUser(req)
                    },order: [
                    ['lastchange', ordern] // ASC ou DESC
                ]});
            }
            
        }
        if(req.query.rate){
            var ordern = req.query.rate;
            if(ordern == 'ASC' || ordern == 'DESC') {
                animeDB = await Anime.findAll({where: {
                    useremail: getCurrentUser(req)
                    }, order: [
                    ['animerate', ordern] // ASC ou DESC
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
    req.headers["access-control-allow-origin"] = '*';
    if(req.file) {
        const filepath = `/images/${Math.floor(Math.random()*99999999)+'-'+Date.now()}.jpg`;

        await sharp(req.file.path)
            .resize(150, 200)
            .toFormat('jpg')
            .toFile('./public'+filepath);

        const newAnime = Anime.build({
            animename: req.body.name,
            animedesc: req.body.desc,
            animerate: req.body.rate,
            firstadd: Date.now(),
            lastchange: Date.now(),
            addressimage1: '.'+filepath,
            useremail: getCurrentUser(req)
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
            useremail: getCurrentUser(req),
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