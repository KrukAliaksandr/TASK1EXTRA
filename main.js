/* eslint-disable no-console */
const todo = require('yargs');
const fs = require('fs');

const transformArgumentsIntoRecords = (consoleArgument) => {
  const recordsArray = [];
  consoleArgument.forEach((record) => {
    const dataArray = record.split('-');
    const [name, phone, description] = dataArray;
    const buisnessRecord = { name, phone, description };
    recordsArray.unshift(buisnessRecord);
  });
  return recordsArray;
};
// writeRecord
const writeNote = (args, requiredFile) => {
  const constructedNote = { title: args.title };
  if ('list' in args) {
    constructedNote.records = transformArgumentsIntoRecords(args.list);
  } else {
    if ('occupation' in args) {
      constructedNote.phone = args.phone;
      constructedNote.occupation = args.occupation;
    } else constructedNote.phone = args.phone;
  }

  requiredFile.push(constructedNote);
  fs.writeFileSync(args.file + '.json', JSON.stringify(requiredFile, null, '\t'), 'utf8', () => {
  });
};

// eslint-disable-next-line no-unused-expressions
// add type
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
    'occupation': {
      alias: 'o',
      describe: 'node phone',
      implies: 'phone',
      conflicts: 'list',
      demandOption: false
    }
  });
},
function (argv) {
  const jsonObject = require('./' + argv.file + '.json');
  try {
    writeNote(argv, jsonObject);
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
    ListNotes(argv, jsonObject);
  }
  )
  .help()
  .argv;

function ListNotes (args, requiredFile) {
  requiredFile.forEach((node) => {
    console.log(node);
  });
}
