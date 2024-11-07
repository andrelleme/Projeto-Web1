
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const filmes = [];

// Listar todos os filmes
app.get('/api/filmes', (req, res) => {
    res.json(filmes);
});

// Adicionar um novo filme
app.post('/api/filmes', (req, res) => {
    const { titulo, diretor, ano, genero } = req.body;
    const novoFilme = { id: filmes.length + 1, titulo, diretor, ano, genero };
    filmes.push(novoFilme);
    res.status(201).json(novoFilme);
});

// Atualizar um filme
app.put('/api/filmes/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, diretor, ano, genero } = req.body;
    const filme = filmes.find(f => f.id == id);
    if (filme) {
        filme.titulo = titulo;
        filme.diretor = diretor;
        filme.ano = ano;
        filme.genero = genero;
        res.json(filme);
    } else {
        res.status(404).json({ message: "Filme não encontrado" });
    }
});

// Deletar um filme
app.delete('/api/filmes/:id', (req, res) => {
    const { id } = req.params;
    const index = filmes.findIndex(f => f.id == id);
    if (index !== -1) {
        const filmeRemovido = filmes.splice(index, 1);
        res.json(filmeRemovido);
    } else {
        res.status(404).json({ message: "Filme não encontrado" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
