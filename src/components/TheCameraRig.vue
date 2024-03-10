<script setup>
  import '../aframe/disable-in-vr.js';
  import '../aframe/hide-in-vr.js';
  import '../aframe/simple-navmesh-constraint.js';
  import '../aframe/blink-controls.js';
  import '../aframe/physx-grab.js';
  import '../aframe/visibility.js';
  import "../aframe/sniperclick.js";


  import { onMounted, onUnmounted } from 'vue';

const playSniperSound = () => {
  const sniperSound = document.querySelector('#sniper-sound');
      if (sniperSound) {
        sniperSound.emit('play-shoot');
      }
};

onMounted(() => {
  window.addEventListener('sniper-click', playSniperSound);
});

onUnmounted(() => {
  window.removeEventListener('sniper-click', playSniperSound);
});

</script>

<template>
  <a-entity
    id="camera-rig"
    movement-controls="camera: #head; speed	:1;"
    disable-in-vr="component: movement-controls;"
  >

      <a-entity
        id="head"
        look-controls="pointerLockEnabled: true"
        simple-navmesh-constraint="navmesh: [data-role='nav-mesh']; height: 1.65;"
        disable-in-vr="component: simple-navmesh-constraint;"
        camera
        position="0 1.55 0"
      >
        <a-entity
          geometry="primitive: circle; radius: 0.0003;"
          material="shader: flat; color: white;"
          cursor
          raycaster="far: 200; objects: [clickable]; showLine: false;"
          position="0 0 -0.1"
          disable-in-vr="component: raycaster; disableInAR: false;"
          hide-in-vr="hideInAR: false"

        ></a-entity>
       

      </a-entity>

      <a-entity
        id="hand-left"
        hand-controls="hand: left"
        blink-controls="
          cameraRig: #camera-rig;
          teleportOrigin: #head;
          collisionEntities: [data-role='nav-mesh'];
          snapTurn: false;
        "
        physx-grab
      >
        <a-sphere id="hand-left-collider"
          radius="0.02"
          visible="false"
          physx-body="type: kinematic; emitCollisionEvents: true">
        </a-sphere>
      </a-entity>

      <a-entity
        id="hand-right"
        hand-controls="hand: right"
        laser-controls="hand: right"
        raycaster="far: 400; objects: [clickable]; showLine: true;"
        physx-grab
        visibility="false"
        emit-sniper-click
              >
        <a-sphere id="hand-right-collider"
          radius="0.02"
          visible="false"
          physx-body="type: kinematic; emitCollisionEvents: true">
        </a-sphere>

        <a-entity
        gltf-model="url(assets/low_poly_sniper2.glb)"
        position="-0.01 -0.07 0" 
        rotation="0 0 0"
        scale="0.5 0.5 0.5"
      >
      </a-entity>
        
      </a-entity>

  </a-entity>
</template>