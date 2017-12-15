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
															v-bind:items="linkOptions"
															item-text="name"
															item-value="name"
															max-height="auto"
															autocomplete
															:value="templateInternal[`${serviceName}.${resourceName}.${card.Name}.property.${p}.link`]"
															@input="onResourceAttributeLink({ resource: card.Name, attribute: p, event: $event })"
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
    toggleResourceOutput(resource) {
      console.log('toggling resource output status: ', resource.Name);
      if (
        this.$store.state.Template.template.Outputs[`${resource.Name}Output`]
      ) {
        this.$store.dispatch('removeOutputResourceFromTemplate', resource);
      } else {
        this.$store.dispatch('addOutputResourceToTemplate', resource);
      }
    },
    toggleResourceAttribute(paramName, resource) {
      console.log('toggling resource attribute status: ', paramName);
      console.log(
        'state: ',
        `S3.Bucket.${resource.Name}.property.${paramName}`,
        ' ',
        this.$store.state.Template.internal[
          `S3.Bucket.${resource.Name}.property.${paramName}`
        ]
      );
      if (
        this.$store.state.Template.internal[
          `S3.Bucket.${resource.Name}.property.${paramName}`
        ]
      ) {
        this.$store.commit('REMOVE_RESOURCE_ATTRIBUTE', {
          paramName,
          resource
        });
      } else {
        this.$store.commit('ADD_RESOURCE_ATTRIBUTE', {
          paramName,
          resource
        });
      }
    },
    toggleResourceAttributeOutput(paramName, resource) {
      console.log(
        'toggling resource attribute output status: ',
        paramName,
        ' ',
        resource.Name
      );
      //this.$store.dispatch('addOutputResourceToTemplate', resourceName);
      if (
        this.$store.state.Template.template.Outputs[
          `${resource.Name}${paramName}Output`
        ]
      ) {
        this.$store.dispatch('removeOutputResourceAttributeFromTemplate', {
          paramName,
          resource
        });
      } else {
        this.$store.dispatch('addOutputResourceAttributeToTemplate', {
          paramName,
          resource
        });
      }
    },
    toggleResourceAttributeParameter(paramName, resource) {
      console.log('toggling resource attribute parameter status: ', paramName);
      //this.$store.dispatch('addOutputResourceToTemplate', resourceName);
      if (
        this.$store.state.Template.template.Parameters[
          `${resource.Name}${paramName}Param`
        ]
      ) {
        this.$store.commit('REMOVE_PARAMETER_RESOURCE_ATTRIBUTE', {
          paramName,
          resource
        });
      } else {
        this.$store.commit('ADD_PARAMETER_RESOURCE_ATTRIBUTE', {
          paramName,
          resource
        });
        /*this.$store.dispatch(
          'addParameterResourceAttributeToTemplate',
          resource
        );*/
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
    },
    _get(obj, path) {
      console.log('getting....');
      console.log('obj: ', obj, ' path ', path);
      const result = get(obj, path, false);
      console.log('result: ', result);
      return get(obj, path, false);
    },
    onResourceAttributeLink({ resource, attribute, event }) {
      console.log('Selected! ', resource, ' ', attribute, ' ', event);
      this.$store.commit('LINK_RESOURCE_ATTRIBUTE', {
        resource,
        attribute,
        linkTarget: event
      });
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
      console.log('resources');
      //console.log(store);
      console.log(
        this.$store.state.Resource.resources[this.serviceName][
          this.resourceName
        ]
      );
      /*if (this.format === 'json') {
        return JSON.stringify(this.$store.state.Template.build(), null, 2);
      } else {
        return this.$store.state.Template.yaml();
        // return JSON.stringify(this.template.build(), null, 2)
			}*/
      return this.$store.state.Resource.resources[this.serviceName][
        this.resourceName
      ].items;
    },
    templateInternal: function() {
      return this.$store.state.Template.internal;
    },
    presentInTemplate: function() {
      const result = { [this.serviceName]: { [this.resourceName]: {} } };
      console.log('present result: ', result);
      console.log('present resources: ', this.resources);
      Object.keys(this.resources).forEach(r => {
        const present = this.$store.state.Template.template.Resources[
          this.resources[r].Name
        ]
          ? true
          : false;
        result[this.serviceName][this.resourceName][this.resources[r].Name] = {
          present: present,
          properties: {}
        };
        if (present) {
          Object.keys(
            this.$store.state.Template.template.Resources[
              this.resources[r].Name
            ].Properties
          ).forEach(prop => {
            console.log('prop: ', prop);
            /*result[this.serviceName][this.resourceName][
              this.resources[r].Name
						].properties[prop] = { present: true };
						*/
            result[
              `${this.serviceName}.${this.resourceName}.${this.resources[r]
                .Name}.${prop}`
            ] = true;
          });
          if (
            this.$store.state.Template.template.Outputs[
              `${this.resources[r].Name}Output`
            ]
          ) {
            result[this.serviceName][this.resourceName][
              this.resources[r].Name
            ].output = true;
          }
        }
      });
      console.log('present result: ', result);
      return result;
      /*return {
        S3: {
          Bucket: {
            'arming-us-west-2S3Bucket': {
              present: true
            },
            'arminhammer-cloudtrailS3Bucket': {
              present: false
            }
          }
        }
			};*/
    },
    linkOptions: function() {
      const list = [{ name: 'N/A' }];
      const parameters = Object.keys(
        this.$store.state.Template.template.Parameters
      ).map(x => ({ name: x, type: 'Parameter' }));
      return list.concat(parameters);
      //return ['N/A', 'Option 1', 'Option 2'];
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
