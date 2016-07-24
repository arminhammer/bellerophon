<style scoped>
  /* #sideBar {
    height: 100%;
  }*/

  .resourceBlock {
    border: 2px;
    border-color: #0a001f;
  }
</style>

<template>
  <div id='sideBar' class='pad40-top' >
    <!--class="animated"-->
    <div v-if=showToggle v-for='(index, block) in blocks' transition='bounceUp' stagger='1000'>
      <div class='resourceBlock'>
        <a v-link="{ name: 'resource-page', params: { resource: index }}">
          <img v-bind:src=block.image v-bind:alt=block.title />
        </a>
        <div>{{ block.title }}</div>
      </div>
    </div>
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
