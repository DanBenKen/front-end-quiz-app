<template>
    <div class="container flex card">
        <h1>Front-end Quiz</h1>
        <span :class="{ error: true, visible: errorMessage }">{{ errorMessage }}</span>
        <select class="custom-select" v-model="selectedTopic">
            <option disabled value="">Select a topic</option>
            <option v-for="topic in topics" :key="topic" :value="topic">{{ topic }}</option>
        </select>
        <div class="button-group flex">
            <button class="button" @click="startQuiz">Start Quiz</button>
            <button class="button" @click="goToScorePage">Scoreboard</button>
        </div>
        <div class="container-pallette flex">
            <div class="flex">
                <div class="color" @click="setThemeColors('#264653', '#ffffff', '#264653')"><span>#264653</span></div>
                <div class="color" @click="setThemeColors('#2A9D8F', '#ffffff', '#2A9D8F')"><span>#2A9D8F</span></div>
                <div class="color" @click="setThemeColors('#E9C46A', '#000000', '#E9C46A')"><span>#E9C46A</span></div>
                <div class="color" @click="setThemeColors('#F4A261', '#000000', '#F4A261')"><span>#F4A261</span></div>
                <div class="color" @click="setThemeColors('#E76F51', '#000000', '#E76F51')"><span>#E76F51</span></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useQuizStore } from '@/stores/quizStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const store = useQuizStore();
const router = useRouter();
const errorMessage = ref('');
const selectedTopic = ref('');

const topics = ['HTML', 'CSS', 'Bootstrap', 'Vue'];

function setThemeColors(background, font, button) {
    store.selectedBackgroundColor = background;
    store.selectedFontColor = font;
    store.selectedButtonColor = button;
}

function goToScorePage() {
    router.push('/scoreboard');
}

function startQuiz() {
    if (!selectedTopic.value) {
        errorMessage.value = 'Please select a topic before starting the quiz.';
        return;
    }
    errorMessage.value = '';

    store.resetQuiz(selectedTopic.value);

    router.push('/quiz');
}
</script>

<style scoped>
h1 {
    font-size: 4rem;
    margin-bottom: 0;
}

input {
    margin-left: 2rem;
}

.container {
    width: 45rem;
    flex-direction: column;
    padding: 5rem;
}

.theme {
    margin-top: 5rem;
    align-self: flex-end;
}

.button {
    width: 25rem;
}

.button-group {
    flex-direction: column;
    gap: 2.5rem;
}

select {
    border-radius: 1rem;
    border: 0;
    border-bottom: 1px solid gray;
    padding: 1rem;
    margin-bottom: 4rem;
    font-size: 2rem;
}

select:hover,
select:focus,
select:active,
select:checked {
    outline: none;
}

select option {
    font-size: 1.5rem;
}

.error {
    color: red;
    display: block;
    font-size: 1.2rem;
    margin-bottom: 1.3rem;
    min-height: 2rem;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease, visibility 0.5s ease;
}

.error.visible {
    opacity: 1;
    visibility: visible;
}

.container-pallette {
    margin-top: 5rem;
    border-radius: 1em;
    overflow: hidden;
    box-shadow: 0 10px 20px #dbdbdb;
    font-family: sans-serif;
}

.color {
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    letter-spacing: 1px;
    transition: flex 0.1s linear;
    cursor: pointer;
}

.color span {
    opacity: 0;
    transition: opacity 0.1s linear;
}

.color:nth-child(1) {
    background: #264653;
}

.color:nth-child(2) {
    background: #2a9d8f;
}

.color:nth-child(3) {
    background: #e9c46a;
}

.color:nth-child(4) {
    background: #f4a261;
}

.color:nth-child(5) {
    background: #e76f51;
}

@media screen and (max-width: 576px) {
    .container {
        width: 100%;
        flex-direction: column;
        padding: 5rem;
    }

    h1  {
        font-size: 3rem;
    }
}
</style>