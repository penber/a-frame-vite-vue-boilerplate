AFRAME.registerComponent('panneau-indications', {
    init: function () {
      let texte = document.createElement('a-text');
      texte.setAttribute('value', 'Bienvenue ! Suivez les indications pour commencer.');
      texte.setAttribute('color', 'black');
      texte.setAttribute('position', '0 2 -5');
      
      this.el.appendChild(texte); 
  
      setTimeout(() => {
        if (texte.parentNode) {
          texte.parentNode.removeChild(texte);
        }
      
      }, 10000);
    }
  });
  