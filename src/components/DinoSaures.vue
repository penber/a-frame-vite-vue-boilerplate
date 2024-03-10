<template>

<!-- velociraptors -->
    <a-entity gltf-model="#velo-ceraptor" rotation="0 0 0" position="21.4 0 -47" 
     animation-mixer="loop: repeat" random-walk="speed: 1, minInterval:8000"  
     scale="2.2 2.2 2.2"
     clickable
    @click="onDinosaurClicked('velo')"
    class="interactive"
>
</a-entity>

    <a-entity gltf-model="#velo-ceraptor" rotation="0 0 0" position="22 0 -40"  
    animation-mixer="loop: repeat" 
    scale="2 2 2"

    clickable
    @click="onDinosaurClicked('velo')"
    class="interactive"
    ></a-entity> 

    <a-entity gltf-model="#velo-ceraptor" rotation="0 0 0" position="20 0 -35"  
    animation-mixer="loop: repeat" random-walk="speed: 1, minInterval:8000"  
    scale="1.8 1.8 1.8"

    clickable
    @click="onDinosaurClicked('velo')"
    class="interactive"
    ></a-entity> 


    <!-- tyranosaures -->

  <a-entity gltf-model="#tyranno-saurus"  
    position="-23.951 0 34.415" rotation="0 -120 -4" scale="0.05 0.05 0.05" 
    animation-mixer random-walk="speed:3, rotationSpeed:0.005" 
    clickable
    @click="onDinosaurClicked('t-rex')"
    class="interactive"
  >
</a-entity>

<!-- dino vola+nt -->

    <a-entity gltf-model="#pteractal-dino" position="-48.790 52.541 -22.989" rotation="15 0 0" scale="8 7.4 7.4" 
    animation-mixer random-walk="speed: 3"
    clickable
    @click="onDinosaurClicked('pteractal')"
    class="interactive">
  
  </a-entity>
    <a-entity gltf-model="#pteractal-dino" position="22 16 -40" rotation="15 -60 0" scale="8 7.4 7.4"
     animation-mixer random-walk="speed: 3"
     clickable
    @click="onDinosaurClicked('pteractal')"
    class="interactive"
    ></a-entity>

    <a-entity gltf-model="#pteractal-dino" position="-14 28 51.3" rotation="15 90 0" scale="8 7.4 7.4"
     animation-mixer random-walk="speed: 3"
     clickable
    @click="onDinosaurClicked('pteractal')"
    class="interactive"
    ></a-entity>

    <a-entity gltf-model="#pteractal-dino" position="54 45 55.3" rotation="15 45 0" scale="10 10 10"
     animation-mixer random-walk="speed: 3"
     clickable
    @click="onDinosaurClicked('pteractal')"
    class="interactive"
    ></a-entity>


    <!-- trceratops -->

    <a-entity gltf-model="#triceratops-dino" 
    position="49 0 -29" rotation="0 0 0" scale="2 2 2"
    animation-mixer
    clickable
    @click="onDinosaurClicked('triceratops')"
    class="interactive"
    ></a-entity>
    <a-entity gltf-model="#triceratops-dino" 
    position="48.7 0 -12.92" rotation="0 180 0" scale="2 2 2"
    animation-mixer
    clickable
    @click="onDinosaurClicked('triceratops')"
    class="interactive"
    ></a-entity>

    <a-entity gltf-model="#triceratops-dino" 
    position="-48.7 0 20.92" rotation="0 90 0" scale="2 2 2"
    animation-mixer
    clickable
    @click="onDinosaurClicked('triceratops')"
    class="interactive"
    ></a-entity>

    <!-- paluxysaurus -->

    <a-entity gltf-model="#paluxysaurus-dino"
    position="-36.776 0.8 -50" rotation="0 0 0" scale="2 2 2"
    animation-mixer
    clickable
    @click="onDinosaurClicked('paluxysaurus')"
    class="interactive"
    ></a-entity>

    <a-entity gltf-model="#paluxysaurus-dino"
    position="42.345 0.8 37.515" rotation="0 -50   0" scale="2 2 2"
    animation-mixer
    clickable
    @click="onDinosaurClicked('paluxysaurus')"
    class="interactive"
    ></a-entity>


</template>

<script>
import "../aframe/animation-mixer.js";
import "../aframe/random-walk.js";

export default {
  name: "Dinosaures",
  methods: {
    onDinosaurClicked(dinosaurName) {
      this.$emit('dinosaur-clicked', dinosaurName);
      console.log("t-rex clicked")
    }}
};
</script>

