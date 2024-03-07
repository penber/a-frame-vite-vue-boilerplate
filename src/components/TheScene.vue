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
    }
  };
</script>
<template>
  <a-scene
  stats
    background="color: white;"
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
    fog:0.2;
    seed:40;
    ground:flat;
    groundTexture: walkernoise;
    dressing: trees;
    dressingAmount: 100;
    dressingScale: 2;
    dressingUniformScale: false;
    playArea: 2;
    scale : 2 2 2;
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
      
      <!-- <a-asset-item id="sun-meteorite" src="assets/sun-meteorite.glb"></a-asset-item> -->
      <a-asset-item id="fire-ball" src="assets/fire_ball.glb"></a-asset-item>
   
    </a-assets>

    <template v-if="allAssetsLoaded">
    
   <DinoIsland />
   <!-- <Panneau textValue="Bienvenue dans la foret prehistorique!" textColor="white" textPosition="0 1.5 -3"></Panneau> -->
      <Dinosaures @dinosaur-clicked="checkDinosaur"/>
      <GameManager ref="gameManager" />

    </template>

    <TheCameraRig />  

  </a-scene>
</template>