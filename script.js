const questions = [
    {
        question: 'Qual é o nome do famoso ponto turístico mostrado na imagem?',
        options: ['Torre Eiffel', 'Estátua da Liberdade', 'Cristo Redentor', 'Machu Picchu'],
        answer: 'Cristo Redentor',
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Vista_para_o_Cristo_Redentor.jpg'
    },
    {
        question: 'Onde está localizada a Torre Eiffel?',
        options: ['Paris', 'Nova York', 'Rio de Janeiro', 'Londres'],
        answer: 'Paris',
        image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Torre-Eiffel_%281%29.jpg'
    },
    {
        question: 'Qual é o nome do famoso monumento de pedra no Peru?',
        options: ['Machu Picchu', 'Stonehenge', 'Coliseu', 'Muralha da China'],
        answer: 'Machu Picchu',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/800px-Machu_Picchu%2C_Peru.jpg'
    },
    {
        question: 'Qual é o nome do grande muro histórico na China?',
        options: ['Muralha da China', 'Machu Picchu', 'Coliseu', 'Torre de Pisa'],
        answer: 'Muralha da China',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/The_Great_Wall_of_China_at_Jinshanling.jpg/1024px-The_Great_Wall_of_China_at_Jinshanling.jpg'
    },
    {
        question: 'Qual é o monumento famoso localizado em Roma, Itália?',
        options: ['Coliseu', 'Torre Eiffel', 'Estátua da Liberdade', 'Big Ben'],
        answer: 'Coliseu',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Exterior_of_the_Coliseum_Rome_Italy.jpg/800px-Exterior_of_the_Coliseum_Rome_Italy.jpg?20110620131543'
    }
];

let currentQuestionIndex = 0;
let attempt = 0;

function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    const question = questions[currentQuestionIndex];

    // Atualiza a imagem com base na pergunta atual
    document.querySelector('.story img').src = question.image;

    questionContainer.innerHTML = `
        <p>${question.question}</p>
        ${question.options.map(option => `
            <label>
                <input type="radio" name="question1" value="${option}"> ${option}
            </label>
        `).join('')}
    `;

    // Esconder o botão de tentativa novamente e mostrar o botão de resposta
    document.getElementById('retry-button').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
}

function checkAnswer() {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const selectedOption = document.querySelector('input[name="question1"]:checked');
    
    if (!selectedOption) {
        document.getElementById('result').innerText = 'Por favor, selecione uma resposta!';
        return;
    }

    const answer = selectedOption.value;
    const resultElement = document.getElementById('result');
    
    if (answer === correctAnswer) {
        resultElement.innerText = 'Correto! Você conhece bem os pontos turísticos!';
        resultElement.classList.add('correct');
        resultElement.classList.remove('incorrect');
        document.getElementById('next-button').style.display = 'block';
    } else {
        resultElement.innerText = 'Resposta errada. Tente novamente.';
        resultElement.classList.add('incorrect');
        resultElement.classList.remove('correct');
        attempt++;
        
        if (attempt < 2) {
            document.getElementById('retry-button').style.display = 'block';
        } else {
            resultElement.innerText = `Incorreto! A resposta correta é ${correctAnswer}.`;
            document.getElementById('retry-button').style.display = 'none';
            document.getElementById('next-button').style.display = 'block';
        }
    }

    resultElement.style.opacity = 1; // Ensure the result text is visible
}

function retryQuestion() {
    attempt = 0;
    displayQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        document.getElementById('result').innerText = 'Parabéns! Você completou todas as perguntas!';
        document.getElementById('next-button').style.display = 'none';
    }
}

// Initialize
displayQuestion();
