const yargs = require('yargs');

const Utils = {
  localInit() {
    console.log('local init called');
  },

  localStart() {
    console.log('local start called');
  },

  remoteInit() {
    console.log('remote init called');
  },

  remoteStart() {
    console.log('remote start called');
  }
};

let argv = null;
argv = yargs
  .usage('Usage: $0 <cmd> [args]')
  .command('local', 'run locally from settings.json', (yargs) => {
    argv = yargs
      .usage('Usage: $0 local <cmd>')
      .command('init', 'initialize the settings.json file')
      .command('start', 'starts the-nets-watch-client')
      .help('help')
      .wrap(null)
      .argv;
    checkCommands(yargs, argv, 2);
  }, (argv) => {
    switch (argv._[1]) {
      case 'init': Utils.localInit(); break;
      case 'start': Utils.localStart(); break;
    }
  })
  .command('remote', 'run as a remote client of a the-nets-watch-server instance', (yargs) => {
    argv = yargs
      .usage('Usage: $0 remote <cmd>')
      .command('init', 'initialize the connection to the server')
      .command('start', 'starts the-nets-watch-client')
      .help('help')
      .wrap(null)
      .argv;
    checkCommands(yargs, argv, 2);
  }, (argv) => {
    switch (argv._[1]) {
      case 'init': Utils.remoteInit(); break;
      case 'start': Utils.remoteStart(); break;
    }
  })
  .help('help')
  .wrap(null)
  .argv;

checkCommands(yargs, argv, 1);

function checkCommands (yargs, argv, numRequired) {
  if (argv._.length < numRequired) {
    yargs.showHelp()
  } else {
    // check for unknown command
  }
}