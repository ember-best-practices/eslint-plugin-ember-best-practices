const requireindex = require('requireindex');

module.exports.rules = requireindex(__dirname + '/rules');
module.exports.configs = {
  recommended: require('../config/recommended')
};
