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
      <code-mirror :model.sync="templateText"></code-mirror>
    <textarea>{{ templateText }}</textarea>
  </div>
</template>

<script>
  import TestView from './MainPageView/TestView'
  import CodeMirror from './MainPageView/CodeMirror'

  import { getTemplate } from '../vuex/getters'

  export default {
    components: {
      TestView,
      CodeMirror
    },
    /* data: {
      templateText: this.getTemplate()
    },*/
    vuex: {
      getters: {
        templateText: getTemplate
      }
    },
    name: 'main-page'
  }
</script>
