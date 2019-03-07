/* eslint-disable no-console */
const todo = require('yargs');
const fs = require('fs');
class Record {
  constructor (name) {
    this.name = name;
  }
}

class Organization extends Record {
  constructor (name, list) {
    super(name);
    this.empList = list;
  }
}

class PersonalRecord extends Record {
  constructor (name, phone) {
    super(name);
    this.phone = phone;
  }
}
class BuisnessRecord extends PersonalRecord {
  constructor (name, phone, description) {
    super(name, phone);
    this.description = description;
  }
}
// @TODO change function to just parse proper object from String
const transformIntoListOfRecords = (consoleArgument) => {
  const recordsArray = [];
  consoleArgument.forEach((record) => {
    const dataArray = record.split('-');
    const [name, phone, description] = dataArray;
    const buisnessRecord = { name, phone, description };
    recordsArray.push(buisnessRecord);
  });
  return recordsArray;
};

const writeRecrod = (args, requiredFile) => {
  if ('list' in args) {
    requiredFile.push(new Organization(args.title, transformIntoListOfRecords(args.list)));
  } else {
    if ('description' in args) {
      requiredFile.push(new BuisnessRecord(args.title, args.phone, args.description));
    } else requiredFile.push(new PersonalRecord(args.title, args.phone));
  }
  fs.writeFileSync(args.file + '.json', JSON.stringify(requiredFile, null, '\t'), 'utf8', () => {
  });
};

const listRecords = (args, requiredFile) => {
  requiredFile.forEach((node) => {
    console.log(node);
  });
};

const removeRecords = (args, requiredFile) => {
  const requiredRecord = new Organization(args.title, transformIntoListOfRecords(args.list));
  console.log(requiredRecord);

  const result = requiredFile.filter((fileRecord) => {
    return Object.toJSON(requiredRecord) !== Object.toJSON(fileRecord);
  });
  fs.writeFileSync(args.file + '.json', JSON.stringify(result, null, '\t'), 'utf8', () => {
  });
};

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
  const jsonObject = require('./' + argv.file + '.json');
  try {
    writeRecrod(argv, jsonObject);
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
    const jsonObject = require('./' + argv.file + '.json');
    try {
      removeRecords(argv, jsonObject);
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
    listRecords(argv, jsonObject);
  }
  )
  .help()
  .argv;
