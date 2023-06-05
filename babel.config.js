module.exports = api => {
  const babelEnv = api.env();
  const plugins = [];

  if (babelEnv !== 'development') {
    // remove console logs from production build
    plugins.push(['transform-remove-console']);
  }
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins,
  };
};
