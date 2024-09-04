<template>
    <div class="container card flex">
        <p class="score">Score: {{ store.score }} / {{ store.questions.length }}</p>
        <div class="flex score-display">
            <h2>Results</h2>
        </div>
        <ul>
            <li v-for="(result, index) in store.answeredQuestions" :key="index">
                <p>Question: {{ result.question }}</p>
                <p>Your answer: {{ result.userAnswer }} -
                    <span :class="{ correct: result.correct }">{{ result.correct ? 'Correct' : 'Incorrect' }}</span>
                </p>
            </li>
        </ul>
        <div class="button-group flex">
            <button class="button" @click="resetQuiz">Reset Quiz</button>
            <button class="button" @click="goToHomePage">Home Page</button>
            <button class="button" @click="goToScorePage">Scoreboard</button>
        </div>
    </div>
</template>

<script setup>
import { useQuizStore } from '@/stores/quizStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const store = useQuizStore();
const router = useRouter();

onMounted(() => {
    store.saveScore();
});

function goToScorePage() {
    router.push('/scoreboard');
}

function goToHomePage() {
    router.push("/");
}

function resetQuiz() {
    store.resetQuiz(store.selectedTopic);
    router.replace('/quiz');
}
</script>

<style scoped>
h2 {
    font-size: 3rem;
}

p {
    font-weight: 500;
}

.container {
    flex-direction: column;
    font-size: 1.5rem;
    padding: 3rem;
}

.button {
    margin: 1rem 0;
    max-width: 25rem;
}

.button-group {
    width: 25rem;
    flex-direction: column;
}

.score-display {
    justify-content: center;
}

.score {
    align-self: flex-end;
}
</style>