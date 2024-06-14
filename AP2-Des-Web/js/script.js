import { hex_sha512 } from "./sha512.js";

const alvo = 'b54f7f878e1f0fe8bcf64032efc5ad7f00ed1a34b6961d87ab710db6dadccbd8cbabab14ac2de13545a6e3daa71a4ceac70be745402ed3b62e1c65b7ba17c2e5';
const sal = "um segredo salgado";
const mensagem = document.getElementById('mensagem');

document.getElementById('btn_enviar').onclick = () => {
    const entrada = document.getElementById('senha').value;
    if (hex_sha512(entrada + sal) === alvo) {
        mensagem.innerHTML = 'Entrou!!!';
        sessionStorage.setItem('logado', '1');
        window.location.href = 'outra.html';
    } else {
        mensagem.innerHTML = 'Senha errada!';
    }
}
