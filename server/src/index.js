const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const noteRoutes = require('./routes/noteRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world');
});
app.use('/api/notes', noteRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server Running`);
});