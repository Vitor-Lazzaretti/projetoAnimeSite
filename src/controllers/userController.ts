import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt'
import { User, UserInstance } from "../models/User";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const loginError = {
    message: 'Email ou senha incorreto(s)',
    show: true
};

export function cookies(req: Request, res: Response, next: NextFunction) {
    const { cookies } = req
    return cookies;
}


function createToken(user: UserInstance) {
    return jwt.sign({id: user.id, name: user.userName, email: user.userEmail}, process.env.JWT_SECRET as string);
}

export const cad = async (req: Request, res: Response) => {
    res.render('pages/cadastro', {});
    
}

export const cadPost = async (req: Request, res: Response) => {
    const {userEmail, userPassword, userName} = req.body
    if(userEmail && userPassword && userName) {
        if(await User.findOne({where: {userEmail: userEmail}})) {
            console.log('está conta já existe')
            res.status(400).render('pages/cadastro', { message: 'Esta conta já existe! <a href=""> Fazer Login? </a>' });
        } else {
            var hashPassword = await bcrypt.hash(userPassword, 10)
            let newUser = await User.create({
                userEmail,
                userPassword: hashPassword,
                userName
            });
            res.cookie('loginToken', createToken(newUser));
            res.status(201).redirect('/home');
        }
    } else {
        res.status(400).redirect('/account/cadastro')
    }
}

export const login = async (req: Request, res: Response) => {
    res.render('pages/login', {});
}

export const loginPost = async (req: Request, res: Response) => {
    const { userEmail, userPassword } = req.body;
    
    const user = await User.findOne({where: {userEmail: userEmail}});
    if(user) {
        const hashPassword = user.userPassword
        const verifyPassword = await bcrypt.compare(userPassword, hashPassword)
        if(verifyPassword) {
            res.cookie('loginToken', createToken(user));
            res.status(200).redirect(`/home`);
            // res.status(200).header(`Bearer ${createToken(user)}`).redirect('/home');
        } else {
            res.status(400).render('pages/login', loginError);
        };
    } else {
        res.status(400).render('pages/login', loginError);
    }
    
}

export const logout = async (req: Request, res: Response) => {
    req.cookies.loginToken = ''
    res.redirect('/account/login');
}


