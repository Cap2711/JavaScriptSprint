
const crc = require('crc');

module.exports = {
  command: 'token <username>',
  describe: 'Generate a token for a user',
  handler: function (argv) {
    const username = argv.username;
    const token = crc.crc32(username).toString(16);
    console.log(`Generated token for ${username}: ${token}`);
  }
};
