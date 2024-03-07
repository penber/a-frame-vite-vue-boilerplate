

<template>
    
      <!-- <a-entity gltf-model="#dino-island" position="0 0 0"></a-entity> -->
      <a-entity gltf-model="#mountain-newbie" position="58.345 -1 57.515" scale="5 6 5" animation-mixer></a-entity>
      <!-- <a-entity gltf-model="#sun-meteorite" position="40 166.889 -175.236" scale="1.5 1.5 1.5"  meteor-movement></a-entity> -->
      <a-entity id="sun-meteorite" gltf-model="url(assets/sun-meteorite.glb)" meteor-movement position="40 166.889 -175.236" scale="1.5 1.6 1.5"></a-entity>

      <!-- <a-entity gltf-model="#fire-ball" position="0 40 0" scale="21 21 21 "></a-entity> -->
</template>
  
  <script>

  import "../aframe/animation-mixer.js";
  import "../aframe/meteor-animation.js";


  export default {

    name: "DinoIsland",
    
  };
  </script>

  