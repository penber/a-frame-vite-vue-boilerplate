AFRAME.registerComponent('meteor-movement', {
    schema: {
      acceleration: { type: 'number', default: 0.0 } 
    },
    init: function () {
      const position = this.el.getAttribute('position');
      this.initialPosition = new THREE.Vector3(position.x, position.y, position.z);
      this.targetPosition = new THREE.Vector3(0, 20, 0); 
      this.currentVelocity = new THREE.Vector3(0, 0, 0); 
      this.acceleration = new THREE.Vector3(-position.x / 300000, -position.y / 300000, -position.z / 300000); 
      this.lastTime = Date.now();
      this.moveMeteor();
    },
    moveMeteor: function () {
      const now = Date.now();
      const deltaTime = (now - this.lastTime) / 1000;
      this.lastTime = now;
  
      this.currentVelocity.add(this.acceleration.clone().multiplyScalar(deltaTime));
  
      const newPosition = this.el.object3D.position.clone().add(this.currentVelocity.clone().multiplyScalar(deltaTime));
      this.el.setAttribute('position', newPosition);
  
      if (newPosition.distanceTo(this.targetPosition) <= 20) {
        this.el.emit('gameover'); 
      } else {
        requestAnimationFrame(this.moveMeteor.bind(this));
      }
    },

    calculateTimeRemaining: function() {
      const currentPosition = this.el.object3D.position;
      const distanceToTarget = currentPosition.distanceTo(this.targetPosition);
      const currentSpeed = this.currentVelocity.length(); 

      if (currentSpeed <= 0) return Infinity; 

      const timeRemaining = distanceToTarget / currentSpeed; 
      return timeRemaining;
    },

    increaseSpeed: function () {
      this.acceleration.multiplyScalar(11);
    }
  });
  