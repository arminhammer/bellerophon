<template>
				<v-layout v-if="resourceFetched">
					<v-flex xs12>
						<v-container fluid grid-list-md class="grey lighten-4">
							<v-layout row wrap>
								<v-flex

									v-bind="{ [`xs${card.flex}`]: true }"
									v-for="card in resources"
									:key="card.Name"
								>
									<v-card>
										<v-toolbar color="red" dark>
											<v-btn icon @click="toggleResource(card)">
												<v-icon>add_circle_outline</v-icon>
												</v-btn>
												<v-toolbar-title>{{ card.Name}}</v-toolbar-title>
												<v-spacer></v-spacer>

												<v-btn icon>
													<v-icon>low_priority</v-icon>
												</v-btn>
											</v-toolbar>
										<v-card-text
										v-for="(prop, p) in card.Properties"
										:key="p"
										>
											<div>{{ p }}: {{ prop }}
											</div>
										</v-card-text>
									</v-card>
								</v-flex>
							</v-layout>
						</v-container>
					</v-flex>
				</v-layout>
</template>

<script>
export default {
  name: 'aws-service',
  // components: { SystemInformation },
  methods: {
    toggleResource(resource) {
      console.log('toggling resource: ', resource);
      if (this.$store.state.Template.template.Resources[resource.Name]) {
        this.$store.dispatch('removeResourceFromTemplate', resource);
      } else {
        this.$store.dispatch('addResourceToTemplate', resource);
      }
    },
    updateActiveResource(s, r) {
      console.log('updating resource ', s, ' ', r);
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
    '$route.params.serviceName': function(serviceName) {
      console.log('serviceName changed: ', serviceName);
      this.$store.dispatch('setActiveService', serviceName);
      const resource = Object.keys(
        this.$store.state.Resource.resources[serviceName]
      )[0];
      this.$store.dispatch('setActiveResource', resource);
      this.updateActiveResource(serviceName, resource);
    },
    '$route.params.resourceName': function(resourceName) {
      const serviceName = this.$route.params.serviceName;
      console.log('resourceName changed: ', resourceName);
      this.$store.dispatch('setActiveResource', resourceName);
      this.updateActiveResource(serviceName, resourceName);
    }
  },
  beforeMount: function() {
    console.log('Mounting!');
    const serviceName = this.$route.params.serviceName;
    this.$store.dispatch('setActiveService', serviceName);
    const resource = Object.keys(
      this.$store.state.Resource.resources[serviceName]
    )[0];
    this.$store.dispatch('setActiveResource', resource);
    console.log('this: ', this);
    this.updateActiveResource(serviceName, resource);
  },
  computed: {
    resourceFetched: function() {
      return !this.$store.state.Resource.loading;
    },
    activeResource: function() {
      return this.$store.state.Resource.activeResource;
    },
    resourceTypes: function() {
      return this.$store.state.Resource.resources[
        this.$store.state.Resource.activeService
      ];
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
      ][this.$store.state.Resource.activeResource].items;
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
