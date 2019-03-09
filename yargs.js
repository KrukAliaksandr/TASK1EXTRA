/* eslint-disable no-console */
const todo = require('yargs');
const { writeRecordToFile, removeRecordsFromFile, findRecordsInFile, listRecords } = require('./dataHandling');
const path = require('path');

// @TODO add type
// eslint-disable-next-line no-unused-expressions
todo.command('Add', `makes an action with a file`, function (yargs) {
  return yargs.options({
    'list': {
      alias: 'l',
      describe: 'specifies the list of the records to use',
      conflicts: 'phone',
      demandOption: false,
      array: true
    },
    'file': {
      alias: 'f',
      describe: 'path to file',
      demandOption: true
    },
    'title': {
      alias: 't',
      describe: 'node title',
      implies: 'phone' | 'l',
      demandOption: true
    },
    'phone': {
      alias: 'p',
      describe: 'node phone',
      conflicts: 'list',
      demandOption: false
    },
    'description': {
      alias: 'd',
      describe: 'node phone',
      implies: 'phone',
      conflicts: 'list',
      demandOption: false
    }
  });
},
function (argv) {
  const jsonObject = require(path.resolve('./' + argv.file + '.json'));
  try {
    writeRecordToFile(argv, jsonObject);
  } catch (err) {
    console.log(err.message);
  }
})
  .command('Remove', `makes an action with a file`, function (yargs) {
    return yargs.options({
      'list': {
        alias: 'l',
        describe: 'specifies the list of the records to use',
        conflicts: 'phone',
        demandOption: false,
        array: true
      },
      'file': {
        alias: 'f',
        describe: 'path to file',
        demandOption: true
      },
      'title': {
        alias: 't',
        describe: 'node title',
        implies: 'phone' | 'l',
        demandOption: true
      },
      'phone': {
        alias: 'p',
        describe: 'node phone',
        conflicts: 'list',
        demandOption: false
      },
      'description': {
        alias: 'd',
        describe: 'node phone',
        implies: 'phone',
        conflicts: 'list',
        demandOption: false
      }
    });
  },
  function (argv) {
    const jsonObject = require(path.resolve('./' + argv.file + '.json'));
    try {
      removeRecordsFromFile(argv, jsonObject);
    } catch (err) {
      console.log(err.message);
    }
  })
  .command('Find', `makes an action with a file`, function (yargs) {
    return yargs.options({
      'list': {
        alias: 'l',
        describe: 'specifies the list of the records to use',
        conflicts: 'phone',
        demandOption: false,
        array: true
      },
      'file': {
        alias: 'f',
        describe: 'path to file',
        demandOption: true
      },
      'title': {
        alias: 't',
        describe: 'node title',
        implies: 'phone' | 'l',
        demandOption: true
      },
      'phone': {
        alias: 'p',
        describe: 'node phone',
        conflicts: 'list',
        demandOption: false
      },
      'description': {
        alias: 'd',
        describe: 'node phone',
        implies: 'phone',
        conflicts: 'list',
        demandOption: false
      }
    });
  },
  function (argv) {
    const jsonObject = require(path.resolve('./' + argv.file + '.json'));
    try {
      findRecordsInFile(argv, jsonObject);
    } catch (err) {
      console.log(err.message);
    }
  })
  .command('List', 'makes an action with a file', function (yargs) {
    return yargs.options({
      'file': {
        alias: 'f',
        describe: 'path to file',
        demandOption: true
      }
    });
  },
  function (argv) {
    const jsonObject = require('./' + argv.file + '.json');
    try {
      listRecords(argv, jsonObject);
    } catch (err) {
      console.log(err.message);
    }
  }
  )
  .help()
  .argv;
