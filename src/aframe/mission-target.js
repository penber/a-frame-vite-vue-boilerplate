AFRAME.registerComponent('mission-target', {
    schema: {
      targetName: {type: 'string'}
    },
    init: function() {
      this.el.addEventListener('shot', () => {
        if (this.data.targetName === this.el.sceneEl.systems['game-manager'].getCurrentTarget()) {
          // Mission réussie
          this.el.sceneEl.systems['game-manager'].completeMission(true);
        } else {
          // Mission échouée
          this.el.sceneEl.systems['game-manager'].completeMission(false);
        }
      });
    }
  });
  