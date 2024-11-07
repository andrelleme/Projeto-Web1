
const listaFilmes = document.getElementById('filme-lista');
const formFilme = document.getElementById('filme-form');

// Função para listar filmes
async function listarFilmes() {
    listaFilmes.innerHTML = '';
    const resposta = await fetch('/api/filmes');
    const filmes = await resposta.json();
    filmes.forEach(filme => {
        const li = document.createElement('li');
        li.textContent = `${filme.titulo} - ${filme.diretor} (${filme.ano}) - ${filme.genero}`;
        listaFilmes.appendChild(li);
    });
}

// Função para adicionar um novo filme
formFilme.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const diretor = document.getElementById('diretor').value;
    const ano = document.getElementById('ano').value;
    const genero = document.getElementById('genero').value;

    await fetch('/api/filmes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, diretor, ano, genero })
    });
    listarFilmes();
    formFilme.reset();
});

listarFilmes();
