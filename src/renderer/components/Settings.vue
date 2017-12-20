<template>
	<div id="wrapper">
		<main>
			<div>
				<span class="title">
					Settings
				</span>
				<v-switch v-bind:label="`Proxy Enabled`" v-model="proxy"></v-switch>
				<v-text-field
					v-model="proxyString"
					label="Proxy String"
				></v-text-field>
				<v-text-field
					v-model="profile"
					label="AWS Profile"
				></v-text-field>
				<v-text-field
					v-model="region"
					label="AWS Region"
				></v-text-field>
				<v-text-field
					type="number"
					min=0
					max=100
					step=1
					v-model="maxRetries"
					label="Max Retries"
				></v-text-field>
			</div>
		</main>
	</div>
</template>

<script>
export default {
  name: 'settings',
  computed: {
    proxy: {
      get() {
        return this.$store.state.Settings.settings.proxy;
      },
      set(x) {
        this.$store.commit('SET_SETTING', { key: 'proxy', value: x });
      }
    },
    proxyString: {
      get() {
        return this.$store.state.Settings.settings.proxyString;
      },
      set(x) {
        this.$store.commit('SET_SETTING', { key: 'proxyString', value: x });
      }
    },
    profile: {
      get() {
        return this.$store.state.Settings.settings.profile;
      },
      set(x) {
        this.$store.commit('SET_SETTING', { key: 'profile', value: x });
      }
    },
    region: {
      get() {
        return this.$store.state.Settings.settings.region;
      },
      set(x) {
        this.$store.commit('SET_SETTING', {
          key: 'region',
          value: x
        });
      }
    },
    maxRetries: {
      get() {
        return this.$store.state.Settings.settings.maxRetries;
      },
      set(x) {
        this.$store.commit('SET_SETTING', {
          key: 'maxRetries',
          value: parseInt(x)
        });
      }
    }
  },
  // components: { SystemInformation },
  methods: {
    updateSetting(e, s) {
      console.log('Update...');
      console.log(e);
      console.log(s);
      // this.$store.commit('SET_SETTING', { keye.target.value)
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

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
