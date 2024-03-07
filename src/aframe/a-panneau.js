AFRAME.registerComponent('panneau-indications', {
    init: function () {
      // Créer un élément texte pour les indications
      let texte = document.createElement('a-text');
      texte.setAttribute('value', 'Bienvenue ! Suivez les indications pour commencer.');
      texte.setAttribute('color', 'black');
      texte.setAttribute('position', '0 2 -5');
      
      // Ajouter le texte au panneau (l'entité courante)
      this.el.appendChild(texte); // Ajoutez le texte comme enfant de l'entité courante
  
      // Optionnel : ajouter une logique pour cacher le panneau après un certain temps ou un événement
      setTimeout(() => {
        // Si vous voulez supprimer juste le texte après 10 secondes
        if (texte.parentNode) {
          texte.parentNode.removeChild(texte);
        }
        // Ou si vous voulez supprimer toute l'entité (commentez la ligne ci-dessus et décommentez celle-ci)
        // if (this.el.parentNode) {
        //   this.el.parentNode.removeChild(this.el);
        // }
      }, 10000); // Supprime le panneau après 10 secondes
    }
  });
  