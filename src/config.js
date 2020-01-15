const dev = {
    auth: {
        identityPoolId: 'us-east-1:4c32a440-cf31-491f-b5e5-c578bf263768',
        region: 'us-east-1',
        userPoolId: 'us-east-1_rzsFryn1A',
        userPoolWebClientId: '5ch814ounev4c6fjv1ipna55hd'
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