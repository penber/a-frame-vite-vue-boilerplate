AFRAME.registerComponent('adjust-volume', {
    tick: function () {
      // Trouvez toutes les entités avec la classe 'dino'
      const dinos = document.querySelectorAll('.dino');
      const listenerPos = this.el.object3D.position;
  
      dinos.forEach((dino) => {
        const dinoPos = dino.object3D.position;
        const distance = dinoPos.distanceTo(listenerPos);
  
        // Calcul du volume basé sur la distance
        let volume = 1 - Math.min(distance / 20, 1); // Exemple de calcul, ajustez selon vos besoins
  
        // Mettre à jour le volume du composant son de l'entité dino
        const soundComponent = dino.components.sound;
        if (soundComponent) {
          soundComponent.setVolume(volume);
        }
      });
    }
  });
  