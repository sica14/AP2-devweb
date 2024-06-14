if (!sessionStorage.getItem('logado')) {
    window.location.href = '/';
}

document.getElementById('btn_sair').onclick = () => {
    sessionStorage.removeItem('logado');
    window.location.href = '/';
};

const url = "https://botafogo-atletas.mange.li";
let lista_jogadores = [];

const container = document.getElementById('atletas_list');
const searchBar = document.getElementById('searchBar');

const handleClick = (e) => {
    const card = e.target.closest('article');
    const dados = card.dataset;

    for (const p in dados) {
        document.cookie = `${p}=${dados[p]}`;
    }

    localStorage.setItem('atleta', JSON.stringify(dados));
    window.location.href = `detalhes.html?id=${dados.sourceId}`;
};

const constroiCard = (atleta) => {
    const divCard = document.createElement('article');
    divCard.dataset.id = atleta.id;
    divCard.dataset.descricao = atleta.descricao;
    divCard.dataset.nome = atleta.nome;
    divCard.dataset.nomeCompleto = atleta.nome_completo;
    divCard.dataset.imagem = atleta.imagem;
    divCard.dataset.posicao = atleta.posicao;
    divCard.dataset.elenco = atleta.elenco;
    divCard.dataset.nascimento = atleta.nascimento;
    divCard.dataset.altura = atleta.altura;
    divCard.dataset.sourceId = atleta.id;

    const imagem = document.createElement('img');
    imagem.src = atleta.imagem;
    imagem.alt = atleta.nome;

    const titulo = document.createElement('div');
    titulo.className = 'titulo';
    titulo.innerHTML = atleta.nome;

    const detalhes = document.createElement('div');
    detalhes.className = 'detalhes';

    const btnSaibaMais = document.createElement('button');
    btnSaibaMais.innerText = 'Saiba Mais';
    btnSaibaMais.onclick = handleClick;

    detalhes.appendChild(titulo);
    detalhes.appendChild(btnSaibaMais);

    divCard.appendChild(imagem);
    divCard.appendChild(detalhes);

    container.appendChild(divCard);
};

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};

const renderizarJogadores = (jogadores) => {
    container.innerHTML = '';
    jogadores.forEach(atleta => {
        constroiCard(atleta);
    });
};

document.getElementById('filter_all').onclick = () => {
    container.innerHTML = `<div class="loading">Carregando...</div>`;
    pega_json(`${url}/2024-1/all`).then(lista => {
        lista_jogadores = lista;
        renderizarJogadores(lista);
    });
};

document.getElementById('filter_masc').onclick = () => {
    container.innerHTML = `<div class="loading">Carregando...</div>`;
    pega_json(`${url}/2024-1/masculino`).then(lista => {
        lista_jogadores = lista;
        renderizarJogadores(lista);
    });
};

document.getElementById('filter_fem').onclick = () => {
    container.innerHTML = `<div class="loading">Carregando...</div>`;
    pega_json(`${url}/2024-1/feminino`).then(lista => {
        lista_jogadores = lista;
        renderizarJogadores(lista);
    });
};

document.getElementById('filter_select').onchange = (e) => {
    container.innerHTML = `<div class="loading">Carregando...</div>`;
    const valor = e.target.value;
    if (valor === 'all') {
        pega_json(`${url}/2024-1/all`).then(lista => {
            lista_jogadores = lista;
            renderizarJogadores(lista);
        });
    } else if (valor === 'masculino') {
        pega_json(`${url}/2024-1/masculino`).then(lista => {
            lista_jogadores = lista;
            renderizarJogadores(lista);
        });
    } else if (valor === 'feminino') {
        pega_json(`${url}/2024-1/feminino`).then(lista => {
            lista_jogadores = lista;
            renderizarJogadores(lista);
        });
    }
};

searchBar.onkeyup = (e) => {
    const valor = e.target.value.toLowerCase();
    const resultado = lista_jogadores.filter(
        elemento => elemento.nome.toLowerCase().includes(valor)
    );
    renderizarJogadores(resultado);
};

container.innerHTML = `<div class="loading">Carregando...</div>`;
pega_json(`${url}/2024-1/all`).then(lista => {
    lista_jogadores = lista;
    renderizarJogadores(lista);
});
