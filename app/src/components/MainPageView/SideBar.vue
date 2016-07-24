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

  .sideMenu li a:hover,
  .sideMenu li:first-child a{
    background: #47a3da;
    color: #fff;
  }

  .sideMenu li.cbp-vicurrent a {
    background: #fff;
    color: #47a3da;
  }

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

  .sideMenu li a.icon-logo:before {
    content: "C";
    font-weight: 700;
    font-size: 300%;
    font-family: 'Lato', Calibri, Arial, sans-serif;
  }


</style>

<template>
  <div id='sideBar' class='pad50-top' >
    <!--class="animated"-->
    <ul class="sideMenu">
      <li v-if=showToggle v-for='(index, block) in blocks' transition='bounceUp' stagger='1000'>
        <a v-link="{ name: 'resource-page', params: { resource: index }}">
          <img v-bind:src=block.image v-bind:alt=block.title class='menuIcon' />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  function toggle (event) {
    console.log('Clicked!')
    if (this.showToggle) this.showToggle = false
    else this.showToggle = true
  }

  let imagePrefix = './assets/aws/'

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
        logo: require('./assets/logo.svg'),
        blocks: {
          apigateway: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'Apigateway'
          },
          autoscaling: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling'
          },
          cloudformation: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'Cloudformation'
          },
          cloudFront: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling'
          },
          cloudTrail: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          cloudWatch: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          codeDeploy: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          codePipeline: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          config: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          dataPipeline: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          directoryService: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          dynamoDB: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          ec2: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2.svg'),
            title: 'EC2'
          },
          ecr: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          ecs: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          efs: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          elastiCache: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          elasticBeanstalk: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          elasticLoadBalancing: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          elasticsearch: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          emr: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          events: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          gameLift: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          iam: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          iot: {
            mage: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          kinesis: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          kinesisFirehose: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          kms: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          lambda: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          logs: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          opsWorks: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          rds: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          redshift: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          route53: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          s3: {
            image: require(imagePrefix + 'Storage & Content Delivery/Storage-Content-Delivery_AmazonS3.svg'),
            title: 'S3'
          },
          sdb: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          sns: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          sqs: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          ssm: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          waf: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' },
          workSpaces: {
            image: require(imagePrefix + 'Compute/Compute_AmazonEC2_AutoScaling.svg'),
            title: 'AutoScaling' }
        }
      }
    }
  }
</script>
