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
												<v-icon v-if="templateInternal[`${serviceName}.${resourceName}.${card.Name}`]">add_circle</v-icon>
												<v-icon v-else>add_circle_outline</v-icon>
												</v-btn>
												<v-toolbar-title>{{ card.Name }}</v-toolbar-title>
												<v-spacer></v-spacer>

												<v-btn v-if="templateInternal[`${serviceName}.${resourceName}.${card.Name}.output`]" dark color="indigo" icon @click="toggleResourceOutput(card)">
													<v-icon>low_priority</v-icon>
												</v-btn>
												<v-btn v-else icon @click="toggleResourceOutput(card)">
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
													<v-btn icon @click="toggleResourceAttribute(p, card)">
														<v-icon v-if="templateInternal[`${serviceName}.${resourceName}.${card.Name}.property.${p}`]">add_circle</v-icon>
														<v-icon v-else>add_circle_outline</v-icon>
														</v-btn>
														<v-toolbar-title>{{ p }}</v-toolbar-title>
														<v-spacer></v-spacer>
														<v-select
															label="Link to..."
															v-bind:items="linkTargetList"
															item-text="name"
															item-value="name"
															max-height="auto"
															autocomplete
															:value="templateInternal[`${serviceName}.${resourceName}.${card.Name}.property.${p}.link`]"
															@input="onResourceAttributeLink({ resource: card.Name, attributeName: p, event: $event })"
														>
															<!--<template slot="selection" slot-scope="data">
																<v-chip
																	close
																	@input="data.parent.selectItem(data.item)"
																	:selected="data.selected"
																	class="chip--select-multi"
																	:key="JSON.stringify(data.item)"
																>
																	<v-avatar>
																		<img :src="data.item.avatar">
																	</v-avatar>
																	{{ data.item.name }}
																</v-chip>
															</template>
															<template slot="item" slot-scope="data">
																<template v-if="typeof data.item !== 'object'">
																	<v-list-tile-content v-text="data.item"></v-list-tile-content>
																</template>
																<template v-else>
																	<v-list-tile-avatar>
																		<img v-bind:src="data.item.avatar"/>
																	</v-list-tile-avatar>
																	<v-list-tile-content>
																		<v-list-tile-title v-html="data.item.name"></v-list-tile-title>
																		<v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
																	</v-list-tile-content>
																</template>
															</template>-->
														</v-select>
														<v-btn v-if="templateInternal[`${serviceName}.${resourceName}.${card.Name}.property.${p}.param`]" icon dark color="indigo" @click="toggleResourceAttributeParameter(p, card)">
															<v-icon>assignment</v-icon>
														</v-btn>
														<v-btn v-else icon @click="toggleResourceAttributeParameter(p, card)">
															<v-icon>assignment</v-icon>
														</v-btn>
														<v-btn v-if="templateInternal[`${serviceName}.${resourceName}.${card.Name}.property.${p}.output`]" dark color="indigo" icon @click="toggleResourceAttributeOutput(p, card)">
															<v-icon>low_priority</v-icon>
														</v-btn>
														<v-btn v-else icon @click="toggleResourceAttributeOutput(p, card)">
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
										</v-card-text>

									</v-card>
								</v-flex>
							</v-layout>
						</v-container>
					</v-flex>
				</v-layout>
</template>

<script>
import { isEmpty, get } from 'lodash';
import { spec } from 'wolkenkratzer';
export default {
  name: 'aws-service',
  methods: {
    toggleResource(resource) {
      if (this.$store.state.Template.template.Resources[resource.Name]) {
        this.$store.commit('REMOVE_RESOURCE', {
          resource,
          resourceName: this.resourceName,
          serviceName: this.serviceName
        });
      } else {
        this.$store.commit('ADD_RESOURCE', {
          resource,
          resourceName: this.resourceName,
          serviceName: this.serviceName
        });
      }
    },
    toggleResourceOutput(resource) {
      if (
        this.$store.state.Template.template.Outputs[`${resource.Name}Output`]
      ) {
        this.$store.commit('REMOVE_OUTPUT_RESOURCE', {
          resource,
          resourceName: this.resourceName,
          serviceName: this.serviceName
        });
      } else {
        this.$store.commit('ADD_OUTPUT_RESOURCE', {
          resource,
          resourceName: this.resourceName,
          serviceName: this.serviceName
        });
      }
    },
    toggleResourceAttribute(attributeName, resource) {
      if (
        this.$store.state.Template.internal[
          `S3.Bucket.${resource.Name}.property.${attributeName}`
        ]
      ) {
        this.$store.commit('REMOVE_RESOURCE_ATTRIBUTE', {
          attributeName,
          resource,
          resourceName: this.resourceName,
          serviceName: this.serviceName
        });
      } else {
        this.$store.commit('ADD_RESOURCE_ATTRIBUTE', {
          attributeName,
          resource,
          resourceName: this.resourceName,
          serviceName: this.serviceName
        });
      }
    },
    toggleResourceAttributeOutput(attributeName, resource) {
      if (
        this.$store.state.Template.template.Outputs[
          `${resource.Name}${attributeName}Output`
        ]
      ) {
        this.$store.commit('REMOVE_OUTPUT_RESOURCE_ATTRIBUTE', {
          attributeName,
          resource,
          resourceName: this.resourceName,
          serviceName: this.serviceName
        });
      } else {
        this.$store.commit('ADD_OUTPUT_RESOURCE_ATTRIBUTE', {
          attributeName,
          resource,
          resourceName: this.resourceName,
          serviceName: this.serviceName
        });
      }
    },
    toggleResourceAttributeParameter(attributeName, resource) {
      if (
        this.$store.state.Template.template.Parameters[
          `${resource.Name}${attributeName}Param`
        ]
      ) {
        this.$store.commit('REMOVE_PARAMETER_RESOURCE_ATTRIBUTE', {
          attributeName,
          resource,
          resourceName: this.resourceName,
          serviceName: this.serviceName
        });
      } else {
        this.$store.commit('ADD_PARAMETER_RESOURCE_ATTRIBUTE', {
          attributeName,
          resource,
          resourceName: this.resourceName,
          serviceName: this.serviceName
        });
      }
    },
    updateActiveResource(s, r) {
      this.$store.commit('SET_ACTIVE_RESOURCE', r);
      this.$store.dispatch('updateAWSResource', {
        Service: s,
        Resource: r
      });
      //this. = r;
    },
    hasStuff(item) {
      return !isEmpty(item);
    },
    onResourceAttributeLink({ resource, attributeName, event }) {
      this.$store.commit('LINK_RESOURCE_ATTRIBUTE', {
        resource,
        attributeName,
        linkTarget: event,
        resourceName: this.resourceName,
        serviceName: this.serviceName
      });
    }
  },
  watch: {
    '$route.params.serviceName': function(serviceName) {
      this.$store.commit('SET_ACTIVE_SERVICE', serviceName);
      console.log('Changing service...');
      const resource = Object.keys(
        this.$store.state.Resource.resources[serviceName]
      )[0];
      this.$store.commit('SET_ACTIVE_RESOURCE', resource);
    },
    '$route.params.resourceName': function(resourceName) {
      console.log('Changing resource...');
      const serviceName = this.$route.params.serviceName;
      this.$store.commit('SET_ACTIVE_RESOURCE', resourceName);
      if (
        !this.$store.state.Resource.resources[serviceName][resourceName]
          .lastUpdated &&
        !this.$store.state.Resource.loading
      ) {
        this.updateActiveResource(serviceName, resourceName);
      }
    }
  },
  beforeMount: function() {
    console.log('Before mount...');
    const serviceName = this.$route.params.serviceName;
    const resourceName = this.$route.params.resourceName;
    this.$store.commit('SET_ACTIVE_SERVICE', serviceName);
    /*const resourceName = Object.keys(
      this.$store.state.Resource.resources[serviceName]
    )[0];*/
    this.$store.commit('SET_ACTIVE_RESOURCE', resourceName);
    if (
      !this.$store.state.Resource.resources[serviceName][resourceName]
        .lastUpdated &&
      !this.$store.state.Resource.loading
    ) {
      this.updateActiveResource(serviceName, resourceName);
    }
  },
  computed: {
    resourceFetched: function() {
      return !this.$store.state.Resource.loading;
    },
    resourceName: function() {
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
      return this.$store.state.Resource.resources[this.serviceName][
        this.resourceName
      ].items;
    },
    templateInternal: function() {
      return this.$store.state.Template.internal;
    },
    linkTargetList: function() {
      return this.$store.state.Template.linkTargetList;
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
