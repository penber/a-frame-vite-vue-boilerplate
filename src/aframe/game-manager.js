// GameManager.js
export default {
    name: "GameManager",
    data() {
      return {
        currentMissionIndex: 0,
        missions: [
          {
            description: "Quel dinosaure était un bipède connu pour ses longues griffes et être l’un des plus gros prédateur de l’histoire ?",
            target: "t-rex",
            hint: "Cherchez le plus grand prédateur",
            successMessage: "Bravo ! Vous avez trouvé le T-Rex.",
            errorMessage: "Ce n'est pas le bon dinosaure. Essayez encore.",
            isCompleted: false
          },
          {
            description: "Quel dinosaure était un quadrupède herbivore connu pour son long cou et sa grande taille ?",
            target: "brachiosaurus",
            hint: "Cherchez le plus grand herbivore",
            successMessage: "Bravo ! Vous avez trouvé le Brachiosaurus.",
            errorMessage: "Ce n'est pas le bon dinosaure. Essayez encore.",
            isCompleted: false
          },
          {
            description: "Quel dinosaure était un quadrupède herbivore connu pour ses trois cornes et sa collerette ?",
            target: "triceratops",
            hint: "Cherchez le dinosaure avec trois cornes",
            successMessage: "Bravo ! Vous avez trouvé le Triceratops.",
            errorMessage: "Ce n'est pas le bon dinosaure. Essayez encore.",
            isCompleted: false
          }]
      };
    },
    methods: {
      startMission(index) {
        this.currentMissionIndex = index;
        // Afficher le panneau avec la description de la mission
        this.showPannel(this.missions[index].description);
      },
      showPannel(message) {
       
      },
      checkMission(target) {
        // Vérifie si la cible est correcte pour la mission actuelle
        if (this.missions[this.currentMissionIndex].target === target) {
          this.completeMission(true);
        } else {
          this.completeMission(false);
        }
      },
      completeMission(success) {
        // Logique pour gérer la complétion de la mission, afficher les messages de succès ou d'erreur
        if (success) {
          alert(this.missions[this.currentMissionIndex].successMessage); // Utilisez une méthode plus élaborée dans la pratique
          this.missions[this.currentMissionIndex].isCompleted = true;
          // Passer à la mission suivante ou terminer
        } else {
          alert(this.missions[this.currentMissionIndex].errorMessage); // Utilisez une méthode plus élaborée dans la pratique
        }
      }
    }
  };
  