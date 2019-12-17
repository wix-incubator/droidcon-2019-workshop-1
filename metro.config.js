/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 *
 * @format
 *
 * The JavaScript bundler for React Native.
 * It takes in an entry file and various options,
 * and gives you back a single JavaScript file that includes all your code and its dependencies.
 *
 * To read more about metro configuration:
 * https://facebook.github.io/metro/docs/en/configuration
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  }
};
