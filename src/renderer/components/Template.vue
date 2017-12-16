<template>
  <pre v-highlightjs="formattedTemplate" id="templatePagePreBlock">
		<code class="format" id="templatePageBlock"></code>
	</pre>
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
      if (this.format === 'json') {
        return JSON.stringify(
          this.$store.state.Template.template.build(),
          null,
          2
        );
      } else {
        return this.$store.state.Template.template.yaml();
      }
    }
  }
};
</script>

<style>
/*@import 'static/fonts/monofur.ttf';*/
@import '../assets/css/main.css';

#templatePagePreBlock {
  max-width: 100%;
  height: 100%;
  width: 100%;
}

#templatePageBlock {
  width: 100%;
}
</style>

