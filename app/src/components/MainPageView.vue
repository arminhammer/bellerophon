<style scoped>

  img {
    margin-top: -25px;
    width: 450px;
  }
</style>

<template>
  <div>
    <img src="MainPageView/assets/logo.png" alt="electron-vue">
    <h1>Welcome to the Main Page.</h1>
    <test-view></test-view>
  </div>
</template>

<script>
  import TestView from './MainPageView/TestView'

  export default {
    components: {
      TestView
    },
    name: 'main-page'
  }
</script>
