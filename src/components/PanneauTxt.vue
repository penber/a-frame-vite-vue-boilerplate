<script>
export default {
  name: 'Panneau',
  props: {
    textValue: {
      type: String,
      required: true,
      default: 'Hello, World!'
    },
    textColor: {
      type: String,
      default: 'red'
    },
    textPosition: {
      type: String,
      default: '0 1 -3'
    },
    
    boxColor: {
      type: String,
      default: 'black'
    },
    boxSize: {
      type: String,
      default: '2 1 0.01' // Largeur, hauteur, profondeur
    },
    boxPosition: {
      type: String,
      default: '-0.1 1.5 -3.15' // Légèrement devant le texte pour éviter les problèmes de z-fighting
    }
  },
  methods: {
    hidepannel(event) {
    this.$emit('close-panel');
  }
  }
};


</script>

<template>

 <a-entity>
    <!-- Box comme fond pour le texte -->
    <a-box clickable @click="hidepannel" :color="boxColor" :position="boxPosition" :width="boxSize.split(' ')[0]" :height="boxSize.split(' ')[1]" :depth="boxSize.split(' ')[2]"></a-box>
    
    <!-- Texte du panneau -->
    <a-entity :text="'value: ' + textValue + '; color: ' + textColor" :position="textPosition" ></a-entity>
  </a-entity>
  
  </template>
