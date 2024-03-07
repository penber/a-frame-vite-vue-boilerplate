<template>
    <a-entity>
      <a-plane position="4 2 1" rotation="0 -90 0" width="6" height="3" color="black" side="double">
        <a-text :value="`Question : ${question}`" position="-2.3 0.9 0.1" width="5"></a-text>
        <a-entity v-for="(choice, index) in choices" :key="index" :position="`0 ${(0.5 - index) * 0.5} 0.1`">
          <!-- Créer un a-plane pour chaque choix et le rendre cliquable -->
          <a-plane class="clickable"  clickable @click="selectChoice(choice)" position="0 0 0" width="4" height="0.4" color="#ECECEC">
            <!-- Placer le texte sur le a-plane -->
            <a-text :value="choice" position="0 0 0.01" width="3" class="clickable" @click="selectChoice(choice)" ></a-text>
          </a-plane>
        </a-entity>
      </a-plane>
    </a-entity>
  </template>
  
  
  <script>
  export default {
    name: 'PanneauQuestion',
    props: {
      question: String,
      choices: Array,
    },
    methods: {
      selectChoice(choice) {
        this.$emit('answer', choice);
      }
    }
  };
  </script>
  