<template>
	<div id="wrapper" light>
		<main>
			<div class="left-side">
				<span class="listTitle">
					{{ serviceName }}
				</span>
				<div v-for="(resource, r) in resourceTypes">
					<div class="activeResourceMenu" v-if="r === activeResource" :key="r">{{ r }}</div>
					<div class="resourceMenu" v-else @click="updateActiveResource(r)" :key="r">{{ r }}</div>
				</div>

			</div>

			<div class="right-side">
				<div class="doc">
					<div class="title">{{ activeResource }}</div>
					<p>
						electron-vue comes packed with detailed documentation that covers everything from internal configurations, using the project structure, building your application, and so much more.
					</p>
					<button @click="open('https://simulatedgreg.gitbooks.io/electron-vue/content/')">Read the Docs</button><br><br>
				</div>
				<div class="doc">
					<div class="title alt">Other Documentation</div>
					<button class="alt" @click="open('https://electron.atom.io/docs/')">Electron</button>
					<button class="alt" @click="open('https://vuejs.org/v2/guide/')">Vue.js</button>
				</div>
			</div>
			<v-layout column>
				<v-flex xs12 sm6 offset-sm3>
					<v-toolbar color="indigo" dark>
						<v-toolbar-side-icon></v-toolbar-side-icon>
						<v-toolbar-title>Discover</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-btn icon>
							<v-icon>search</v-icon>
						</v-btn>
					</v-toolbar>
					<v-container fluid grid-list-md class="grey lighten-4">
						<v-layout row wrap>
							<v-flex
								v-bind="{ [`xs${card.flex}`]: true }"
								v-for="card in resources"
								:key="card.title"
							>
								<v-card>
									<v-card-media
										:src="card.src"
										height="200px"
									>
										<v-container fill-height fluid>
											<v-layout fill-height>
												<v-flex xs12 align-end flexbox>
													<span class="headline white--text" v-text="card.title"></span>
												</v-flex>
											</v-layout>
										</v-container>
									</v-card-media>
									<v-card-actions class="white">
										<v-spacer></v-spacer>
										<v-btn icon>
											<v-icon>favorite</v-icon>
										</v-btn>
										<v-btn icon>
											<v-icon>bookmark</v-icon>
										</v-btn>
										<v-btn icon>
											<v-icon>share</v-icon>
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-flex>
						</v-layout>
					</v-container>
				</v-flex>
			</v-layout>
		</main>
	</div>
</template>

<script>
import { spec } from 'wolkenkratzer';
console.log(spec);
export default {
  name: 'aws-service',
  // components: { SystemInformation },
  methods: {
    updateActiveResource(r) {
      console.log('click ', r);
      console.log(this.$store);
      this.$store.dispatch('setActiveResource', r);
      //this. = r;
    }
  },
  data() {
    return {};
  },
  watch: {
    '$route.params.name': function(name) {
      console.log('name changed: ', name);
      this.$store.dispatch('setActiveService', name);
      this.$store.dispatch(
        'setActiveResource',
        Object.keys(spec[name].Resources)[0]
      );
      // this.activeResourceType = Object.keys(spec[name].Resources)[0];
    }
  },
  computed: {
    activeResource: function() {
      return this.$store.state.Resource.activeResource;
    },
    resourceTypes: function() {
      return spec[this.$store.state.Resource.activeService].Resources;
    },
    serviceName: function() {
      return this.$store.state.Resource.activeService;
    },
    resources: function() {
      console.log('resources');
      //console.log(store);
      console.log(this.$store.state.Resource);
      /*if (this.format === 'json') {
        return JSON.stringify(this.$store.state.Template.build(), null, 2);
      } else {
        return this.$store.state.Template.yaml();
        // return JSON.stringify(this.template.build(), null, 2)
			}*/
      return [];
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
@font-face {
  font-family: MonoFur;
  src: url('/static/fonts/monofur.ttf');
}

.resourceMenu {
  font-family: MonoFur;
  color: black;
}

.activeResourceMenu {
  font-family: MonoFur;
  color: green;
}

.listTitle {
  font-family: MonoFur;
  font-size: 30px;
  color: black;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>
