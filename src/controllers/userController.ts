import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { User } from "../models/User";

export const cad = async (req: Request, res: Response) => {
    res.render('pages/cadastro', {});
}

export const cadPost = async (req: Request, res: Response) => {
    const {userEmail, userPassword} = req.body
    if(userEmail && userPassword) {
        if(await User.findOne({where: {userEmail: userEmail}})) {
            res.render('pages/index', { message: 'Este email já está sendo utilizado' });
        } else {
            var hashPassword = await bcrypt.hash(userPassword, 10)
            console.log(hashPassword);
            console.log(userPassword);
            await User.create({
                userEmail,
                userPassword: hashPassword
            });
            res.status(201).redirect('/account/login');
        }
    } else {
        res.status(400).redirect('/account/cadastro')
    }
}

export const login = async (req: Request, res: Response) => {
    res.render('pages/login', {});
}

