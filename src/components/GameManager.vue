<script>
import PanneauTxt from './PanneauTxt.vue';
import "../utils/bind-position.js";
import "../utils/bind-rotation.js";
import PanneauQuestion from './PanneauQuestion.vue';
import "../aframe/meteor-animation.js";
import "../aframe/animation-mixer.js";

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
        endgame: false,
        timeoutRef: null,
        shouldShakeCamera: false,

        debutMessage: ['Bienvenue dans la prehistoire ! ',
       'Vous avez 6 missions pour eviter que l\'asteroide ne detruise la Terre.',
       'Pour chaque mission, vous devrez repondre a une question ou trouver un dinosaure.',
        'Si vous repondez correctement ou trouvez le bon dinosaure, vous passerez a la mission suivante.',
        'A chaque erreur, la meteorite se rapprochera encore plus vite de la Terre.',
        'Bonne chance !'
      ],

        StatusMessage:'Tirer ici pour commencer.',

        tempsrestant: 8,

        boxColor: 'black',
        showPanel: false, 
        RetourBase : 'Retour à la base pour reponde à la question.',
        currentQuestion: '',
        currentChoices: [],
        showQuestionPanel: false,
        panelMessage: '', 
        missions: [
            {
              description: "Quel dinosaure est un bipede connu pour ses longues griffes et etre l’un des plus gros predateur de l’histoire ?",
              target: "t-rex",
              hint: "Cherchez le plus grand predateur",
              successMessage: "Bravo ! Vous avez trouve le T-Rex. Qui est l'un des plus gros dinosaure de l'histoire.",
              errorMessage: "Oups... Ce n'est pas le bon dinosaure. l'asteroide se rapproche plus vite ! ",
              sound: "true",
              isCompleted: false
            },
            {
              type: "question",
              question: "Quel outil prehistorique etait utilise pour couper la viande ?",
              choices: ["Bifaces", "Propulseurs", "Harpons"],
              hint: "C'est l'outil le plus tranchant",
              correctAnswer: "Bifaces",
              successMessage: "Exact ! Les bifaces etaient utilises pour couper la viande.",
              errorMessage: "Ce n'est pas la bonne reponse. Essayez encore.",
              isCompleted: false
            },
            {
              type: "question",
              question: "Quelle peinture prehistorique celebre trouve-t-on principalement dans la Grotte de Lascaux ?",
              choices: ["Peintures de chasse", "Portraits de famille", "Scenes maritimes"],
              hint: "C'est une activite essentielle de la prehistoire",
              correctAnswer: "Peintures de chasse",
              successMessage: "Bien joue ! La Grotte de Lascaux est celebre pour ses peintures de chasse.",
              errorMessage: "Essayez encore, mais l'asteroide a accelere !!",
              isCompleted: false
            },
            {
              description: "Quel dinosaure herbivore est connu pour sa grande taille ?",
              target: "paluxysaurus",
              hint: "Cherchez le plus grand herbivore",
              successMessage: "Bravo ! Vous avez trouve le Brachiosaurus.",
              errorMessage: "Ce n'est pas le bon. ",
              sound: "true",
              isCompleted: false
            },
            {
              description: "Quel dinosaure etait un quadrupede herbivore connu pour ses trois cornes et sa collerette ?",
              target: "triceratops",
              hint: "Cherchez le dinosaure avec trois cornes",
              successMessage: "Bravo ! Vous avez trouve le Triceratops.",
              errorMessage: "Ce n'est pas le bon dinosaure. Essayez encore.",
              sound: "true",
              isCompleted: false
            },
            {
              type: "question",
              question: "Comment appelle-t-on l'ere geologique des t-rex ?",
              choices: ["Jurassique", "Cretace", "Trias"],
              hint: "C'est l'ere geologique la plus recente",
              correctAnswer: "Cretace",
              successMessage: "Exact ! Les t-rex ont vecu pendant l'ere Cretace.",
              errorMessage: "Ce n'est pas la bonne reponse. L'asteroide s'ecrase encore plus vite !!!",
              isCompleted: false
            }
          ]

      };
    },
    
    methods: {
      startMission(index) {

      const mission = this.missions[index];

      if(mission.description) {
        this.StatusMessage = mission.description;
      } else {
        this.StatusMessage = "Répondez à la question pour continuer";
      }

      const soundEl = document.getElementById('mission-sound-' + index);
      if (soundEl) {
        soundEl.emit('play-sound');
      }

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

        if (mission.sound) {
          const soundEl = document.getElementById('mission-sound-' + index);
          soundEl.emit('play-sound');

        };
        }
      },
      

                showPannel(message) {
            this.panelMessage = message;
            this.showPanel = true; 
            if (this.endgame === true) {
              return;
            }
            this.timeoutRef = setTimeout(() => {
              this.showPanel = false;
            }, 9000);
          },


      closepanel() {
        if(this.endgame === true) {
          return;
        }
        this.showPanel = false;
      },
          
      
      showmessage() {
        if (this.msgindex < this.debutMessage.length) {
          this.StatusMessage = this.debutMessage[this.msgindex];
          this.msgindex++;

          if (this.msgindex === this.debutMessage.length) {
            this.StatusMessage = 'Commencer votre première mission.';
            setTimeout(() => {
              this.startMission(0);
            }, 1500);
          }
        } else if (this.msgindex > this.debutMessage.length)
        {
          const mission = this.missions[index];

          this.StatusMessage = mission.description;
        }
      },


      checkMission(target) {
        if (this.endgame) return;
        if (this.missions[this.currentMissionIndex].target === target) {
          this.completeMission(true);
        } else {
          const meteoriteEl = document.getElementById('sun-meteorite');
          
            meteoriteEl.components['meteor-movement'].increaseSpeed();

          this.completeMission(false);
        }
      },

      checkAnswer(answer) {
        if (this.endgame) return;
          const mission = this.missions[this.currentMissionIndex];
          if (answer === mission.correctAnswer) {
            this.completeMission(true);
             this.showQuestionPanel = false; 
          } else {
            const meteoriteEl = document.getElementById('sun-meteorite');
            meteoriteEl.components['meteor-movement'].increaseSpeed();
            this.completeMission(false);
          }
        },


      completeMission(success) {
        if (this.endgame) return;
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

              this.showPannel("Félicitations ! Vous avez complété toutes les missions. Mais l'asteroide est toujours en route vers la Terre...");
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

      displayGameOverMessage() {
        this.boxColor = 'darkred';
        this.panelMessage = "Game Over";
        this.showPanel = true;
        if (this.timeoutRef) {
          clearTimeout(this.timeoutRef); 
          this.timeoutRef = null; 
        }
      },

          updateTimeRemaining () {
      const meteoriteEl = document.getElementById('sun-meteorite');
      if (meteoriteEl && meteoriteEl.components && 'meteor-movement' in meteoriteEl.components) {
        const timeRemaining = meteoriteEl.components['meteor-movement'].calculateTimeRemaining();
        let temppsrestan = Math.max(0, Math.round(timeRemaining)); 
        this.tempsrestant = `Distance de la l'asteroide : ${temppsrestan} KM restant`;

        if (temppsrestan < 8 && temppsrestan > 1) {
          const soundEl = document.getElementById('meteor-impact');
          soundEl.emit('play-sound');
        }

        // Mise à jour du drapeau basé sur la condition de distance
        this.shouldShakeCamera = temppsrestan < 100 && temppsrestan > 3;
        if(this.shouldShakeCamera) {
          this.applyCameraShake(temppsrestan);
        }
      }
    },
    
    
    applyCameraShake(distance) {
      const cameraEl = document.getElementById('head');
      let intensity = Math.max(0.1, (50 - distance) / 50); 
      let shakeAmount = intensity * 0.018; 

      let shakeCamera = () => {
        if (this.shouldShakeCamera) {
          console.log(distance);
          let randomX = (Math.random() - 0.5) * shakeAmount;
          let randomY = (Math.random() - 0.5) * shakeAmount;
          let randomZ = (Math.random() - 0.5) * shakeAmount;

          cameraEl.object3D.position.x += randomX;
          cameraEl.object3D.position.y += randomY;
          cameraEl.object3D.position.z += randomZ;

          requestAnimationFrame(() => {
            cameraEl.object3D.position.x -= randomX;
            cameraEl.object3D.position.y -= randomY;
            cameraEl.object3D.position.z -= randomZ;

            shakeCamera();
          });
        }
      };
      shakeCamera();
    },

    randomPosition: function() {
  const x = Math.floor(Math.random() * 150) - 80; 
  const z = Math.floor(Math.random() * 150) - 80; 
  return `${x} -8 ${z}`;
},


     },
    created() {
      this.$nextTick(() => {
        const meteoriteEl = document.querySelector('#sun-meteorite');
        if (meteoriteEl) {
          meteoriteEl.addEventListener('gameover', (e) => {
        
            this.endgame = true;
            this.displayGameOverMessage();

          });
        }
      });
    },
    mounted() { 
      setInterval(() => {
        this.updateTimeRemaining();
      }, 1000);
    }
  };
  
</script>



<template>


<panneau-txt 
      :text-value="StatusMessage"
      text-color="white"
      boxColor= "black"
      boxPosition="-0.1 1.5 -1.05" 
      textPosition="0 1.5 -1"
      side="double"
      clickable
      @click="showmessage()"
    ></panneau-txt>


    <panneau-txt 
      :text-value= "tempsrestant"
      text-color="white"
      boxColor= "black"
      boxPosition="-0.1 1.5 -1.05" 
      textPosition="0 1.85 -1"
    ></panneau-txt>

<a-entity
      bind-position="target: #head;"
      bind-rotation="target: #head; convertToLocal: true;">
    <panneau-txt v-if="showPanel"
      :text-value="panelMessage"
      @close-panel="closepanel()"
      text-color="white"
      :box-color= boxColor
      box-position="-0.1 0 -0.85" 
      text-position="0 0 -0.8"
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

  <a-entity v-if="endgame">
    <a-entity 
      v-for="i in 23" 
      :key="i"
      gltf-model="#fire-ball" 
      :position="randomPosition()" 
      scale="30 30 30" 
      animation-mixer
    ></a-entity>
  </a-entity>
</template>