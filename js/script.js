document.addEventListener("DOMContentLoaded", function() {
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const submitButton = document.getElementById('submit-btn');

    // Завантаження JSON файлу і виконання подальших дій
    fetch('questions.json')
        .then(response => response.json())
        .then(data => displayQuestions(data.questions))
        .catch(error => console.error('Помилка завантаження JSON файлу:', error));

    // Функція для відображення питань та варіантів відповідей
    function displayQuestions(questions) {
        questions.forEach((question, index) => {
            const questionElem = document.createElement('div');
            questionElem.innerHTML = `
                <p>${index + 1}. ${question.question}</p>
                <select id="question-${index}" class="answer-select">
                    ${question.answers.map((answer, answerIndex) => `
                        <option value="${answerIndex}">${answer.text}</option>
                    `).join('')}
                </select>
            `;
            quizContainer.appendChild(questionElem);
        });
    }

    // Обробник події натискання кнопки "Завершити тест"
    submitButton.addEventListener('click', function() {
        const answers = document.querySelectorAll('.answer-select');
        let score = 0;

        // Перевірка вибраних відповідей та підрахунок балів
        answers.forEach((select, index) => {
            const selectedAnswerIndex = parseInt(select.value);
            if (selectedAnswerIndex >= 0) {
                const correctAnswer = questions[index].answers[selectedAnswerIndex].correct;
                if (correctAnswer) {
                    score++;
                }
            }
        });

        // Відображення результатів тесту
        const resultText = `Ваш результат: ${score} з ${questions.length}`;
        resultContainer.innerHTML = `<p>${resultText}</p>`;
        resultContainer.style.display = 'block';
    });
});
