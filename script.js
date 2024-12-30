let mode = '';
let questions = [];
let currentQuestionIndex = 0;

function setMode(selectedMode) {
    mode = selectedMode;
    document.getElementById('content').innerHTML = '';

    if (mode === 'tutor') {
        displayTutorMode();
    } else if (mode === 'tutee') {
        displayTuteeMode();
    }
}

function displayTutorMode() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Tutor Mode</h2>
        <input type="text" id="question" placeholder="Enter question">
        <input type="text" id="answer" placeholder="Enter answer">
        <button onclick="addQuestion()">Add Question</button>
        <div id="question-list"></div>
    `;
}

function displayTuteeMode() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Tutee Mode</h2>
        <div id="question-display"></div>
        <input type="text" id="answer-input" placeholder="Enter your answer">
        <button onclick="checkAnswer()">Submit Answer</button>
        <div id="feedback"></div>
    `;

    showQuestion();
}

function addQuestion() {
    const question = document.getElementById('question').value;
    const answer = document.getElementById('answer').value;
    questions.push({ question, answer, attempts: 0 });
    document.getElementById('question').value = '';
    document.getElementById('answer').value = '';
    updateQuestionList();
}

function updateQuestionList() {
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = questions.map((q, index) => `
        <div>${index + 1}. ${q.question} - ${q.answer}</div>
    `).join('');
}

function showQuestion() {
    if (questions.length === 0) {
        document.getElementById('question-display').innerText = 'No questions available.';
        return;
    }
    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    document.getElementById('question-display').innerText = questions[currentQuestionIndex].question;
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer-input').value;
    const feedback = document.getElementById('feedback');

    if (userAnswer === questions[currentQuestionIndex].answer) {
        feedback.innerText = 'Correct!';
        questions[currentQuestionIndex].attempts++;
        if (questions[currentQuestionIndex].attempts >= 3) {
            questions.splice(currentQuestionIndex, 1);
        }
    } else {
        feedback.innerText = 'Incorrect. Try again!';
        questions.push(questions[currentQuestionIndex]);
    }

    document.getElementById('answer-input').value = '';
    showQuestion();
}
