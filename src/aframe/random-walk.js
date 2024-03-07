AFRAME.registerComponent('random-walk', {
  schema: {
    speed: {type: 'number', default: 1}, // Vitesse de déplacement
    minInterval: {type: 'number', default: 1000}, // Intervalle minimum entre les déplacements
    maxInterval: {type: 'number', default: 15000}, // Intervalle maximum entre les déplacements
    rotationSpeed: {type: 'number', default: 0.05}, // Vitesse de rotation
    maxTurnAngle: {type: 'number', default: 90}, // Maximum turn angle in degrees
    moveDistance: {type: 'number', default: 15} // Distance à parcourir à chaque mouvement
  },
  init: function () {
    this.direction = 0; // Direction initiale en degrés
    this.moveRandomly();
  },
  moveRandomly: function () {
    const el = this.el;
    const data = this.data;

    setInterval(() => {
      // Choisissez une nouvelle direction dans l'intervalle [-maxTurnAngle, maxTurnAngle] par rapport à l'actuelle
      const turnAngle = THREE.MathUtils.degToRad((Math.random() - 0.5) * 2 * data.maxTurnAngle);
      this.direction += turnAngle; // Ajouter le virage à la direction actuelle

      // Calculer la nouvelle position en avançant de moveDistance dans la nouvelle direction
      const dx = Math.sin(this.direction) * data.moveDistance;
      const dz = Math.cos(this.direction) * data.moveDistance;
      const newPosition = {
        x: el.object3D.position.x + dx,
        y: 0, // Y constant
        z: el.object3D.position.z + dz
      };

      // Distance parcourue est data.moveDistance, donc pas besoin de recalculer
      const dur = data.moveDistance / data.speed * 1000; // Conversion en millisecondes

      // Mise à jour de la position
      el.setAttribute('animation__position', {
        property: 'position',
        to: `${newPosition.x} ${newPosition.y} ${newPosition.z}`,
        dur: dur,
        easing: 'linear'
      });

      // Mise à jour de la rotation
      const rotationY = THREE.MathUtils.radToDeg(this.direction);
      el.setAttribute('animation__rotation', {
        property: 'rotation',
        to: `0 ${rotationY} 0`,
        dur: dur * data.rotationSpeed,
        easing: 'linear'
      });

    }, Math.random() * (data.maxInterval - data.minInterval) + data.minInterval);
  }
});
