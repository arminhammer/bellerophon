import AWS from 'aws-sdk';
import { Transform } from 'wolkenkratzer';
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
      const resourceBlocks = await Promise.all(
        Buckets.slice(0, 2).map(b =>
          Transform.S3.Bucket(b.Name, AWS, `${b.Name}S3Bucket`)
        )
      );
      console.log('resourceBlock: ', resourceBlocks);
      return {
        to: '/service/S3/Bucket',
        items: resourceBlocks,
        lastUpdated: new Date()
      };
    }
  }
};
