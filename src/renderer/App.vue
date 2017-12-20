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
      <div slot="header"><div class="awsIconContainer"><img :src="`../../static/svg/${s}.svg`" :alt="`${s}`" class="awsIcon"></div>{{ s }}</div>
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
            <v-list-tile-content class="resourceTileText">
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar fixed app :clipped-left="clipped">
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn
          icon
          @click.native.stop="clipped = !clipped"
        >
          <v-icon>web</v-icon>
        </v-btn>
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
				<v-progress-circular v-if="resourceFetching" indeterminate v-bind:width="3" color="red"></v-progress-circular>
        <v-btn
					v-else
          icon
          @click="refreshResources"
        >
				<v-icon>refresh</v-icon>
				</v-btn>
				<v-btn
          icon
          @click="saveTemplate"
        >
          <v-icon>save</v-icon>
        </v-btn>
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
    </v-app>
</template>

<script>
import Vue from 'vue';

import { spec, Template } from 'wolkenkratzer';
import * as AWS from 'aws-sdk';
import { ipcRenderer } from 'electron';
import { writeFile } from 'fs-extra';
import GitHub from 'github-api';
import notifier from 'node-notifier';
import semver from 'semver';
const { version } = require('../../package.json');

ipcRenderer.on('select-file', (event, result) => {
  writeFile(result.fileName, result.body).then(() =>
    console.log('Wrote file ', fileName)
  );
});

/** Check to see if we're on the newest version */
const _checkRelease = async function() {
  const gh = new GitHub();
  const repo = gh.getRepo('arminhammer', 'bellerophon');
  console.log('repo:');
  console.log(repo);
  const releaseList = await repo.listReleases();
  console.log(Array.isArray(releaseList.data));
  const latest_release = releaseList.data
    .filter(r => r.draft === false && r.prerelease === false)
    .sort((a, b) => semver.lt(a.tag_name, b.tag_name))[0].tag_name;
  console.log(latest_release);
  console.log(version);
  const newer = semver.gt(latest_release, version);
  console.log(newer);
  if (newer) {
    notifier.notify(`Version ${latest_release} of bellerophon is available!`);
  } else {
    notifier.notify('On newest version');
  }
};

export default {
  name: 'bellerophon',
  data() {
    return {
      services: this.$store.state.Resource.resources,
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
          title: 'Template',
          icon: 'home'
        },
        { icon: 'settings', title: 'Settings', to: '/settings' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false
    };
  },
  computed: {
    activeService: function() {
      return this.$store.state.Resource.activeService;
    },
    activeResource: function() {
      return this.$store.state.Resource.activeResource;
    },
    resourceFetching: function() {
      return this.$store.state.Resource.loading;
    },
    title: function() {
      if (this.$route.name === 'Service') {
        return `${this.$store.state.Resource.activeService} ${this.$store.state
          .Resource.activeResource}`;
      } else {
        return this.$route.name;
      }
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
  },
  beforeMount: async function() {
    console.log('Before App mount...');
    _checkRelease();
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    refreshResources() {
      this.$store.dispatch('updateAWSResource', {
        Service: this.activeService,
        Resource: this.activeResource,
        Settings: this.$store.state.Settings.settings
      });
    },
    saveTemplate() {
      ipcRenderer.send('save', {
        format: 'json',
        body: this.formattedTemplate
      });
    },
    selectService(selection) {
      this.$store.commit('SET_ACTIVE_SERVICE', selection);
    },
    selectResource(selection) {
      this.activeResource = selection;
    },
    toggleShowTemplate() {
      this.showTemplate = !this.showTemplate;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
@font-face {
  font-family: MonoFur;
  src: url('../../static/fonts/monofur.ttf');
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

.awsIconContainer {
  min-width: 56px;
  align-items: center;
  display: inline-block;
  height: 48px;
}

.awsIcon {
  height: 24px;
  width: 24px;
  vertical-align: middle;
  margin-top: 10px;
}

.expansion-panel__header {
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 0px;
  padding-bottom: 0px;
}

.expansion-panel__header div {
  align-items: flex-start;
  vertical-align: middle;
}

.list__tile__content {
  padding-left: 24px;
}
</style>
