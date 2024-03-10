<script>
  import { ref } from 'vue';
  import TheCameraRig from './TheCameraRig.vue';
  import TheOcean from './TheOcean.vue';
  import DinoIsland from './DinoIsland.vue';
  import Panneau from './PanneauTxt.vue';
  import Dinosaures from './DinoSaures.vue';
  import GameManager from './GameManager.vue';

  export default {
    components: {
      TheCameraRig,
      TheOcean,
      DinoIsland,
      Panneau,
      Dinosaures,
      GameManager
    },
    props: {
      scale: Number,
      overlaySelector: String,
    },
    data() {
      return {
        allAssetsLoaded: false,
        panneauMessage: '', // Message à afficher sur le panneau
        positionMessage: '0 1.5 -3', // Position du panneau
      };
    },
    methods: {
      checkDinosaur(dinosaurName) {
        this.$refs.gameManager.checkMission(dinosaurName);
      },
      updatePanneauMessage(newMessage) {
      this.panneauMessage = newMessage;
    }
    },
    mounted() {

      setTimeout(() => {
        const backgroundSound = document.querySelector('#bakground-sound');
        if (backgroundSound) {
      backgroundSound.addEventListener('sound-loaded', () => {
        backgroundSound.setAttribute('sound', 'volume', 0.3);
      });
    }
      }, 3000);
     
    
    },
  };
</script>
<template>
  <a-scene
    background="color: black;"
    :webxr="`
      requiredFeatures: local-floor;
      referenceSpaceType: local-floor;
      optionalFeatures: dom-overlay;
      overlayElement: ${overlaySelector};
    `"
    xr-mode-ui="XRMode: xr"
    aphysx="
      autoLoad: true;
      delay: 1000;
      useDefaultScene: false;
      wasmUrl: lib/physx.release.wasm;
    "
    environment="preset: forest; 
    fog:0.75;
    seed:40;
    ground:flat;
    groundTexture: walkernoise;
    groudColor: #3f3f3f;
    dressing: trees;
    dressingAmount: 60;
    dressingScale: 2;
    dressingUniformScale: false;
    horizonColor: darkorange;
    "
  >

    <a-assets @loaded="allAssetsLoaded = true">

      <a-asset-item id="room" src="assets/vr_gallery.glb"></a-asset-item>
      <!-- dinausares -->
      <a-asset-item id="velo-ceraptor" src="assets/raptor_blue.glb"></a-asset-item>
      <a-asset-item id="tyranno-saurus" src="assets/tyranno_walk.glb"></a-asset-item>
      <a-asset-item id="pteractal-dino" src="assets/flying_pteradactal_dinosaur.glb"></a-asset-item>
      <a-asset-item id="triceratops-dino" src="assets/triceratops.glb"></a-asset-item>
      <a-asset-item id="paluxysaurus-dino" src="assets/paluxysaurus.glb"></a-asset-item>


      <a-asset-item id="lowpoly-sniper" src="assets/low_poly_sniper.glb"></a-asset-item>
      
      
      <!-- Décoration -->
      <a-asset-item id="mountain-newbie" src="assets/low_poly_mountain.glb"></a-asset-item>
      <a-asset-item id="tree-clouds" src="assets/low_poly_landscape.glb"></a-asset-item>
      <a-asset-item id="fire-ball" src="assets/fire.glb"></a-asset-item>
      <a-asset-item id="fire-ball" src="assets/fire_ball.glb"></a-asset-item>
      <a-asset-item id="tree-island" src="assets/tree.glb"></a-asset-item>
    </a-assets>

    <template v-if="allAssetsLoaded">

      <a-sound id="sniper-sound" src="url(assets/sounds/sniper.mp3)" autoplay="false" on="play-shoot"></a-sound>

      <a-sound id="bakground-sound" src="assets/sounds/JurassicPark-Soundtrack.mp3" autoplay="true" loop="true" volume="0.2"></a-sound>
      <a-sound id="mission-sound-0" src="assets/sounds/trex-sound.mp3" autoplay="false" loop="false" on="play-sound" volume="1"></a-sound>      <a-sound id="mission-sound-1" src="" autoplay="false" start-events="play-sound"></a-sound>
      <a-sound id="mission-sound-3" src="assets/sounds/Diplodocus_Sound.mp3" autoplay="false" on="play-sound" volume="1" position="-40 0 17.5"></a-sound>      <a-sound id="mission-sound-1" src="" autoplay="false" start-events="play-sound"></a-sound>
      <a-sound id="mission-sound-4" src="assets/sounds/triceratops_sound.mp3" autoplay="false" on="play-sound" volume="1"></a-sound>
      <a-sound id="meteor-impact" src="assets/sounds/Meteor_Impact.mp3" autoplay="false" on="play-sound" volume="1"></a-sound>
   <DinoIsland />
      <Dinosaures @dinosaur-clicked="checkDinosaur"/>
      <GameManager ref="gameManager" />

    </template>

    <TheCameraRig />  

  </a-scene>
</template>