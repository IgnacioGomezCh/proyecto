const dev = {
    auth: {
        identityPoolId: 'us-east-1:3d418dce-f3e8-4431-9c78-37a70b7c7cc5',
        region:'us-east-1',
        userPoolId:'us-east-1_cKpk4NU6g',
        userPoolWebClientId: '27c1341jvdl7758g1ltbnap2of'
    }
};

const prod = {

};

const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;
  
export default {
    ...config
};