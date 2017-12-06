<template>
				<v-layout>
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
										class="cardList"
										>
										<v-flex xs12 v-if="hasStuff(prop)">
											<v-card>
												<v-toolbar color="white" light dense>
													<v-btn icon @click="toggleResource(card)">
														<v-icon>add_circle_outline</v-icon>
														</v-btn>
														<v-toolbar-title>{{ p }}</v-toolbar-title>
														<v-spacer></v-spacer>

														<v-btn icon>
															<v-icon>low_priority</v-icon>
														</v-btn>
													</v-toolbar>
													<v-card-text class="codeBlockText">
														<v-slide-y-transition mode="out-in">
															<pre v-highlightjs="JSON.stringify(prop,null,2)" id="templatePreBlock"><code class="format" id="templateBlock"></code></pre>
														</v-slide-y-transition>
													</v-card-text>
											</v-card>
										</v-flex>
										<!--
											<div v-if="hasStuff(prop)">{{ p }}: {{ prop }}
											</div>

											<v-list two-line subheader>
												<v-list-tile v-if="hasStuff(prop)" @click="">
													<v-list-tile-action>
														<v-checkbox v-model="notifications"></v-checkbox>
													</v-list-tile-action>
													<v-list-tile-content>
														<v-list-tile-title>{{ p }}</v-list-tile-title>
														<v-list-tile-sub-title>{{ prop }}</v-list-tile-sub-title>
														<v-divider></v-divider>
														<div>
															<v-card>
																<v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
															</v-card>
														</div>
													</v-list-tile-content>
													<v-list-tile-action>
														<v-icon>chat</v-icon>
													</v-list-tile-action>
												</v-list-tile>

												<v-subheader>Hangout notifications</v-subheader>
												<v-list-tile avatar>
													<v-list-tile-action>
														<v-checkbox v-model="notifications"></v-checkbox>
														<v-checkbox v-model="parameter"></v-checkbox>
													</v-list-tile-action>
													<v-list-tile-content>
														<v-list-tile-title>Notifications</v-list-tile-title>
														<v-list-tile-sub-title>Allow notifications</v-list-tile-sub-title>
													</v-list-tile-content>
												</v-list-tile>
												<v-list-tile avatar>
													<v-list-tile-action>
														<v-checkbox v-model="sound"></v-checkbox>
													</v-list-tile-action>
													<v-list-tile-content>
														<v-list-tile-title>Sound</v-list-tile-title>
														<v-list-tile-sub-title>Hangouts message</v-list-tile-sub-title>
													</v-list-tile-content>
												</v-list-tile>
												<v-list-tile avatar>
													<v-list-tile-action>
														<v-checkbox v-model="video"></v-checkbox>
													</v-list-tile-action>
													<v-list-tile-content>
														<v-list-tile-title>Video sounds</v-list-tile-title>
														<v-list-tile-sub-title>Hangouts video call</v-list-tile-sub-title>
													</v-list-tile-content>
												</v-list-tile>
												<v-list-tile avatar>
													<v-list-tile-action>
														<v-checkbox v-model="invites"></v-checkbox>
													</v-list-tile-action>
													<v-list-tile-content>
														<v-list-tile-title>Invites</v-list-tile-title>
														<v-list-tile-sub-title>Notify when receiving invites</v-list-tile-sub-title>
													</v-list-tile-content>
												</v-list-tile>

											</v-list>
												-->
										</v-card-text>

									</v-card>
								</v-flex>
							</v-layout>
						</v-container>
					</v-flex>
				</v-layout>
</template>

<script>
import { isEmpty } from 'lodash';
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
    },
    hasStuff(item) {
      return !isEmpty(item);
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
    },
    '$route.params.resourceName': function(resourceName) {
      const serviceName = this.$route.params.serviceName;
      console.log('resourceName changed: ', resourceName);
      this.$store.dispatch('setActiveResource', resourceName);
      if (
        !this.$store.state.Resource.resources[serviceName][resourceName]
          .lastUpdated &&
        !this.$store.state.Resource.loading
      ) {
        console.log('Condition triggered!');
        this.updateActiveResource(serviceName, resourceName);
      }
    }
  },
  beforeMount: function() {
    console.log('Mounting!');
    const serviceName = this.$route.params.serviceName;
    this.$store.dispatch('setActiveService', serviceName);
    const resourceName = Object.keys(
      this.$store.state.Resource.resources[serviceName]
    )[0];
    this.$store.dispatch('setActiveResource', resourceName);
    console.log('this: ', this);
    console.log('Mounting...');
    if (
      !this.$store.state.Resource.resources[serviceName][resourceName]
        .lastUpdated &&
      !this.$store.state.Resource.loading
    ) {
      console.log('Mounting Condition triggered!');
      this.updateActiveResource(serviceName, resourceName);
    }
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

.codeBlockText {
  padding: 0;
}

.cardList {
  padding-bottom: 0px;
  padding-top: 16px;
}
</style>
