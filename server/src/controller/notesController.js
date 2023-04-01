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

    },

    async archiveNote(req, res) {
        const { id } = req.params;
        const { userId } = req;
      
        try {
          const note = await prisma.note.findUnique({
            where: { id: parseInt(id) },
            select: { userId: true, isArchived: true },
          });
      
          if (!note || note.userId !== userId) {
            return res.status(404).json({ message: "Nota não encontrada" });
          }
      
          const updatedNote = await prisma.note.update({
            where: { id: parseInt(id) },
            data: { isArchived: true },
          });
      
          res.json(updatedNote);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Erro ao arquivar nota" });
        }
      },
      
      async unarchiveNote(req, res) {
        const { id } = req.params;
        const { userId } = req;
      
        try {
          const note = await prisma.note.findUnique({
            where: { id: parseInt(id) },
            select: { userId: true, isArchived: false },
          });
      
          if (!note || note.userId !== userId) {
            return res.status(404).json({ message: "Nota não encontrada" });
          }
      
          const updatedNote = await prisma.note.update({
            where: { id: parseInt(id) },
            data: { isArchived: false },
          });
      
          res.json(updatedNote);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Erro ao arquivar nota" });
        }
      },

      async trashNotes(req, res) {
        const { id } = req.params;
        const { userId } = req;
      
        try {
          const note = await prisma.note.findUnique({
            where: { id: parseInt(id) },
            select: { userId: true, isDeleted: true },
          });
      
          if (!note || note.userId !== userId) {
            return res.status(404).json({ message: "Nota não encontrada" });
          }
      
          const updatedNote = await prisma.note.update({
            where: { id: parseInt(id) },
            data: { isDeleted: true },
          });
      
          res.json(updatedNote);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Erro ao deletar nota" });
        }
      },
      
      async recoverNote(req, res) {
        const { id } = req.params;
        const { userId } = req;
      
        try {
          const note = await prisma.note.findUnique({
            where: { id: parseInt(id) },
            select: { userId: true, isDeleted: false },
          });
      
          if (!note || note.userId !== userId) {
            return res.status(404).json({ message: "Nota não encontrada" });
          }
      
          const updatedNote = await prisma.note.update({
            where: { id: parseInt(id) },
            data: { isDeleted: false },
          });
      
          res.json(updatedNote);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Erro ao recuperar nota" });
        }
      },

async fixedNotes(req, res) {
  const { id } = req.params;
  const { userId } = req;

  try {
    const note = await prisma.note.findUnique({
      where: { id: parseInt(id) },
      select: { userId: true, isFixed: true },
    });

    if (!note || note.userId !== userId) {
      return res.status(404).json({ message: "Nota não encontrada" });
    }

    const updatedNote = await prisma.note.update({
      where: { id: parseInt(id) },
      data: { isFixed: true },
    });

    res.json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar nota" });
  }
},

async notFixedNotes(req, res) {
  const { id } = req.params;
  const { userId } = req;

  try {
    const note = await prisma.note.findUnique({
      where: { id: parseInt(id) },
      select: { userId: true, isFixed: false },
    });

    if (!note || note.userId !== userId) {
      return res.status(404).json({ message: "Nota não encontrada" });
    }

    const updatedNote = await prisma.note.update({
      where: { id: parseInt(id) },
      data: { isFixed: false },
    });

    res.json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao recuperar nota" });
  }
}
}
