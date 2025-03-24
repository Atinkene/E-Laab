// config-overrides.js
const webpack = require('webpack');

module.exports = function override(config) {
  // Ajouter des polyfills pour les modules Node.js
  config.resolve.fallback = {
    ...config.resolve.fallback,
    path: require.resolve('path-browserify'), // Déjà ajouté
    crypto: require.resolve('crypto-browserify'), // Déjà ajouté
    os: require.resolve('os-browserify/browser'), // Déjà ajouté
    buffer: require.resolve('buffer/'), // Déjà ajouté
    stream: require.resolve('stream-browserify'), // Déjà ajouté
    vm: require.resolve('vm-browserify'), // Ajout pour vm
  };

  // Ajouter le plugin ProvidePlugin pour rendre Buffer disponible globalement
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  return config;
};