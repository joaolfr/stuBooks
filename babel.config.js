module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins:[
      [
        "module-resolver",
        {
          root: ["./src"],
          alias:{
            '@assets':'./src/assets',
            '@screens':'./src/screens',
            '@components':'./src/components',
            '@routes':'./src/routes',
            '@storage':'./src/storage',
            '@utils':'./src/utils',
            '@theme':'./src/theme',
            '@api':'./src/api',
            '@hooks':'./src/hooks',
            '@events':'./src/utils/events',
          }
        }
      ],
      'react-native-reanimated/plugin'
  ]
  };
};
