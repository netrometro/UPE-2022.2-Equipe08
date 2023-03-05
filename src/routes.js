import {Router} from 'express';

import UserController from './controller/UserController';
import  {AuthController}  from './controller/AuthController';
import { AuthMiddleware } from './middlewares/auth';

const router = Router();
const auth = new AuthController();

router.post("/login", auth.authenticate)
router.get("/home", UserController.findUsers)
router.post('/register', UserController.createUser)
router.get("/users",  UserController.findUsers)
router.put("/update/:id", AuthMiddleware, UserController.updateUser)
router.delete("/delete/:id", UserController.deleteUser)


export {router};