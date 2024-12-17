function goToCard(cardNumber) {
    // Esconde todos os cards
    document.querySelectorAll('.cardentrar').forEach(card => {
        card.style.display = 'none';
    });

    // Mostra o card desejado
    document.getElementById(`card${cardNumber}`).style.display = 'flex';
}


function showImage() {
    var classSelect = document.getElementById('class');
    var classImage = document.getElementById('class-image');
    var selectedClass = classSelect.value;

    if (selectedClass === 'knight') {
        classImage.src = 'caminho/para/imagem_cavaleiro.jpg'; // Substitua pelo caminho da imagem do cavaleiro
        classImage.style.display = 'block';
    } else if (selectedClass === 'mage') {
        classImage.src = 'caminho/para/imagem_mago.jpg'; // Substitua pelo caminho da imagem do mago
        classImage.style.display = 'block';
    } else {
        classImage.style.display = 'none';
    }
}


document.querySelector('#btnlogin').addEventListener('click', logar)

function logar() {
    let nome_digitado = document.querySelector('#idnome').value
    let nome_salvo = ''
    let senha_digitada = document.querySelector('#senhalogin').value
    let senha_salva = ''
    let login = false

    fetch('user.json').then((response) => {
        return response.json()
    }).then((dados) => {
        dados.users.forEach((informacoes) => {
            nome_salvo = informacoes.idnome
            senha_salva = informacoes.senha

            console.log(nome_salvo+ " " + senha_salva)

            if (nome_digitado == nome_salvo & senha_digitada == senha_salva) {
                login = true
            }
            if (login) {
                document.querySelector("#result").innerHTML = `<p>Login Efetuado com sucesso!</p>`
                localStorage.setItem('nome',nome_digitado)
                window.location = '/Main/main.html'
            } else {
                document.querySelector("#result").innerHTML = `<p>Usuário ou/e senha Incorretos</p>`
            }
        })
    })
}