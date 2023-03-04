import {PrismaClient} from "@prisma/client";
// import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export default{
    async createUser(req, res) {
        try {
            const {username, password} = req.body
        
            let user = await prisma.user.findUnique({
                where: {username}
            })
    
            if (user) {
                console.log("ja tem")
                return res.json({error: "usuário já existe"})
                
            }
            // const hashedPassword =  bcrypt.hashSync(password, 10)
        
    
            user = await prisma.user.create({
                data: {
                    username,
                    password,
                },
            })
        
            return res.json(user)
            
        } catch (error) {
            return res.json(error)
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
                return res.json("usuário não cadastrado")
            }

            const checkPass = user.password == password
            if (checkPass) {
                return res.json("usuário logado")
            }

            return res.json("usuário não encontrado")

        } catch (error) {
            return res.json(error)
        }
    }
}