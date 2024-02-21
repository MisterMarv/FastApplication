<template>
    <HeaderComponent/>
    <router-view></router-view>
    <notifications />
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
export default {
  name: 'App',
  components: {
    HeaderComponent
  },
}
</script>

<style>
body {
  margin: 0 !important;
  overflow: hidden;
}
#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #2c3e50;
}
</style>
