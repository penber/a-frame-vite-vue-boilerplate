<script>
import PanneauTxt from './PanneauTxt.vue';
import "../utils/bind-position.js";
import "../utils/bind-rotation.js";
import PanneauQuestion from './PanneauQuestion.vue';
import "../aframe/meteor-animation.js";
import { nextTick } from 'vue';
export default {
    name: "GameManager",
    components: {
      PanneauTxt,
      PanneauQuestion
    },
    data() {
      return {
        currentMissionIndex: 0,
        msgindex: 0,
        debutMessage: ['Bienvenue dans le jeu de la préhistoire ! ',
         'Vous avez 3 missions à accomplir pour terminer le jeu.',
         'Pour chaque mission, vous devrez répondre à une question ou trouver un dinosaure.',
          'Si vous répondez correctement ou trouvez le bon dinosaure, vous passerez à la mission suivante.',
          'En cas derreur, la météorite se rapprochera encore plus vite de la Terre.',
          'Bonne chance !'
        ],
        StatusMessage:'Tirer pour commencer.',
        boxColor: 'black',
        showPanel: false, 
        RetourBase : 'Retourné à la base pour réponde à la question.',
        currentQuestion: '',
        currentChoices: [],
        showQuestionPanel: false,
        panelMessage: '', 
        missions: [
        {
            description: "Quel dinosaure est un bipède connu pour ses longues griffes et être l’un des plus gros prédateur de l’histoire ?",
            target: "t-rex",
            hint: "Cherchez le plus grand prédateur",
            successMessage: "Bravo ! Vous avez trouvé le T-Rex. Qui est l'un des plus gros dinausaure de l'histoire.",
            errorMessage: "Oups... Ce n'est pas le bon dinosaure. l'asteroide se rapproche plus vite ! ",
            isCompleted: false
          },
        {
            type: "question",
            question: "Quel outil préhistorique était utilisé pour couper la viande ?",
            choices: ["Bifaces", "Propulseurs", "Harpons"],
            hint: "C'est l'outil le plus tranchant",
            correctAnswer: "Bifaces",
            successMessage: "Exact ! Les bifaces étaient utilisés pour couper la viande.",
            errorMessage: "Ce n'est pas la bonne réponse. Essayez encore.",
            isCompleted: false
          },
          {
          type: "question",
          question: "Quelle peinture préhistorique célèbre trouve-t-on principalement dans la Grotte de Lascaux ?",
          choices: ["Peintures de chasse", "Portraits de famille", "Scènes maritimes"],
          hint: "C'est une activité essentielle de la préhistoire",
          correctAnswer: "Peintures de chasse",
          successMessage: "Bien joué ! La Grotte de Lascaux est célèbre pour ses peintures de chasse.",
          errorMessage: "Essayez encore, mais l'asteroide à accéléré !!",
          isCompleted: false
        } ,
        
          {
            description: "Quel dinosaure herbivore est connu pour sa grande taille ?",
            target: "paluxysaurus",
            hint: "Cherchez le plus grand herbivore",
            successMessage: "Bravo ! Vous avez trouvé le Brachiosaurus.",
            errorMessage: "Ce n'est pas le bon. ",
            isCompleted: false
          },
      
          {
            description: "Quel dinosaure était un quadrupède herbivore connu pour ses trois cornes et sa collerette ?",
            target: "triceratops",
            hint: "Cherchez le dinosaure avec trois cornes",
            successMessage: "Bravo ! Vous avez trouvé le Triceratops.",
            errorMessage: "Ce n'est pas le bon dinosaure. Essayez encore.",
            isCompleted: false
          },
          {type: "question",
          question: "Comment appelle-t-on l'ère géologique des t-rex ?",
          choices: ["Jurassique", "Crétacé", "Trias"],
          hint: "C'est l'ère géologique la plus récente",
          correctAnswer: "Crétacé",
          successMessage: "Exact ! Les t-rex ont vécu pendant l'ère Crétacé.",
          errorMessage: "Ce n'est pas la bonne réponse. L'astéroide s'écrase encore plus vite !!!",
          isCompleted: false}]
      };
    },
    
    methods: {
      startMission(index) {
      const mission = this.missions[index];
      if (mission.hasOwnProperty('type') && mission.type === 'question') {
        this.currentQuestion = mission.question;
        console.log(this.currentQuestion);
        this.currentChoices = mission.choices;
        console.log(this.currentChoices);

        this.showQuestionPanel = true;
        if(this.missions[(index-1)].type != 'question') {
          this.showPannel(this.RetourBase);
        }
      } else {
        this.showPannel(mission.description);
      }
    },

      showPannel(message) {
         this.panelMessage = message;
        this.showPanel = true; 
        setTimeout(() => {
          this.showPanel = false;
        }, 9000);
      },
          
      
      showmessage() {
        if (this.msgindex < this.debutMessage.length) {
          this.StatusMessage = this.debutMessage[this.msgindex];
          this.msgindex++;

          if (this.msgindex === this.debutMessage.length) {
            this.StatusMessage = 'Commencer votre première mission.';
            setTimeout(() => {
              this.startMission(0);
            }, 2000);
          }
        } else if (this.msgindex) {
          this.StatusMessage = '';
        }
      },


      checkMission(target) {
        if (this.missions[this.currentMissionIndex].target === target) {
          this.completeMission(true);
        } else {
          const meteoriteEl = document.getElementById('sun-meteorite');
          
            meteoriteEl.components['meteor-movement'].increaseSpeed();

          this.completeMission(false);
        }
      },

      checkAnswer(answer) {
          const mission = this.missions[this.currentMissionIndex];
          if (answer === mission.correctAnswer) {
            this.completeMission(true);
             this.showQuestionPanel = false; // Fermer le panneau question après la réponse

          } else {
            const meteoriteEl = document.getElementById('sun-meteorite');
            meteoriteEl.components['meteor-movement'].increaseSpeed();
            this.completeMission(false);
          }
        },


      completeMission(success) {
        if (success) {
          this.boxColor = 'green';
          this.showPannel(this.missions[this.currentMissionIndex].successMessage);
          this.missions[this.currentMissionIndex].isCompleted = true;

          // Vérifier s'il y a une mission suivante
          if (this.currentMissionIndex + 1 < this.missions.length && !this.missions[this.currentMissionIndex + 1].isCompleted) {
            setTimeout(() => {
              this.currentMissionIndex++;
              this.boxColor = 'black';
              this.startMission(this.currentMissionIndex);
            }, 5000); 
          } else {
            // Toutes les missions sont terminées
            setTimeout(() => {
           this.boxColor = 'darkgreen';

              this.showPannel("Félicitations ! Vous avez complété toutes les missions.");
              //  ajouter d'autres actions pour marquer la fin du jeu, comme afficher un écran de fin, etc.
            }, 5000);
          }

        } else {
          this.boxColor = 'red';
          this.showPannel(this.missions[this.currentMissionIndex].errorMessage);
            setTimeout(() => {
              this.boxColor = 'black';
              this.showPannel(this.missions[this.currentMissionIndex].hint)
              this.StatusMessage = this.missions[this.currentMissionIndex].hint;
            }, 5000);
        }
      },

      displayGameOverMessage(message) {
        this.boxColor = 'darkred';
        this.panelMessage = "Game Over";
        this.showPanel = true; 
       this.StatusMessage = message;
  },

    },

    created() {
      this.$nextTick(() => {
        const meteoriteEl = document.querySelector('#sun-meteorite');
        if (meteoriteEl) {
          meteoriteEl.addEventListener('gameover', (e) => {
            this.displayGameOverMessage();
          });
        }
      });
    },
    mounted() { 
      this.startMission(0);
    }
  };
  
</script>



<template>

<panneau-txt 
      :text-value="StatusMessage"
      text-color="white"
      boxColor= "black"
      boxPosition="-0.1 1.5 -1.15" 
      textPosition="0 1.5 -1"
      side="double"
      clickable
      @click="showmessage()"
    ></panneau-txt>

<a-entity
      bind-position="target: #head;"
      bind-rotation="target: #head; convertToLocal: true;">
    <panneau-txt v-if="showPanel"
      :text-value="panelMessage"
      @close-panel="showPanel = false"
      text-color="white"
      :box-color= boxColor
      box-position="-0.1 0.5 -1.15" 
      text-position="0 0.5 -1"
      position="0 0 -1"
      side="double"
      :visible= showPanel
    ></panneau-txt>
  </a-entity>

  <panneau-question v-if="showQuestionPanel"
                    :question="currentQuestion"
                    :choices="currentChoices"
                    @answer="checkAnswer">
  </panneau-question>


</template>