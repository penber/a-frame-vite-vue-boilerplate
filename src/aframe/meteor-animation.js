AFRAME.registerComponent('meteor-movement', {
    schema: {
      acceleration: { type: 'number', default: 0.0 } // Ajout d'une accélération qui augmente à chaque erreur
    },
    init: function () {
      const position = this.el.getAttribute('position');
      this.initialPosition = new THREE.Vector3(position.x, position.y, position.z);
      this.targetPosition = new THREE.Vector3(0, 0, 0); // Cible fixée à 0, 0, 0
      this.currentVelocity = new THREE.Vector3(0, 0, 0); // Vitesse initiale
      this.acceleration = new THREE.Vector3(-position.x / 600000, -position.y / 600000, -position.z / 600000); // Accélération initiale pour atteindre la cible en 10 minutes
      this.lastTime = Date.now();
      this.moveMeteor();
    },
    moveMeteor: function () {
      const now = Date.now();
      const deltaTime = (now - this.lastTime) / 1000; // Temps écoulé en secondes
      this.lastTime = now;
  
      // Mise à jour de la vitesse basée sur l'accélération
      this.currentVelocity.add(this.acceleration.clone().multiplyScalar(deltaTime));
  
      // Mise à jour de la position basée sur la vitesse
      const newPosition = this.el.object3D.position.clone().add(this.currentVelocity.clone().multiplyScalar(deltaTime));
      this.el.setAttribute('position', newPosition);
  
      // Continuer l'animation si la météorite n'a pas encore atteint la cible
      if (newPosition.distanceTo(this.targetPosition) <= 1) { // Seuil pour "proche de l'objectif"
        this.el.emit('gameover', {message: 'Game Over'}, false); // Émettre un événement personnalisé
      } else {
        requestAnimationFrame(this.moveMeteor.bind(this));
      }
    },
    increaseSpeed: function () {
      // Augmenter l'accélération pour accélérer la météorite
      this.acceleration.multiplyScalar(2.5);
    }
  });
  