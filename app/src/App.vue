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

  .scrollable {
    height: 100%;
    overflow: auto;
  }

  .container {
    /*padding-left: 0px;
    padding-right: 0px;*/
  }

  @font-face {
    font-family: Monofur;
    src: local("Monofur"),
    local("Monofur"),
    url(components/MainPageView/assets/fonts/Monofur.ttf);
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
