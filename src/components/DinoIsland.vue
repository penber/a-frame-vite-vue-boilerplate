

<template>
    
      <a-entity gltf-model="#mountain-newbie" position="58.345 -1 57.515" scale="5 6 5" animation-mixer></a-entity>
      <a-entity gltf-model="#tree-clouds" position="-18.345 -0.3 -17.515" rotation="0 -10 0"  scale="5 5 5" animation-mixer></a-entity>
      <a-entity gltf-model="#tree-clouds" position="13.073 -0.3 33.536" rotation="0 60 0" scale="7 7 7" animation-mixer></a-entity>
      <a-entity id="sun-meteorite" gltf-model="url(assets/sun-meteorite.glb)" meteor-movement position="7.197 166.889 -159.236" scale="1.5 1.6 1.5"></a-entity>
      <a-entity gltf-model="#tree-island" position="10 0 -5" scale="0.05 0.05 0.05 "></a-entity>
</template>
  
  <script>

  import "../aframe/animation-mixer.js";
  import "../aframe/meteor-animation.js";


  export default {

    name: "DinoIsland",
    
  };
  </script>

  