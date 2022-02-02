import { Router } from "express";
import multer from "multer";

import * as AnimeController from '../controllers/animeController'
import * as UserController from '../controllers/userController'

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+'-'+Math.floor(Math.random()*99999999)+'-'+Date.now());
    },
});

const upload = multer({
    fileFilter: (req, file, cb) => {
        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
        console.log('Info: ', file)
        cb(null, allowed.includes(file.mimetype));
    },
    storage: storageConfig,
    limits: {
        fieldNameSize: 800,
        fieldSize: 3355444000
    }
});

const router = Router();

router.get('/account/cadastro', UserController.cad);
router.post('/account/cadastro', UserController.cadPost);
router.get('/account/login', UserController.login);
router.get('/home', AnimeController.home);
router.get('/new-anime', AnimeController.newAnime);
router.post('/loading-new-anime', upload.single('descImage'), AnimeController.loadingNewAnime);


export default router;