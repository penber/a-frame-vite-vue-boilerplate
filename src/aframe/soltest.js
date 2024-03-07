AFRAME.registerComponent('pavage-carre', {
    schema: {
        cols: {type: 'number', default: 10},
        rows: {type: 'number', default: 10},
        tileSize: {type: 'number', default: 1.5},
        offset: {type: 'number', default: 1} // Cet attribut peut rester à 0 puisque nous ne voulons pas d'espacement.
    },
    init: function () {
        let pavageConfig = this.data;
        for (let i = 0; i < pavageConfig.rows; i++) {
            for (let j = 0; j < pavageConfig.cols; j++) {
                let box = document.createElement('a-box');
                // Ajustez ici pour éliminer les espacements entre les cubes
                let positionX = i * pavageConfig.tileSize - (pavageConfig.rows / 2 - 0.5) * pavageConfig.tileSize;
                let positionZ = j * pavageConfig.tileSize - (pavageConfig.cols / 2 - 0.5) * pavageConfig.tileSize;
                box.setAttribute('position', `${positionX} 0 ${positionZ}`);
                box.setAttribute('color', 'darkgreen');
                box.setAttribute('width', pavageConfig.tileSize.toString());
                box.setAttribute('height', (pavageConfig.tileSize * 0.001).toString());
                box.setAttribute('depth', pavageConfig.tileSize.toString());
                this.el.appendChild(box);
            }
        }
    }
});
