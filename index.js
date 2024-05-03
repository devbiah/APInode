const express = require('express'); 
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

var livros = []
app.get('/livros', (req, res) => {
    res.json(livros);
});

app.get('/livros/:nome', (req, res) => {
    const { nome } = req.params;
    const livro = livros.find(l => l.nome === nome);
    if (livro) {
        res.json(livro);
    }
    else {
        res.status(404).json({ message: 'Livro não encontrado.' })
    }
});
app.post('/livros', (req, res) => {
    const { nome, genero, anodepublicacao, autor } = req.body;
    const livro = { nome, genero, anodepublicacao, autor };
    livros.push(livro)
    res.status(201).json({ message: 'Livro cadastrado com sucesso!' })
})
app.put('/livros/:nome', (req, res) => {
    const { nome } = req.params;
    const { genero, anodepublicacao, autor } = req.body
    const livro = livros.find(l => l.nome === nome)
    if (livro) {
        livro.genero = genero || livro.genero;  
        livro.anodepublicacao = anodepublicacao || livro.anodepublicacao
        livro.autor = autor || livro.autor
        res.json({ message: 'Informações de livro atualizadas com sucesso' })
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' })
    }
})

app.delete('/livros/:nome', (req, res) => {
    const { nome } = req.params
    const livroIndex = livros.findIndex(l => l.nome === nome)
    if (livroIndex !== -1) {
        livros.splice(livroIndex, 1)
        res.json({ message: 'Livro excluído com sucesso!' })
    }
    else {
        res.status(404).json({ message: 'Livro não encontrado.' })
    }
})

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
