import {compare} from 'bcrypt';
import {sign}  from 'jsonwebtoken';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();


export class AuthController {
    async authenticate (req, res) {
        const {username, password} = req.body;

        const user = await prisma.user.findUnique({
            where: {username}
        })

        if(!user) {
            return res.json({error: "user not found"})
        }
        
        const passwd = await compare(password, user.password)

        if (!passwd) {
            return res.json({error: "invalid password"})
        }

        const token = sign({id: user.id}, "secret", {expiresIn: "1h"})

        const {id} = user;
        return res.json({user:{id, username}, token})
    }
}
