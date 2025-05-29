import { Amplify } from 'aws-amplify';

const awsConfig = {
  Auth: {
    region: process.env.VITE_AWS_REGION,
    userPoolId: process.env.VITE_USER_POOL_ID,
    userPoolWebClientId: process.env.VITE_USER_POOL_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: 'rekognition',
        endpoint: process.env.VITE_API_ENDPOINT,
        region: process.env.VITE_AWS_REGION,
      },
    ],
  },
};

Amplify.configure(awsConfig);

export default awsConfig; 