<style scoped>

</style>

<template>
  <div class='navbar navbar-fixed-top'>
    <div class='navbar-inner'>
      <div class='container'>
        header contents
      </div>
    </div>
  </div>

  <div class="container-fluid max-height no-overflow">
    <div class='row max-height'>
      <div class='col-md-2 scrollable'>
        <side-bar></side-bar>
      </div>
      <div class='col-md-10 scrollable'>
        <code-mirror :model.sync='templateText'></code-mirror>
      </div>
    </div>
  </div>
</template>

<script>
  import TestView from './MainPageView/TestView'
  import SideBar from './MainPageView/SideBar'
  import CodeMirror from './MainPageView/CodeMirror'

  import { getTemplate } from '../vuex/getters'

  export default {
    components: {
      TestView,
      SideBar,
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
