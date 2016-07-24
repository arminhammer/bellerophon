<style>
  /* @import url(https://fonts.googleapis.com/css?family=Lato:300);*/

  /* * {
    margin: 0;
    padding: 0;
  }*/

  html,
  body {
    height: 100%;
    overflow: hidden;
  }

  .max-height {
    height: 100%;
  }

  .no-overflow {
    overflow: hidden;
  }

  .pad40-top {
    padding-top: 40px;
  }

  .pad50-top {
    padding-top: 50px;
  }

  .pad80-top {
    padding-top: 80px;
  }

  .scrollable {
    height: 100%;
    overflow: auto;
  }

  .scrollable::-webkit-scrollbar {
    display: none;
  }

  .container-fluid {
    padding-left: 0px;
    padding-right: 0px;
  }

  @font-face {
    font-family: Monofur;
    src: local("Monofur"),
    local("Monofur"),
    url(assets/fonts/Monofur.ttf);
    font-weight: bold;
  }

  .monofur {
    font-family: "Monofur";
  }

  .CodeMirror {
    height: auto;
  }

  .navbar-inner {
    height: 40px;
  }

  .col-sm-1, .col-sm-6, .col-sm-11 {
    padding: 0px;
  }
</style>

<template>
  <router-view></router-view>
</template>

<script>
  import store from 'src/vuex/store'
  export default {
    store
  }
</script>
