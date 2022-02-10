import express, { Request, Response, ErrorRequestHandler } from 'express';
import session from 'express-session';
import path from 'path';
import mustache from 'mustache-express';
import dotenv from 'dotenv';
import mainRoutes from './routes/index';
import cors from 'cors';
import { MulterError } from 'multer';
import passport from 'passport';
// import passportHelper from './helpers/passport' ;
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

dotenv.config();

const server = express();
server.use(cookieParser());
server.use(express.static("public"))
server.use(cors());
server.use(cors({
    origin:'*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
server.use(morgan('dev'))
server.use(session({secret: process.env.JWT_SECRET as string,
    resave: true,
    saveUninitialized: true
}));

server.set('view engine', 'mustache');
server.set('views', path.join(__dirname, 'views'));
server.engine('mustache', mustache());
server.use(express.json());
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));
server.use(passport.initialize());
// passport.use(passportHelper);

server.use(mainRoutes);

server.use((req: Request, res: Response)=>{
    res.status(404).send('Página não encontrada!');
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); //Bad Request;

    if(err instanceof MulterError) {
        res.json({ error: err.code });
    } else {
        res.json({ error: 'Ocorreu algum erro.' });
    }

}

server.use(errorHandler);
server.listen(process.env.PORT);

/* git push https://github.com/VitorLazzaretti/projetoAnimeSite main 

 server.use(passport.initialize());
    server.use(passport.session());

    passport.serializeUser((user: any, done)=> { ////
        done(null, user.id)
    });

    passport.deserializeUser( async (id, done) => {
        await User.findByPk(id as number, function(err, user) {
            done(err, user);
        });
    });

*/