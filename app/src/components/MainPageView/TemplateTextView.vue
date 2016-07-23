<style scoped>
  code {
    background-color: rgba(40, 56, 76, .5);
    border-radius: 3px;
    color: #fff;
    font-weight: bold;
    padding: 3px 6px;
    margin: 0 3px;
    vertical-align: bottom;
  }

  p { line-height: 24px; }

  .templateText {
    font-size: 15px;
  }
</style>

<template>
  <div class="monofur">This is the Template Text Area</div>
  <codemirror :model.sync="code"></codemirror>
  <textarea class="monofur templateText" id='templateArea' cols=50 rows=50>{{ currentTemplate }}</textarea>
  <p>
    You are currently at <code>`{{ route.path }}`</code> on the <code>`{{ route.name }}`</code> view.
  </p>
  <div><p>Show: {{showToggle}}</p></div>
  <button v-on:click='toggle'>Toggle</button>
  <div v-if='showToggle' class='animated monofur' transition='bounce'><p>Hello!</p></div>
</template>

<script>
  import { getTemplate } from '../../vuex/getters'

  /* CodeMirror.fromTextArea(document.getElementById('templateArea'), {
    lineNumbers: true,
    mode: 'htmlmixed'
  })*/

  function toggle (event) {
    console.log('Clicked!')
    if (this.showToggle) this.showToggle = false
    else this.showToggle = true
  }

  export default {
    methods: {
      toggle: toggle
    },
    data () {
      return {
        route: this.$router._currentRoute,
        showToggle: true
      }
    },
    vuex: {
      getters: {
        currentTemplate: getTemplate
      }
    }
  }
</script>
