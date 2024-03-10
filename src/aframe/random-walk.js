AFRAME.registerComponent('random-walk', {
  schema: {
    speed: {type: 'number', default: 1},
    minInterval: {type: 'number', default: 1000},
    maxInterval: {type: 'number', default: 11000},
    rotationSpeed: {type: 'number', default: 0.05},
    maxTurnAngle: {type: 'number', default: 100},
    moveDistance: {type: 'number', default: 15}
  },
  init: function () {
    this.direction = 0;
    this.moveRandomly();
  },
  moveRandomly: function () {
    const el = this.el;
    const data = this.data;

    setInterval(() => {
      const smallTurnProbability = 0.7; 
      const turnAdjustment = Math.random() < smallTurnProbability ? 0.5 : 2; 
      const turnAngle = THREE.MathUtils.degToRad((Math.random() - 0.5) * 2 * data.maxTurnAngle * turnAdjustment);
      this.direction += turnAngle;

      const dx = Math.sin(this.direction) * data.moveDistance;
      const dz = Math.cos(this.direction) * data.moveDistance;
      const newPosition = {
        x: el.object3D.position.x + dx,
        y: el.object3D.position.y,
        z: el.object3D.position.z + dz
      };

      const dur = data.moveDistance / data.speed * 1000;

      const easingFunction = 'easeInOutQuad'; 

      el.setAttribute('animation__position', {
        property: 'position',
        to: `${newPosition.x} ${newPosition.y} ${newPosition.z}`,
        dur: dur,
        easing: easingFunction
      });

      const rotationY = THREE.MathUtils.radToDeg(this.direction);
      el.setAttribute('animation__rotation', {
        property: 'rotation',
        to: `0 ${rotationY} 0`,
        dur: dur * data.rotationSpeed,
        easing: easingFunction
      });

    }, Math.random() * (data.maxInterval - data.minInterval) + data.minInterval);
  }
});
