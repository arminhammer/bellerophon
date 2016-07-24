<style scoped>
  /* code {
    background-color: rgba(40, 56, 76, .5);
    border-radius: 3px;
    color: #fff;
    font-weight: bold;
    padding: 3px 6px;
    margin: 0 3px;
    vertical-align: bottom;
  }*/

  p { line-height: 24px; }
</style>

<template>
  <div id='templateArea' class='pad50-top'></div>
</template>

<script>
  import '../../../node_modules/codemirror/lib/codemirror.css'
  import CodeMirror from '../../../node_modules/codemirror/lib/codemirror'

  function initCodeMirror () {
    var vm = this
    console.log('Loading!')
    console.log(vm)

    var cm = CodeMirror(vm.$el, {
      mode: 'javascript',
      lineNumbers: true,
      lineWrapping: true,
      readOnly: true
    })

    cm.on('change', function () {
      // vm.$set('model', cm.getValue())
      // Add { silent: true }  as 3rd arg?
    })

    // Set the initial value
    cm.setValue(vm.model)

    this.$watch('model', function (value) {
      if (value !== cm.getValue()) {
        cm.setValue(value)
      }
    })
  }

  export default {
    props: ['model'],
    ready: function () {
      console.log('Ready!')
      this.$nextTick(initCodeMirror)
    }
  }
</script>
