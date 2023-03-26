import {Router} from 'express';

import UserController from './controller/UserController';
import notesController from './controller/notesController';
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

router.post("/notes/user/:id", notesController.createNote);
router.get("/notes/user/:id", notesController.getNotes) 
router.delete("/notes/delete/:id", notesController.deleteNotes)
router.put("/notes/archive/:id", AuthMiddleware, notesController.archiveNote);
router.put("/notes/unarchive/:id", AuthMiddleware, notesController.unarchiveNote);
router.put("/notes/trash/:id", AuthMiddleware, notesController.trashNotes);
router.put("/notes/recover/:id", AuthMiddleware, notesController.recoverNote);




export {router};

