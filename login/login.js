function goToCard(cardNumber) {
  document.querySelectorAll(".cardentrar").forEach((card) => {
    card.style.display = "none";
  });
  document.getElementById(`card${cardNumber}`).style.display = "flex";
}

function logar() {
  let nome_digitado = document.querySelector("#idnome").value;
  let senha_digitada = document.querySelector("#senhalogin").value;
  let login = false;

  fetch("user.json")
    .then((response) => response.json())
    .then((dados) => {
      dados.users.forEach((informacoes) => {
        if (
          nome_digitado === informacoes.idnome &&
          senha_digitada === informacoes.senha
        ) {
          login = true;

          localStorage.setItem("nome", informacoes.nome);
          localStorage.setItem("idnome", informacoes.idnome);
          localStorage.setItem("classe", informacoes.classe);
          localStorage.setItem("nivel_classe", informacoes.nivel_classe);
        }
      });
      if (login) {
        document.querySelector(
          "#result"
        ).innerHTML = `<p>Login Efetuado com sucesso!</p>`;
        window.location.href = "../Main/main.html";
      } else {
        document.querySelector(
          "#result"
        ).innerHTML = `<p>Usuário ou/e senha Incorretos</p>`;
      }
    });
}
document.querySelector("#btnlogin").addEventListener("click", logar);
