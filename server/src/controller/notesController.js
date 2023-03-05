const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createNote = async (req, res) =>{
    try{
        const{title, body, userId} = req.body;

        const note = await prisma.user.create({
            data:{
                title,
                body,
                userId: Number(userId)
            }
        });
            
        res.json(note);
    }   catch (error) {
        console.error(error);
        res.status(500).json({error: "deu erro"});
    }
};

const getAllNotes = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await prisma.note.findMany({
            where: {
                id: userId,
            },
        });
        res.json(note);
    }   catch (error) {
        console.error(error);
        res.status(500).json({error: "deu ruim"});
    }
};

module.exports = {
    createNote,
    getAllNotes
}