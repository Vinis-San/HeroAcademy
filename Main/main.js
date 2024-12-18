document.addEventListener('DOMContentLoaded', async (event) => {
    const nomeUsuario = localStorage.getItem('nome');
    const idNomeUsuario = localStorage.getItem('idnome');
    const classeUsuario = localStorage.getItem('classe');
    const nivelClasseUsuario = localStorage.getItem('nivel_classe');

    console.log('Dados do usuário:', nomeUsuario, idNomeUsuario, classeUsuario, nivelClasseUsuario); // Log para depuração

    if (nomeUsuario && idNomeUsuario && classeUsuario && nivelClasseUsuario) {
        document.querySelector('#nomeusuario').innerHTML = nomeUsuario;
        document.querySelector('#idnomeusuario').innerHTML = idNomeUsuario;
        document.querySelector('#classeusuario').innerHTML = `Classe: ${classeUsuario}`;
        document.querySelector('#nivelclasseusuario').innerHTML = `Nível: ${nivelClasseUsuario}`;

        const classImage = document.getElementById('fotousuario');
        if (classeUsuario === 'Cavaleiro') {
            classImage.src = '../imagens/knight.jpg'; // Substitua pelo caminho da imagem do cavaleiro
        } else if (classeUsuario === 'Mago') {
            classImage.src = '../imagens/magic.jpg'; // Substitua pelo caminho da imagem do mago
        }
    }

    const questList = document.querySelectorAll('#quest-list li');
    questList.forEach(quest => {
        quest.addEventListener('click', () => {
            let currentXP = parseInt(document.querySelector('#xp').innerHTML);
            const questXP = parseInt(quest.getAttribute('data-xp'));
            currentXP += questXP;
            document.querySelector('#xp').innerHTML = currentXP;
            quest.style.textDecoration = 'line-through';
            quest.style.color = 'gray';
        });
    });
});

function ajustarNivelUsuario(usuario, respostasCorretas) {
    switch (respostasCorretas) {
        case 5:
            usuario.nivel_classe = usuario.classe === "Mago" ? "Mestre dos Magos" : "Mestre dos Cavaleiros";
            break;
        case 4:
            usuario.nivel_classe = usuario.classe === "Mago" ? "Arquimago" : "Cavaleiro de Ouro";
            break;
        case 3:
            usuario.nivel_classe = usuario.classe === "Mago" ? "Mago Supremo" : "Cavaleiro de Prata";
            break;
        case 2:
            usuario.nivel_classe = usuario.classe === "Mago" ? "Mago" : "Cavaleiro";
            break;
        default:
            usuario.nivel_classe = usuario.classe === "Mago" ? "Aprendiz de Mago" : "Escudeiro";
    }

    console.log('Nível ajustado do usuário:', usuario); // Log para depuração

    return usuario;
}

async function submitQuiz() {
    let score = 0;
    const totalQuestions = 5;
    const correctAnswers = ['a', 'b', 'c', 'd', 'b'];

    for (let i = 1; i <= totalQuestions; i++) {
        let selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedOption && selectedOption.value === correctAnswers[i - 1]) {
            score++;
        }
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>Você Acertou ${score} de ${totalQuestions}.</p>`;

    const storedUserName = localStorage.getItem('idnome');
    const users = await carregarUsuarios();
    const currentUser = users.find(user => user.idnome === storedUserName);

    console.log('Usuário atual encontrado:', currentUser); // Log para depuração

    if (currentUser) {
        const usuarioAtualizado = ajustarNivelUsuario(currentUser, score);
        // Atualize o localStorage com o novo nível de classe do usuário
        localStorage.setItem('nivel_classe', usuarioAtualizado.nivel_classe);
        // Atualize a exibição na página
        document.querySelector('#nivelclasseusuario').innerHTML = `LVL ${score + 1}. ${usuarioAtualizado.nivel_classe}`;
    }
}

async function carregarUsuarios() {
    try {
        const response = await fetch('../login/user.json'); // Atualizado para o caminho correto
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Dados carregados do user.json:', data); // Log para depuração
        return data.users;
    } catch (error) {
        console.error('Erro ao carregar usuários:', error); // Log de erro para depuração
    }
}
