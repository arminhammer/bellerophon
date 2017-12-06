<template>
<v-container id="templateContainer">
  <pre v-highlightjs="formattedTemplate" id="templatePreBlock0">
		<code class="format" id="templateBlock"></code>
	</pre>
	</v-container>
</template>

<script>
export default {
  name: 'main',
  // components: { SystemInformation },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  },
  computed: {
    format: function() {
      return 'json';
    },
    formattedTemplate: function() {
      console.log('formatter');
      //console.log(store);
      console.log(this.$store.state.Template.template);
      if (this.format === 'json') {
        return JSON.stringify(
          this.$store.state.Template.template.build(),
          null,
          2
        );
      } else {
        return this.$store.state.Template.template.yaml();
        // return JSON.stringify(this.template.build(), null, 2)
      }
    }
  }
};
</script>

<style>
/*@import 'static/fonts/monofur.ttf';*/
@import '../assets/css/main.css';

#templateContainer {
  align-items: flex-start;
}
#templatePreBlock0 {
  height: 100%;
}
</style>

