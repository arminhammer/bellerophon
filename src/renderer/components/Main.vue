<template>
	<v-container fluid class="pa-0">
        <v-container>
            <h2>Main</h2>
            <p>This is an example template using <a href="http://vuejs.org" target="_blank">Vue.js</a> and <a href="http://vuetifyjs.com" target="_blank">Vuetify</a>. You can use this example by installing it using the <a href="https://github.com/vuejs/vue-cli">vue-cli</a>.</p>
            <code class="px-3">
    $ npm install -g vue-cli
    $ vue init disjfa/vuetify-sidebar-template my-project
    $ cd my-project
    $ npm install
    $ npm run dev
            </code>
        </v-container>
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
  }
};
</script>

<style>
/*@import 'static/fonts/monofur.ttf';*/
@import '../assets/css/main.css';
</style>

