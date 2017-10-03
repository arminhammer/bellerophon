<template>
	<div>
		<nav class="navbar is-black" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<a class="navbar-item" href="http://bulma.io">
					Bellerophon
				</a>
				<button class="button is-pulled-right" v-on:click="toggleShowTemplate()">Show Template</button>
			</div>
		</nav>
		<section class="section">
			<div class="container">
				<div class="columns">
					<div class="column is-2">
						<aside class="menu">
							<div v-for="service in serviceList" v-bind:key="service">
								<p class="menu-label" v-on:click="selectService(service)">{{ service }}</p>
								<ul v-if="service === activeService" class="menu-list" v-for="r in secondaryServiceList" v-bind:key="r">
									<li>
										<span v-on:click="selectResource(r)">{{ r }}</span>
									</li>
								</ul>
							</div>
							<ul class="menu-list">
								<li>
									<a>Dashboard</a>
								</li>
								<li>
									<a>Customers</a>
								</li>
							</ul>
							<p class="menu-label">
								Administration
							</p>
							<ul class="menu-list">
								<li>
									<a>Team Settings</a>
								</li>
								<li>
									<a class="is-active">Manage Your Team</a>
									<ul>
										<li>
											<a>Members</a>
										</li>
										<li>
											<a>Plugins</a>
										</li>
										<li>
											<a>Add a member</a>
										</li>
									</ul>
								</li>
								<li>
									<a>Invitations</a>
								</li>
								<li>
									<a>Cloud Storage Environment Settings</a>
								</li>
								<li>
									<a>Authentication</a>
								</li>
							</ul>
							<p class="menu-label">
								Transactions
							</p>
							<ul class="menu-list">
								<li>
									<a>Payments</a>
								</li>
								<li>
									<a>Transfers</a>
								</li>
								<li>
									<a>Balance</a>
								</li>
							</ul>
						</aside>
					</div>
					<div class="column is-2">
						<div v-for="service in serviceList" v-bind:key="service">
							<span v-on:click="selectService(service)">{{ service }}</span>
						</div>
					</div>
					<div class="column is-2">
						<div v-for="r in secondaryServiceList" v-bind:key="r">
							<span v-on:click="selectResource(r)">{{ r }}</span>
						</div>
					</div>
					<div class="column">
						<h1 class="title">
							{{ activeService }} {{ activeResource }}s
						</h1>
						<p class="subtitle">
							My first website with
							<strong>Bulma</strong>!
						</p>
					</div>
				</div>
			</div>
			<div class="modal is-active" v-if="showTemplate">
				<div class="modal-background"></div>
				<div class="modal-card">
					<header class="modal-card-head">
						<p class="modal-card-title">CloudFormation Template</p>
						<div class="control">
							<input type="radio" id="json" value="json" v-model="format"> Json
							<input type="radio" id="yaml" value="yaml" v-model="format"> Yaml
						</div>
						<button class="delete" aria-label="close" v-on:click="toggleShowTemplate()"></button>
					</header>
					<section class="modal-card-body">
						<pre v-highlightjs="formattedTemplate"><code class="format"></code></pre>
					</section>
					<footer class="modal-card-foot">
						<button class="button is-success">Save changes</button>
						<button class="button">Cancel</button>
					</footer>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
//import SystemInformation from './LandingPage/SystemInformation'
import Vue from 'vue'
import Buefy from 'buefy'
import VueHighlightJS from 'vue-highlightjs'
import highlightcss from 'highlight.js/styles/tomorrow-night-eighties.css'
import 'buefy/lib/buefy.css'
import * as cfnstubs from 'cfn-doc-json-stubs'
import * as wk from 'wolkenkratzer'
import * as AWS from 'aws-sdk'

Vue.use(Buefy)
Vue.use(VueHighlightJS)

export default {
	name: 'main',
	data() {
		return {
			activeService: 'S3',
			activeResource: 'Bucket',
			serviceList: cfnstubs.resourceList.sort(),
			template: new wk.Template(),
			showTemplate: false,
			format: 'json'
		}
	},
	computed: {
		secondaryServiceList: function() { return Object.keys(cfnstubs[this.activeService].Resources) },
		formattedTemplate: function() {
			if (this.format === 'json') {
				return JSON.stringify(this.template.build(), null, 2)
			} else {
				return this.template.yaml()
				//return JSON.stringify(this.template.build(), null, 2)
			}
		}

	},
	//components: { SystemInformation },
	methods: {
		open(link) {
			this.$electron.shell.openExternal(link)
		},
		selectService(selection) {
			console.log(selection);
			this.activeService = selection;
			this.activeResource = this.secondaryServiceList[0];
		},
		selectResource(selection) {
			console.log(selection);
			this.activeResource = selection;
		},
		toggleShowTemplate() {
			this.showTemplate = !this.showTemplate
		}
	}
}
</script>

<style>
/*@import 'static/fonts/monofur.ttf';*/
</style>
