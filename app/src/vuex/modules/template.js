import {} from '../mutation-types'

const state = {
  template: {
    'Resources': {
      'myinstance': {
        'Type': 'AWS::EC2::Instance',
        'Properties': {
          'ImageId': 'ami-951945d0',
          'InstanceType': 't2.micro'
        }
      }
    },
    'AWSTemplateFormatVersion': '2010-09-09'
  }
}

const mutations = {

}

export default {
  state,
  mutations
}
