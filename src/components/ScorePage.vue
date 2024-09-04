<template>
    <div class="container card">
        <h2>Previous Scores</h2>
        <ul>
            <li v-for="(score, index) in previousScores.reverse()" :key="index">
                <span>{{ score.topic }} - {{ score.score }}</span>
            </li>
        </ul>
        <button class="button" @click="goToHomePage">Home Page</button>
    </div>
</template>

<script setup>
import router from '@/router/routes';
import { useQuizStore } from '@/stores/quizStore';
import { computed, onMounted, ref } from 'vue';

const store = useQuizStore();

const highScores = ref([]);

const previousScores = computed(() => {
    return highScores.value
        .slice(-5);
});

onMounted(loadHighScores);

function goToHomePage() {
    router.push('/');
}

function loadHighScores() {
    store.loadHighscores();
    highScores.value = store.highScores;
}
</script>

<style scoped>
.container {
    justify-content: start;
    flex-direction: column;
    font-size: 2.5rem;
    height: 50rem;
    padding: 5rem;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

span {
    align-self: flex-end;
}

.button {
    margin-top: auto;
    max-width: 20rem;
}

@media screen and (max-width: 576px) {
    .container {
        font-size: 2.2rem;
        justify-content: start;
        flex-direction: column;
        font-size: 2.5rem;
        height: 50rem;
        padding: 5rem;
    }
}
</style>