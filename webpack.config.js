var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');
var SERVER_DIR = path.join(__dirname, './server')

// module.exports = {
//   // This is the 'root' of our client-side application + where webpack will start bundling things up
//   entry: `${SRC_DIR}/index.js`,
//   // This is where the index.html lives and where the bundle.js will go
//   output: {
//     filename: 'bundle.js',
//     path: DIST_DIR
//   },
//   module: {
//     rules: [
//       {
//         // File extension we are looking for
//         test: /\.jsx?/,
//         include: SRC_DIR,
//         loader: 'babel-loader',
//         query: {
//           presets: ['react', 'es2015']
//         }
//       }
//     ]
//   }
// }

const client = {
  // This is the 'root' of our client-side application + where webpack will start bundling things up
  entry: `${SRC_DIR}/index.js`,
  // This is where the index.html lives and where the bundle.js will go
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    publicPath:'/'
  },
  module: {
    rules: [
      {
        // File extension we are looking for
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        }
      }
    ]
  }
}

const server = {
  // This is the 'root' of our server-side application + where webpack will start bundling things up
  entry: `${SRC_DIR}/server.jsx`,
  // This is where the index.js lives and where the server_bundle.js will go
  target: 'node',
  output: {
    filename: 'bundle-server.js',
    path: DIST_DIR,
    publicPath:'/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        // File extension we are looking for
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}

module.exports = [client, server];