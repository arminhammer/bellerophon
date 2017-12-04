<template>
  <v-app>
      <v-navigation-drawer
        fixed
		:mini-variant.sync="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        app
      >
			<v-expansion-panel expand>
    <v-expansion-panel-content v-for="(service, s) in services" :key="s">

      <div slot="header"><div class="menuSpan"><v-icon>apps</v-icon></div>{{ s }}</div>
			<v-list>
          <v-list-tile
						router
            :to="resource.to"
            :key="r"
            v-for="(resource, r) in services[s]"
						:params="resource"
            exact
          >
            <v-list-tile-content>
              <v-list-tile-title v-text="r"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
    </v-expansion-panel-content>
  </v-expansion-panel>
		<v-list>
          <v-list-tile
            router
            :to="item.to"
            :key="i"
            v-for="(item, i) in items"
						v-bind:itemid="i"
            exact
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
		<v-list>
          <v-list-tile
						router
            :to="item.to"
            :key="i"
            v-for="(item, i) in serviceMenuList"
						:params="item"
            exact
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar fixed app :clipped-left="clipped">
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn
          icon
          @click.native.stop="miniVariant = !miniVariant"
        >
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn>
        <v-btn
          icon
          @click.native.stop="clipped = !clipped"
        >
          <v-icon>web</v-icon>
        </v-btn>
        <v-btn
          icon
          @click.native.stop="fixed = !fixed"
        >
          <v-icon>remove</v-icon>
        </v-btn>
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click.native.stop="rightDrawer = !rightDrawer"
        >
          <v-icon>menu</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>
      <v-navigation-drawer
        temporary
        fixed
        :right="right"
        v-model="rightDrawer"
        app
				id="templateDrawer"
				width="50vw">
        <v-container>
          <v-slide-y-transition mode="out-in">
            <pre v-highlightjs="formattedTemplate" id="templatePreBlock"><code class="format" id="templateBlock"></code></pre>
          </v-slide-y-transition>
        </v-container>
      </v-navigation-drawer>
      <v-footer :fixed="fixed" app>
        <v-spacer></v-spacer>
        <span>&copy; 2017</span>
      </v-footer>
    </v-app>
</template>

<script>
//import SystemInformation from './LandingPage/SystemInformation'
import Vue from 'vue';

//import 'buefy/lib/buefy.css';
//import * as cfnstubs from 'cfn-doc-json-stubs';
import { spec, Template } from 'wolkenkratzer';
import * as AWS from 'aws-sdk';
import { ipcRenderer } from 'electron';
import { approvedServices } from './aws_utils';

export default {
  name: 'bellerophon',
  data() {
    return {
      activeService: this.$store.state.Resource.activeService,
      activeResource: this.$store.state.Resource.activeResource,
      services: this.$store.state.Resource.resources,
      // template: Template(),
      showTemplate: false,
      format: 'json',
      drawer: true,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          to: '/',
          router: true,
          title: 'Main',
          icon: 'home'
        },
        { icon: 'settings', title: 'Settings', to: '/settings' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Bellerophon'
    };
  },
  computed: {
    secondaryServiceList: function() {
      return []; // Object.keys(cfnstubs[this.activeService].Resources);
    },
    serviceMenuList: function() {
      return Object.keys(this.$store.state.Resource.resources)
        .filter(r => approvedServices.includes(r))
        .map(r => {
          return {
            icon: 'apps',
            title: r,
            to: `/service/${r}` //?name=${this.activeService}`
          };
        });
    },
    formattedTemplate: function() {
      console.log('formatter');
      //console.log(store);
      console.log(this.$store.state.Template.template);
      if (this.format === 'json') {
        return JSON.stringify(this.$store.state.Template.build(), null, 2);
      } else {
        return this.$store.state.Template.yaml();
        // return JSON.stringify(this.template.build(), null, 2)
      }
    }
  },
  // components: { SystemInformation },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    selectService(selection) {
      console.log(selection);
      this.$store.dispatch('setActiveService', selection);
      //this.activeService = selection;
      //this.activeResource = this.secondaryServiceList[0];
    },
    selectResource(selection) {
      console.log(selection);
      this.activeResource = selection;
    },
    toggleShowTemplate() {
      this.showTemplate = !this.showTemplate;
      ipcRenderer.send('open-template-window');
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
@font-face {
  font-family: MonoFur;
  src: url('/static/fonts/monofur.ttf');
}
/* Global CSS */
#templatePreBlock {
  width: 100%;
}
#templateBlock {
  font-family: MonoFur;
  width: 100%;
  height: 100%;
  font-size: 1em;
}
.menuSpan {
  width: 56px;
  display: inline-block;
}
#templateDrawer {
  width: 50vw;
}
</style>
