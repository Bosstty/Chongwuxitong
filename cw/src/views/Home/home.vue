<script setup lang="ts">
import BabylonScene from '../../components/BabylonScene.vue';
</script>

<template>
    <BabylonScene />
</template>

<style scoped>
#app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    width: 100%;
    height: 100%;
    text-align: center;
}
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
