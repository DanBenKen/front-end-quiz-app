import { watch, ref, computed } from "vue";
import { defineStore } from "pinia";

export const useQuizStore = defineStore("quiz", () => {
  const questions = ref([]);
  const currentQuestionIndex = ref(0);
  const answeredQuestions = ref([]);
  const score = ref(0);
  const highScores = ref([]);
  const selectedTopic = ref('');

  let selectedBackgroundColor = ref('');
  let selectedFontColor = ref('');
  let selectedButtonColor = ref('');

  const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);

  watch(selectedBackgroundColor, (newColor) => {
    document.documentElement.style.setProperty('--background-color', newColor);
  });

  watch(selectedFontColor, (newColor) => {
    document.documentElement.style.setProperty('--font-color', newColor);
  });

  watch(selectedBackgroundColor, (newColor) => {
    document.documentElement.style.setProperty('--button-color', newColor);
  });

  return {
      score,
      questions,
      currentQuestionIndex,
      answeredQuestions,
      currentQuestion,
      selectedTopic,
      highScores,
      selectedBackgroundColor,
      selectedFontColor,
      selectedButtonColor,
      loadQuestions,
      loadHighscores,
      resetQuiz,
      saveScore,
  };

  function resetQuiz(topic) {
    currentQuestionIndex.value = 0
    score.value = 0;
    answeredQuestions.value = [];
    loadQuestions(topic);
  }

  function saveScore() {
    const newScore = {
      topic: selectedTopic.value,
      score: score.value
    };

    const storedScores = JSON.parse(localStorage.getItem('highScores')) || [];
    storedScores.push(newScore);
    localStorage.setItem('highScores', JSON.stringify(storedScores));
    loadHighscores();
  }

  function loadHighscores() {
    highScores.value = JSON.parse(localStorage.getItem('highScores')) || [];
  }

  function loadQuestions(topic) {
    selectedTopic.value = topic;

    const quizQuestions = {
        Vue: [
          { 
            question: "What is Vue?",
            answer: ["JavaScript framework", "CSS library", "HTML editor"],
            correctAnswer: "JavaScript framework",
          },
          { 
            question: "What is v-model?",
            answer: ["Two-way binding", "Event handling", "Data fetching"],
            correctAnswer: "Two-way binding",
          },
          { 
            question: "What is the purpose of v-for in Vue.js?",
            answer: ["Looping through arrays or objects", "Event handling", "Two-way data binding"],
            correctAnswer: "Looping through arrays or objects",
          },
          { 
            question: "What is the Vue instance lifecycle hook that runs after the component is mounted?",
            answer: ["mounted", "created", "updated"],
            correctAnswer: "mounted",
          },
          { 
            question: "Which directive is used for conditionally rendering elements in Vue?",
            answer: ["v-if", "v-for", "v-bind"],
            correctAnswer: "v-if",
          },
          { 
            question: "How do you pass data from a parent to a child component in Vue?",
            answer: ["Using props", "Using data binding", "Using state management"],
            correctAnswer: "Using props",
          },
          { 
            question: "Which method is used to listen for events in Vue?",
            answer: ["v-on", "v-bind", "v-model"],
            correctAnswer: "v-on",
          },
          { 
            question: "What is Vue Router used for?",
            answer: ["Handling state management", "Creating routes and navigation", "Managing styles"],
            correctAnswer: "Creating routes and navigation",
          },
          { 
            question: "How can you define a reactive property in Vue?",
            answer: ["Using ref or reactive", "Using computed properties", "Using data attributes"],
            correctAnswer: "Using ref or reactive",
          },
          { 
            question: "What is the purpose of the watch option in Vue?",
            answer: ["To observe and react to changes in data properties", "To create computed properties", "To handle events"],
            correctAnswer: "To observe and react to changes in data properties",
          },
          { 
            question: "What is the purpose of Vuex in Vue applications?",
            answer: ["State management", "Routing", "UI components"],
            correctAnswer: "State management",
          },
          { 
            question: "How do you register a global component in Vue?",
            answer: ["Using Vue.component()", "Using v-bind", "Using v-on"],
            correctAnswer: "Using Vue.component()",
          },
          { 
            question: "What is the function of the 'computed' option in Vue?",
            answer: ["To create reactive computed properties", "To handle user input", "To manage component state"],
            correctAnswer: "To create reactive computed properties",
          },
          { 
            question: "What is the purpose of the 'created' lifecycle hook in Vue?",
            answer: ["To execute code when the component is instantiated", "To render the component", "To handle user events"],
            correctAnswer: "To execute code when the component is instantiated",
          },
          { 
            question: "Which Vue directive is used to bind an attribute to an expression?",
            answer: ["v-bind", "v-model", "v-on"],
            correctAnswer: "v-bind",
          },
          { 
            question: "How do you create a custom directive in Vue?",
            answer: ["Using Vue.directive()", "Using v-custom", "Using v-bind"],
            correctAnswer: "Using Vue.directive()",
          },
          { 
            question: "How can you conditionally render elements in Vue?",
            answer: ["Using v-if and v-show", "Using v-for", "Using v-bind"],
            correctAnswer: "Using v-if and v-show",
          },
          { 
            question: "What is the purpose of the 'filters' option in Vue?",
            answer: ["To format data before displaying it", "To manage component state", "To handle events"],
            correctAnswer: "To format data before displaying it",
          },
          { 
            question: "How can you use a Vue component in a template?",
            answer: ["By registering it locally or globally", "By using v-for", "By using v-bind"],
            correctAnswer: "By registering it locally or globally",
          },
        ],

        Bootstrap: [
          {
            question: "What is Bootstrap?",
            answer: ["A CSS framework", "A JavaScript library", "A Python framework"],
            correctAnswer: "A CSS framework",
          },
          {
            question: "Which class is used to create a responsive grid in Bootstrap?",
            answer: [".row", ".container", ".grid"],
            correctAnswer: ".row",
          },
          {
            question: "Which component is used to create a navigation bar in Bootstrap?",
            answer: ["Navbar", "Dropdown", "Breadcrumb"],
            correctAnswer: "Navbar",
          },
          {
            question: "What is the purpose of the 'container' class in Bootstrap?",
            answer: ["To center content and provide padding", "To create a grid layout", "To add margins"],
            correctAnswer: "To center content and provide padding",
          },
          {
            question: "How do you create a button in Bootstrap?",
            answer: ["Using the 'btn' class", "Using the 'button' tag", "Using the 'click' class"],
            correctAnswer: "Using the 'btn' class",
          },
          {
            question: "Which Bootstrap class is used to make an image responsive?",
            answer: ["img-fluid", "img-responsive", "img-resize"],
            correctAnswer: "img-fluid",
          },
          {
            question: "What is the function of the 'd-flex' class in Bootstrap?",
            answer: ["To create a flexbox layout", "To hide an element", "To create a grid layout"],
            correctAnswer: "To create a flexbox layout",
          },
          {
            question: "Which class is used to add spacing in Bootstrap?",
            answer: ["m- (for margin) and p- (for padding)", "s- (for spacing)", "b- (for border)"],
            correctAnswer: "m- (for margin) and p- (for padding)",
          },
          {
            question: "What does the 'col' class do in Bootstrap?",
            answer: ["Defines column width in the grid system", "Applies color styles", "Centers content"],
            correctAnswer: "Defines column width in the grid system",
          },
          {
            question: "Which Bootstrap utility class is used to hide elements on different screen sizes?",
            answer: [".d-none", ".hide", ".invisible"],
            correctAnswer: ".d-none",
          },
          {
            question: "What is the default breakpoint for small devices in Bootstrap?",
            answer: ["576px", "768px", "992px"],
            correctAnswer: "576px",
          },
          {
            question: "Which class would you use to create a Bootstrap card?",
            answer: [".card", ".panel", ".container"],
            correctAnswer: ".card",
          },
          {
            question: "What is the purpose of the Bootstrap 'modal' component?",
            answer: ["To display content in a popup dialog", "To create a dropdown", "To show a tooltip"],
            correctAnswer: "To display content in a popup dialog",
          },
          {
            question: "How do you align text to the center using Bootstrap?",
            answer: [".text-center", ".align-center", ".text-middle"],
            correctAnswer: ".text-center",
          },
          {
            question: "Which class is used to add a background color in Bootstrap?",
            answer: [".bg-primary", ".color-bg", ".bg-color"],
            correctAnswer: ".bg-primary",
          },
          {
            question: "How can you make a table responsive in Bootstrap?",
            answer: [".table-responsive", ".table-fluid", ".responsive-table"],
            correctAnswer: ".table-responsive",
          },
          {
            question: "Which class in Bootstrap is used to create a dropdown?",
            answer: [".dropdown", ".menu", ".drop"],
            correctAnswer: ".dropdown",
          },
          {
            question: "How do you create a list group in Bootstrap?",
            answer: [".list-group", ".ul-group", ".nav-list"],
            correctAnswer: ".list-group",
          },
          {
            question: "Which class is used for adding shadows to elements in Bootstrap?",
            answer: [".shadow", ".box-shadow", ".shadow-lg"],
            correctAnswer: ".shadow",
          },
          {
            question: "Which Bootstrap utility class is used to float elements to the right?",
            answer: [".float-right", ".float-end", ".float-right-align"],
            correctAnswer: ".float-end",
          },
        ],
        
        HTML: [
            { 
              question: "What does the <meta> tag in HTML do?",
              answer: ["Provides metadata about the HTML document", "Defines the main content", "Creates a hyperlink"],
              correctAnswer: "Provides metadata about the HTML document",
            },
            { 
              question: "What is the purpose of the alt attribute in an <img> tag?",
              answer: ["Specifies alternative text for the image", "Defines the image width", "Sets the image source"],
              correctAnswer: "Specifies alternative text for the image",
            },
            { 
              question: "Which HTML tag is used to define a table row?",
              answer: ["<tr>", "<td>", "<th>"],
              correctAnswer: "<tr>",
            },
            { 
              question: "What is the correct HTML element to define important text?",
              answer: ["<strong>", "<em>", "<b>"],
              correctAnswer: "<strong>",
            },
            {
              question: "Which attribute is used to uniquely identify an HTML element?",
              answer: ["id", "class", "style"],
              correctAnswer: "id",
            },
            {
              question: "How do you create a hyperlink in HTML?",
              answer: ["Using the <a> tag", "Using the <link> tag", "Using the <href> attribute"],
              correctAnswer: "Using the <a> tag",
            },
            {
              question: "What is the purpose of the <head> section in an HTML document?",
              answer: ["To contain meta-information, scripts, and links to stylesheets", "To display content to the user", "To define the main structure of the page"],
              correctAnswer: "To contain meta-information, scripts, and links to stylesheets",
            },
            {
              question: "Which tag is used for creating a drop-down list in HTML?",
              answer: ["<select>", "<dropdown>", "<list>"],
              correctAnswer: "<select>",
            },
            {
              question: "What does the <br> tag do?",
              answer: ["Inserts a line break", "Creates a border", "Defines bold text"],
              correctAnswer: "Inserts a line break",
            },
            {
              question: "How do you embed a video in HTML?",
              answer: ["Using the <video> tag", "Using the <media> tag", "Using the <embed> tag"],
              correctAnswer: "Using the <video> tag",
            }
        ],

        CSS: [
            { 
              question: "How do you apply a CSS class to an HTML element?",
              answer: ["Using the class attribute", "With the id attribute", "Through inline styles"],
              correctAnswer: "Using the class attribute",
            },
            { 
              question: "What is the purpose of the box-shadow property in CSS?",
              answer: ["Adds shadow effects to elements", "Changes the element's background color", "Adjusts the font size"],
              correctAnswer: "Adds shadow effects to elements",
            },
            { 
              question: "How can you center a block element horizontally with CSS?",
              answer: ["Setting margin: auto", "Using text-align: center", "Applying float: center"],
              correctAnswer: "Setting margin: auto",
            },
            { 
              question: "What is the default value of the position property in CSS?",
              answer: ["static", "relative", "absolute"],
              correctAnswer: "static",
            },
            {
              question: "Which property is used to change the text color of an element in CSS?",
              answer: ["color", "font-color", "text-color"],
              correctAnswer: "color",
            },
            {
              question: "How do you make a flex container in CSS?",
              answer: ["display: flex", "display: grid", "display: block"],
              correctAnswer: "display: flex",
            },
            {
              question: "What does the z-index property do in CSS?",
              answer: ["Controls the stack order of elements", "Adjusts the transparency of elements", "Sets the zoom level of the page"],
              correctAnswer: "Controls the stack order of elements",
            },
            {
              question: "Which CSS property is used to change the font of an element?",
              answer: ["font-family", "font-style", "font-weight"],
              correctAnswer: "font-family",
            },
            {
              question: "How can you make a text bold in CSS?",
              answer: ["font-weight: bold", "text-decoration: bold", "font-style: bold"],
              correctAnswer: "font-weight: bold",
            },
            {
              question: "What is the use of the float property in CSS?",
              answer: ["To allow elements to float left or right", "To adjust the transparency of elements", "To center elements vertically"],
              correctAnswer: "To allow elements to float left or right",
            }
        ]
    };

    const questionsList = quizQuestions[topic] || [];

    const shuffledQuestions = questionsList.sort(() => 0.5 - Math.random());
    questions.value = shuffledQuestions.slice(0, 5);
  }
});