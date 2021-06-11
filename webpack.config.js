// Node import
const path = require('path');

// Config de Webpack
module.exports = {
  // Passe le build par défaut en développement
  mode: 'development',
  // Expose le dossier src/ pour les imports
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
    },
  },
  // Points d'entrée pour le travail de Webpack
  entry: {
    app: [
      './src/test/index.js',
      './src/styles/reset.css',
      './src/styles/parcours.css',
      './src/styles/tests.css',
    ],
    exo1: ['./src/exo1/index.js', './src/exo1/test.js'],
    exo2: ['./src/exo2/index.js', './src/exo2/test.js'],
    exo3: ['./src/exo3/index.js', './src/exo3/test.js'],
    exo4: ['./src/exo4/index.js', './src/exo4/test.js'],
  },
  // Sortie
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist/'),
  },
  // Modules
  module: {
    rules: [
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // babel avec une option de cache
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      // CSS / SASS / SCSS
      {
        test: /\.css$/,
        use: [
          // style-loader ou fichier
          'style-loader',
          // Chargement du CSS
          'css-loader',
        ],
      },
    ],
  },
  devServer: {
    overlay: true, // Overlay navigateur si erreurs de build
    stats: 'minimal', // Infos en console limitées
    progress: true, // progression du build en console
    inline: true, // Rechargement du navigateur en cas de changement
    open: true, // on ouvre le navigateur
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
  },
};
