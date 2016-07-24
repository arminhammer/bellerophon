<style>
  #logo {
    height: 30px;
  }
</style>
<template>
  <div class='navbar navbar-default navbar-fixed-top'>
    <div class='container-fluid'>
      <div class="navbar-header">
        <a class="navbar-brand" v-link='{ name: "main-page" }'>
          <img id='logo' alt="Bellerophon" v-bind:src=logo />
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        logo: require('./MainPageView/assets/logo.svg')
      }
    },
    components: {}
  }
</script>
