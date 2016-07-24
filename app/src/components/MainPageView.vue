<style scoped>
  #logo {
    height: 30px;
  }
</style>

<template>
  <header-view></header-view>
  <div class="container-fluid max-height no-overflow">
    <div class='row max-height'>
      <div class='col-sm-1 scrollable'>
        <side-bar></side-bar>
      </div>
      <div class='col-sm-11 scrollable'>
        <code-mirror :model.sync='templateText'></code-mirror>
      </div>
    </div>
  </div>
</template>

<script>
  import TestView from './MainPageView/TestView'
  import SideBar from './MainPageView/SideBar'
  import CodeMirror from './MainPageView/CodeMirror'
  import HeaderView from './HeaderView'

  import { getTemplate } from '../vuex/getters'

  export default {
    components: {
      TestView,
      SideBar,
      CodeMirror,
      HeaderView
    },
    data () {
      return {}
    },
    vuex: {
      getters: {
        templateText: getTemplate
      }
    },
    name: 'main-page'
  }
</script>
