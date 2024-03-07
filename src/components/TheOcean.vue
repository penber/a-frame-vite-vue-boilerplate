<script setup>

import { ref } from 'vue';
import "../aframe/a-ocean.js";
</script>


<template>
<a-entity light="color:yellow; intensity: 20.5" position="-1 10 0"></a-entity>
<a-ocean color="blue" width="20" depth="10" density="15" speed="1.5"></a-ocean>
<a-ocean color="darkblue" width="25" depth="20" density="45" speed="1"></a-ocean>

</template>