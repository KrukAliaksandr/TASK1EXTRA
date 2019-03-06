/* eslint-disable no-console */
const todo = require('yargs');
const fs = require('fs');

// eslint-disable-next-line no-unused-expressions
todo.command('Add', 'makes an action with a file', function (yargs) {
  return yargs.options({
    'list': {
      alias: 'l',
      describe: 'specifies the list of the records to use',
      conflicts: 'phone',
      demandOption: false,
      array: true
    },
    'path': {
      alias: 'p',
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
      alias: 'b',
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
  const jsonObject = require('./' + argv.path + '.json');
  try {
    writeNote(argv, jsonObject);
  } catch (err) {
    console.log(err.message);
  }
})
  .command('List', 'makes an action with a file', function (yargs) {
    return yargs.options({
      'path': {
        alias: 'p',
        describe: 'path to file',
        demandOption: true
      }
    });
  },
  function (argv) {
    const jsonObject = require('./' + argv.path + '.json');
    ListNotes(argv, jsonObject);
  }
  )
  .command('Read', 'makes an action with a file', function (yargs) {
    return yargs.options({
      'path': {
        alias: 'p',
        describe: 'path to file',
        demandOption: true
      },
      'title': {
        alias: 't',
        describe: 'node title',
        demandOption: true
      }
    });
  },
  function (argv) {
    const jsonObject = require('./' + argv.path + '.json');
    readNote(argv, jsonObject);
  })
  .command('Remove', 'makes an action with a file', function (yargs) {
    return yargs.options({
      'path': {
        alias: 'p',
        describe: 'path to file',
        demandOption: true
      },
      'title': {
        alias: 't',
        describe: 'node title',
        demandOption: true
      }
    });
  },
  function (argv) {
    const jsonObject = require('./' + argv.path + '.json');
    removeNote(argv, jsonObject);
  }
  )
  .help()
  .argv;

function writeNote (args, requiredFile) {
  let constructedNote = {};
  if ('list' in args) {
    constructedNote = { title: args.title, records: [args.list] };
  } else {
    const { phone, occupation } = args;
    (typeof occupation === 'undefined') ? (constructedNote = { title: args.title, phone })
      : (constructedNote = { title: args.title, phone, occupation });
  }

  requiredFile.push(constructedNote);
  fs.writeFileSync(args.path + '.json', JSON.stringify(requiredFile, null, '\t'), 'utf8', () => {
  });
}

function ListNotes (args, requiredFile) {
  requiredFile.forEach(function (node) {
    console.log(node);
  });
}

function readNote (args, requiredFile) {
  const result = requiredFile.filter(function (node) {
    return node.title === args.title;
  });
  (result.length === 0) ? console.log('Nothing') : (console.log(result));
}

function removeNote (args, requiredFile) {
  const result = requiredFile.filter((node) => node.title !== args.title);
  fs.writeFile(args.path + '.json', JSON.stringify(result, null, '\t'), 'utf8', () => {
    // eslint-disable-next-line no-console
    console.log(args.title + 'successfully Removed');
  });
}

function checkForDuplicates (args, file) {
  const result = file.filter(function (note) {
    return note.title === args.title;
  });
  console.log(result.length + ` notes with title "${args.title}" in file`);
  return result.length;
}

function checkforNotesWithMissingBody (args, file) {
  const result = file.filter((note) => !('phone' in note));
  result.forEach(note => {
    console.log(`note with ${note.title} + " is missing a phone`);
  });
}
