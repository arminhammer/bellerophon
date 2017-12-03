export const approvedServices = ['EC2', 'S3'];

export const S3 = {
  Bucket: {
    list: function() {
      return [{ title: 'bucket-0' }, { title: 'bucket-1' }];
    }
  },
  BucketPolicy: {
    list: function() {
      return [{ title: 'policy-0' }, { title: 'policy-1' }];
    }
  }
};
