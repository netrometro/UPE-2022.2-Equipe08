import {Router} from 'express';

import UserController from './controller/UserController';

const router = Router();

router.post('/register', UserController.createUser)
router.post('/login', UserController.Login)

export {router};