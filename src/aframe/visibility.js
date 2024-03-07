AFRAME.registerComponent('visibility', {
    schema: {default: true},
  
    update: function (retry = true) {
      if (!this.el.getObject3D('mesh') && retry) {
        setTimeout(() => this.update(false), 5000);
        return;
      }
      this.el.getObject3D('mesh').visible = this.data;
    },
  
  });