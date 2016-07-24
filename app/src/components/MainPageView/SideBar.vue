<style scoped>
  #sideBar::-webkit-scrollbar {
    display: none;
  }

  .menuIcon {
    height: 6em;
    padding: 0px;
  }

  .sideMenu {
    overflow: hidden;
    top: 0;
    left: 0;
    height: 100%;
    list-style-type: none;
    margin: 0;
    padding-left: 12px;
    padding-right: -15px;
    background: #f7f7f7;
  }

  .sideMenu li a {
    display: block;
    text-indent: 0em;
    line-height: 5em;
    text-align: center;
    color: #999;
    position: relative;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    border-right: 1px solid rgba(0,0,0,0.05);
    -webkit-transition: background 0.1s ease-in-out;
    -moz-transition: background 0.1s ease-in-out;
    transition: background 0.1s ease-in-out;
  }

  .sideMenu li a:hover {
    background: #47a3da;
    color: #fff;
  }

  /*.sideMenu li.cbp-vicurrent a {
    background: #fff;
    color: #47a3da;
  }*/

  .sideMenu li a:before {
    font-family: 'Monofur';
    speak: none;
    font-style: normal;
    font-weight: normal;
    text-indent: 0em;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 1.4em;
    -webkit-font-smoothing: antialiased;
  }

</style>

<template>
  <div id='sideBar' class='pad50-top' >
    <!--class="animated"-->
    <ul class="sideMenu">
      <li v-if=showToggle v-for='(index, block) in blocks' transition='bounceUp' stagger='1000'>
        <a v-link="{ name: 'resource-page', params: { resource: index }}">
          <img v-bind:src=block.image v-bind:alt=index class='menuIcon' />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { getResourceMenuItems } from '../../vuex/getters'

  function toggle (event) {
    console.log('Clicked!')
    if (this.showToggle) this.showToggle = false
    else this.showToggle = true
  }

  export default {
    methods: {
      toggle: toggle
    },
    ready () {
      console.log('Loaded sidebar!')
      console.log(this.showToggle)
      // this.showToggle = false
      this.$nextTick(function () {
        console.log('Updated!') // => 'updated'
        this.showToggle = true
        console.log(this.showToggle)
      })
    },
    data () {
      return {
        showToggle: true,
        logo: require('../../assets/logo.svg'),
        blocks: {}
      }
    },
    computed: {
      blocks () {
        console.log(this.resourceList)
        let menuList = {}
        for (let resource in this.resourceList) {
          menuList[resource] = {
            image: require('../../assets/aws/' + this.resourceList[resource].image)
          }
        }
        return menuList
      }
    },
    vuex: {
      getters: {
        resourceList: getResourceMenuItems
      }
    }
  }
</script>
