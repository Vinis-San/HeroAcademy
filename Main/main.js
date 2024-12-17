// script.js
function submitQuiz() {
    let score = 0;
    let totalQuestions = 5;
    let correctAnswers = ['a', 'b', 'c', 'd', 'b'];
    
    for (let i = 1; i <= totalQuestions; i++) {
        let selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedOption && selectedOption.value === correctAnswers[i - 1]) {
            score++;
        }
    }
    
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>Você Acertou ${score} de ${totalQuestions}.</p>`;
}

