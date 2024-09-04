<template>
    <div class="container flex card">
        <p>Current question: {{ store.currentQuestionIndex + 1 }} / 5</p>
        <h2 >{{ store.currentQuestion.question }}</h2>
        <ol class="flex">
            <li v-for="(answer, index) in store.currentQuestion.answer || []" :key="index" @click="selectAnswer(answer)">
                {{ answer }}
            </li>
        </ol>
    </div>
</template>

<script setup>
import router from '@/router/routes';
import { useQuizStore } from '@/stores/quizStore';

const store = useQuizStore();

function nextQuestion() {
    if (store.currentQuestionIndex < store.questions.length - 1) {
        store.currentQuestionIndex++;
    } else {
        router.push('/results');
    }
}

function selectAnswer(answer) {
    const currentQuestion = store.questions[store.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    if (answer === currentQuestion.correctAnswer) {
        store.score++;
    }

    store.answeredQuestions.push({
        question: currentQuestion.question,
        userAnswer: answer,
        correct: isCorrect,
    });

    nextQuestion();
}
</script>

<style scoped>
h2 {
    text-align: center;
    font-size: 2.3rem;
}

ol {
    align-items: start;
    flex-direction: column;
    padding-left: 4rem;
    margin-bottom: auto;
}

li {
    font-size: 2rem;
    margin: 1rem 0;
}

li:hover {
    text-decoration: underline;
    cursor: pointer;
}

p {
    font-size: 1.5rem;
    align-self: flex-end;
    margin-bottom: auto;
}

.container {
    flex-direction: column;
    justify-content: center;
    align-items: start;
    padding: 4rem;
    width: 50rem;
    max-width: 50rem;
    height: 60rem;
}

.button-next-question {
    align-self: center;
    margin: 3rem 0;
    max-width: 25rem;
}

@media screen and (max-width: 576px) {
    .container {
        width: 100%;
    }

    li {
        font-size: 1.7rem;
        margin: 1rem 0;
    }
}
</style>