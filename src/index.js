/* eslint-disable no-console */
const todo = require('yargs');
const { writeRecordToFile, removeRecordsFromFile, findRecordsInFile, listRecords } = require('./dataHandling');
const path = require('path');

// @TODO add type
// eslint-disable-next-line no-unused-expressions
todo.command('Add', `Add a record to a certain phonebook`, function (yargs) {
  return yargs.options({
    'list': {
      alias: 'l',
      describe: `List of the records for organization record, conflicts with the phone 
      and description parameter. Example: --list:employee1-phone-description employee2-phone-description`,
      conflicts: 'phone',
      demandOption: false,
      array: true
    },
    'file': {
      alias: 'f',
      describe: 'Specify name of .json file in /phonebooks folder ',
      demandOption: true
    },
    'title': {
      alias: 't',
      describe: 'Name of the record',
      implies: 'phone' | 'l',
      demandOption: true
    },
    'phone': {
      alias: 'p',
      describe: 'Phone of the record,conflitcts with list parameter',
      conflicts: 'list',
      demandOption: false
    },
    'description': {
      alias: 'd',
      describe: 'Description of record,conflicts with the list parameter',
      implies: 'phone',
      conflicts: 'list',
      demandOption: false
    }
  });
},
function (argv) {
  const jsonObject = require(path.resolve(`./phonebooks/${argv.file}.json`));
  try {
    writeRecordToFile(argv, jsonObject);
  } catch (err) {
    console.log(err.message);
  }
})
  .command('Remove', `Remove records,mathing certain filters from a certain phonebook,
  record must match all filters to be removed`, function (yargs) {
    return yargs.options({
      'list': {
        alias: 'l',
        describe: `List of the records for organization record, conflicts with the phone 
        and description parameter.Example: --list:employee1-phone-description employee2-phone-description`,
        conflicts: 'phone',
        demandOption: false,
        array: true
      },
      'file': {
        alias: 'f',
        describe: 'Specify name of .json file in /phonebooks folder ',
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
        describe: 'Phone of the record,conflitcts with list parameter',
        conflicts: 'list',
        demandOption: false
      },
      'description': {
        alias: 'd',
        describe: 'Description of record,conflicts with the list parameter',
        implies: 'phone',
        conflicts: 'list',
        demandOption: false
      }
    });
  },
  function (argv) {
    const jsonObject = require(path.resolve(`./phonebooks/${argv.file}.json`));
    try {
      removeRecordsFromFile(argv, jsonObject);
    } catch (err) {
      console.log(err.message);
    }
  })
  .command('Find', `Find records,mathing certain filters from a certain phonebook,
  record must match all filters to be listed as one of the results`, function (yargs) {
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
        describe: 'Specify name of .json file in /phonebooks folder ',
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
        describe: 'Phone of the record,conflitcts with list parameter',
        conflicts: 'list',
        demandOption: false
      },
      'description': {
        alias: 'd',
        describe: 'Description of record,conflicts with the list parameter',
        implies: 'phone',
        conflicts: 'list',
        demandOption: false
      }
    });
  },
  function (argv) {
    const jsonObject = require(path.resolve(`./phonebooks/${argv.file}.json`));
    try {
      findRecordsInFile(argv, jsonObject);
    } catch (err) {
      console.log(err.message);
    }
  })
  .command('List', `List all records from a certain phonebook`, function (yargs) {
    return yargs.options({
      'file': {
        alias: 'f',
        describe: 'Specify name of .json file in /phonebooks folder ',
        demandOption: true
      }
    });
  },
  function (argv) {
    const jsonObject = require(path.resolve(`./phonebooks/${argv.file}.json`));
    try {
      listRecords(argv, jsonObject);
    } catch (err) {
      console.log(err.message);
    }
  }
  )
  .demandCommand(1, 'You need at least one command before moving on')
  .help('help')
  .argv;
