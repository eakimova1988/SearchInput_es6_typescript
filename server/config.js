var argv = require('yargs').default('production', false).argv;

module.exports = {
  jwtSecret: 'e6f3517990a148af891379a0eea24921',
  port: 1002,
  url: argv.production ? 'https://my-awesome-app.herokuapp.com/' : 'http://localhost:1002',
  publicPath: argv.production ? './public/production' : './public/development'
};