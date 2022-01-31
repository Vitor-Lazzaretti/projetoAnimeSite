import { Request, Response } from "express";
import { Anime } from "../models/Animes";
import sharp from "sharp";  
import { unlink } from "fs/promises";

export const home = async (req: Request, res: Response) => {
    let animeDB = await Anime.findAll({order: [
        ['lastChange', 'desc'] // ASC ou DESC
    ]});;
    if(req.query){ 
        if(req.query.nome){
            var ordern = req.query.nome;
            if(ordern == 'ASC' || ordern == 'DESC') {
                animeDB = await Anime.findAll({order: [
                    ['animeName', ordern] // ASC ou DESC
                ]});
            }
        }
        if(req.query.recentes){
            var ordern = req.query.recentes;
       
            if(ordern == 'ASC' || ordern == 'DESC') {
                animeDB = await Anime.findAll({order: [
                    ['lastChange', ordern] // ASC ou DESC
                ]});
            }
            
        }
        if(req.query.rate){
            var ordern = req.query.rate;
            if(ordern == 'ASC' || ordern == 'DESC') {
                animeDB = await Anime.findAll({order: [
                    ['animeRate', ordern] // ASC ou DESC
                ]});
            }
        }
    }
    res.render('pages/home', {animeDB});
}

export const newAnime = async (req: Request, res: Response) => {
    // let animeDB = await Anime.findAll();
    // console.log(animeDB);
    res.render('pages/form', {});
}

export const loadingNewAnime = async (req: Request, res: Response) => {

    // console.log('Req.File ---',req.file)
    // console.log('Req.Body.File ---',req.query.file1)
    // console.log('Req.Query.Name', req.query.name)
    // console.log('Req.Body.Name', req.body.name)

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
            addressImage1: '.'+filepath
        });
        await newAnime.save();

        await unlink(req.file.path);
    }
    
    res.redirect('/home');
}