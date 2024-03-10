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
      default: '2 1 0.01' 
    },
    boxPosition: {
      type: String,
      default: '-0.1 1.5 -3.15' 
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
    <a-box clickable @click="hidepannel" :color="boxColor" :position="boxPosition" :width="boxSize.split(' ')[0]" :height="boxSize.split(' ')[1]" :depth="boxSize.split(' ')[2]"></a-box>
    <a-entity :text="'value: ' + textValue + '; color: ' + textColor + '; width: 1.3'" :position="textPosition"></a-entity>
  </a-entity>
  
  </template>
