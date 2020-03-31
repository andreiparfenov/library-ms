<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <BookComponent />
  </div>
</template>

<script>
import BookComponent from './components/BookComponent.vue'

export default {
  name: 'App',
  components: {
    BookComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
