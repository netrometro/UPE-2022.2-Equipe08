import {PrismaClient} from "@prisma/client";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export default{
    async createUser(req, res) {
        try {
            const {username, password} = req.body
        
            let user = await prisma.user.findUnique({
                where: {username}
            })
    
            if (user) {
                return res.json({error: "usuário já existe"})
                
            }
             const hashedPassword = await bcrypt.hash(password, 10)
        
    
            user = await prisma.user.create({
                data: {
                    username,
                    password: hashedPassword,
                },
            })
        
            
            return res.json({message: "Usuário criado com suceeso!"})

            
        } catch (error) {
            return res.json(error)
        }
    },

    async findUsers(req, res){
        try {
            const users =  await prisma.user.findMany();
            res.json(users);
            
        } catch (error) {
            res.json(error)
        }
    },
    
    async findUser(req, res){
        try{
            const {username, password} = req.body;

            const user = await prisma.user.findUnique({
                where: username
            })

            res.json(user);
        } catch (error){
            res.json(error);
        }
    },

    async Login(req, res){
        try {
            const {username, password} = req.body

            let user = await prisma.user.findUnique({ 
               where:{
                username
               }
            })
            
            if (!user) {
                return res.json("Usuário não cadastrado")
            }

            const checkPass = user.password == password
            if (!checkPass) {
                return res.json("Senha inválida")
            }
            
            const token =  jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"})
            return res.json({user:{user}, token})


        } catch (error) {
            return res.json(error)
        }
    },

    async updateUser(req, res){
        try{
            const {id} = req.params;
            const {username, password} = req.body;

            let user = await prisma.user.findUnique({where: {id: parseInt(id)}})

            if (!user) {
                return res.status(401).json({error: "Não foi possível encontrar esse usuário"})
            }

            user = await prisma.user.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    username, 
                    password
                } 
            })

            res.status(200).json({user})
        }
        catch(error){
            res.status(400).json({error})

        }

    },

    async deleteUser (req, res) {
        try {
            const {id} = req.params;
            const user = await prisma.user.delete({
                where: {
                    id: parseInt(id),
                },
            })
            res.json(user)
        } catch(error){
            return res.json(error)

        }
    }


}
