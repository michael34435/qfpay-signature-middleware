const crypto = require('crypto');

const stringify = require('./stringify');

function hash(key, body) {
  return crypto.createHash('md5').update(stringify(body) + key).digest('hex').toUpperCase();
}

module.exports = hash;
