<template>
  <div class="home">
    hello
    <b-link @click="logout()">Logout</b-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {

    }
  },
  methods: {
    logout () {
      localStorage.removeItem('jwtToken');
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
