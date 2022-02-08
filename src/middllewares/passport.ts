import { Request, Response, NextFunction } from "express";
import passport from "passport";
import dotenv from 'dotenv';
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/User";
import JWT from "jsonwebtoken";

dotenv.config();

const notAuthorizedJson = { status: 401, message: 'Unauthorized' };

export const privateRoutes = async (req: Request, res: Response, next: NextFunction) => {
    console.log('cookies: ', req.cookies)
    console.log(ExtractJwt.fromAuthHeaderAsBearerToken())
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET as string,
    };   
        
    passport.use(new JWTStrategy(opts, async (payload, done)=> {
        const user = await User.findByPk(payload.id);
        return user ? done(null, user) : done(notAuthorizedJson, false)
    })); 
    const authFunction = passport.authenticate('jwt', (err, user) => {
        req.user = user;
        return user ? next() : next(notAuthorizedJson);
    });   
    authFunction(req, res, next);
}

export type newToken = {
    id: number,
    name: string,
    email: string,
    iat: number
}

export const privateRoute = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.loginToken
    try {
        const newToken: newToken | any = await JWT.verify(token, process.env.JWT_SECRET as string)
        console.log(newToken)
        if(!newToken) {
            res.status(400).redirect('/account/login')
        } else {
            try {
                const user = await User.findOne({where: {
                    id: newToken.id,
                    useremail: newToken.email
                }});
                if(user) {
                    next()
                } else { 
                    next(notAuthorizedJson)
                }
            } catch (error) {
                console.log('Erro')
                next(notAuthorizedJson);
            } 
        }
    } catch (err) {
        res.status(401).redirect('/')
    }
    
    
}