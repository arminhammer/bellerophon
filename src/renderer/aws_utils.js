import AWS from 'aws-sdk';
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

export const listResources = {
  S3: {
    Bucket: async () => {
      const { Buckets } = await new AWS.S3().listBuckets().promise();
      return Buckets.map(r => ({
        title: r.Name,
        properties: { CreationDate: r.CreationDate, Name: r.Name }
      }));
    }
  }
};
