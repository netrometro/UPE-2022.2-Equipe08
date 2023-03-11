import { PrismaClient } from "@prisma/client"
const prisma  = new PrismaClient();

export default {
    async createNote(req, res){
        const { text } = req.body;
        const {id} = req.params;

        try {
            const user = await prisma.user.findUnique({where:{id: parseInt(id)}})

            if(!user){
                return res.json({message: "Usuário inexistente"})
            }

            const note = await prisma.note.create({
                data:{
                    text,
                    userId: user.id
                },
            })

            return res.json(note)
        } catch (error) {
            return res.json(error.message)
            
        }
    },

    async getNotes(req, res){
        const {id} =  req.params;
        try {
            const notes = await prisma.note.findMany({
                where: {userId: parseInt(id)}
            });
            res.json(notes)
        } catch (error) {
            res.json(error.message)          
            
        }
    }, 

    async deleteNotes(req, res){
        try {
            const {id} = req.params;
            const user = await prisma.note.delete({
                where: {id: parseInt(id)},
            })
            res.json(user)            
        } catch (error) {
            return res.json(error)
        }

    }
}