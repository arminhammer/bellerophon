<template>
	<div id="wrapper" light>
		<main>
			<div class="left-side">
				<span class="listTitle">
					{{ serviceName }}
				</span>
				<div v-for="(resource, r) in resourceTypes">
					<div class="activeResourceMenu" v-if="r === activeResource" :key="r">{{ r }}</div>
					<div class="resourceMenu" v-else @click="updateActiveResource(serviceName, r)" :key="r">{{ r }}</div>
				</div>

			</div>

			<div class="right-side">
				<v-layout column>
					<v-flex xs12 sm6 offset-sm3>
						<v-toolbar color="indigo" dark>
							<v-toolbar-side-icon></v-toolbar-side-icon>
							<v-toolbar-title>{{ activeResource}}</v-toolbar-title>
						</v-toolbar>
						<v-container fluid grid-list-md class="grey lighten-4">
							<v-layout row wrap>
								<v-flex
									v-bind="{ [`xs${card.flex}`]: true }"
									v-for="card in resources"
									:key="card.title"
								>
									<v-card>
										<v-card-title primary-title>
											<div>
												<div class="headline">{{ card.title}}</div>
												<span class="grey--text">1,000 miles of wonder</span>
											</div>
										</v-card-title>
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
			</div>
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
    updateActiveResource(s, r) {
      console.log('updating resource ', s, ' ', r);
      console.log(this.$store);
      this.$store.dispatch('setActiveResource', r);
      this.$store.dispatch('updateAWSResource', {
        Service: s,
        Resource: r
      });
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
      const resource = Object.keys(spec[name].Resources)[0];
      this.$store.dispatch('setActiveResource', resource);
      this.updateActiveResource(name, resource);
      // this.activeResourceType = Object.keys(spec[name].Resources)[0];
    }
  },
  beforeMount: function() {
    console.log('Mounting!');
    const name = this.$route.params.name;
    this.$store.dispatch('setActiveService', name);
    const resource = Object.keys(spec[name].Resources)[0];
    this.$store.dispatch('setActiveResource', resource);
    console.log('this: ', this);
    this.updateActiveResource(this.$route.params.name, resource);
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
      console.log(
        this.$store.state.Resource.resources[
          this.$store.state.Resource.activeService
        ][this.$store.state.Resource.activeResource]
      );
      /*if (this.format === 'json') {
        return JSON.stringify(this.$store.state.Template.build(), null, 2);
      } else {
        return this.$store.state.Template.yaml();
        // return JSON.stringify(this.template.build(), null, 2)
			}*/
      return this.$store.state.Resource.resources[
        this.$store.state.Resource.activeService
      ][this.$store.state.Resource.activeResource];
    }
  }
};
</script>

<style>
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
