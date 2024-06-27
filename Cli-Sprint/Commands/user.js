// commands/user.js
const fs = require('fs');
const path = require('path');

module.exports = {
  command: 'user <action>',
  describe: 'Manage user records',
  builder: (yargs) => {
    return yargs.commandDir('user_cmds');
  },
  handler: function (argv) {
    // managment commnads
  }
};
