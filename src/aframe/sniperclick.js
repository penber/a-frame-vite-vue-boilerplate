AFRAME.registerComponent('emit-sniper-click', {
    init: function() {
      this.el.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('sniper-click'));
      });
    }
  });
  