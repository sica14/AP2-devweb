const urlParams = new URLSearchParams(window.location.search);
const atletaId = parseInt(urlParams.get('id'));

document.getElementById('btn_voltar').onclick = () => {
    window.history.back();
};

const detalhesJogador = document.getElementById('detalhes_jogador');
detalhesJogador.innerHTML = `<div class="loading">Carregando...</div>`;

if (isNaN(atletaId)) {
    detalhesJogador.innerHTML = `
        <pre>${JSON.stringify({
            "detail": [
                {
                    "type": "int_parsing",
                    "loc": ["path", "atleta_id"],
                    "msg": "Input should be a valid integer, unable to parse string as an integer",
                    "input": "${urlParams.get('id')}",
                    "url": "https://errors.pydantic.dev/2.2/v/int_parsing"
                }
            ]
        }, null, 2)}</pre>
    `;
} else {
    fetch(`https://botafogo-atletas.mange.li/2024-1/${atletaId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(atleta => {
            if (!atleta || atleta.detail) {
                detalhesJogador.innerHTML = `
                    <pre>${JSON.stringify({
                        "detail": [
                            {
                                "type": "not_found",
                                "loc": ["path", "atleta_id"],
                                "msg": "Athlete not found",
                                "input": "${atletaId}",
                                "url": "https://errors.pydantic.dev/2.2/v/not_found"
                            }
                        ]
                    }, null, 2)}</pre>
                `;
            } else {
                detalhesJogador.innerHTML = `
                    <img src="${atleta.imagem}" alt="${atleta.nome}">
                    <div class="info">
                        <h1>${atleta.nome}</h1>
                        <p>${atleta.detalhes ? atleta.detalhes : ''}</p>
                        <ul>
                            <li><strong>Jogos pelo Botafogo:</strong> ${atleta.n_jogos} JOGOS</li>
                            <li><strong>Posição:</strong> ${atleta.posicao}</li>
                            <li><strong>Naturalidade:</strong> ${atleta.naturalidade}</li>
                            <li><strong>Nascimento:</strong> ${atleta.nascimento}</li>
                            <li><strong>Altura:</strong> ${atleta.altura}</li>
                        </ul>
                    </div>
                `;
            }
        })
        .catch(error => {
            detalhesJogador.innerHTML = `
                <pre>${JSON.stringify({
                    "detail": [
                        {
                            "type": "fetch_error",
                            "loc": ["path", "atleta_id"],
                            "msg": "Error fetching athlete details",
                            "input": "${atletaId}",
                            "url": "https://errors.pydantic.dev/2.2/v/fetch_error"
                        }
                    ]
                }, null, 2)}</pre>
            `;
        });
}
