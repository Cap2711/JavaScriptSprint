
const yargs = require('yargs');
const fs = require('fs');
const crc = require('crc');

// create token
const generateToken = () => {
  const timestamp = new Date().getTime().toString();
  return crc.crc32(timestamp).toString(16);
};

// to log actions
const logAction = (message) => {
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync('logs/app.log', logMessage);
};

// CLI commands
yargs
  .command('config', 'View or update configuration', (yargs) => {
    yargs.option('set', {
      alias: 's',
      describe: 'Set a configuration value',
      type: 'array'
    });
  }, (argv) => {
    if (argv.set) {
      const [key, value] = argv.set;
      const config = JSON.parse(fs.readFileSync('config/appConfig.json'));
      config[key] = value;
      fs.writeFileSync('config/appConfig.json', JSON.stringify(config, null, 2));
      logAction(`Updated configuration: ${key} = ${value}`);
      console.log(`Configuration updated: ${key} = ${value}`);
    } else {
      const config = JSON.parse(fs.readFileSync('config/appConfig.json'));
      console.log(config);
    }
  })
  .command('token', 'Generate a new token', () => {
    const token = generateToken();
    console.log(`Generated token: ${token}`);
    logAction(`Generated token: ${token}`);
  })
  .help()
  .argv;
