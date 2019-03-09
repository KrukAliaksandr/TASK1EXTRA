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

const writeRecord = (args, requiredFile) => {
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
  let searchFiltersObj = {};
  if ('list' in args) {
    searchFiltersObj = new Organization(args.title, transformIntoListOfRecords(args.list));
  } else {
    if ('description' in args) {
      searchFiltersObj = new BuisnessRecord(args.title, args.phone, args.description);
    } else searchFiltersObj = new PersonalRecord(args.title, args.phone);
  }
  console.log(searchFiltersObj);
  const results = requiredFile.filter(record => {
    console.log(record);
    let comparsionResult = true;
    for (let parameter in record) {
      console.log(parameter);
      switch (parameter) {
        case 'name':
          if ((record.name !== searchFiltersObj.name)) comparsionResult = false;
          console.log(record.name !== searchFiltersObj.name);
          break;
        case 'phone':
          if ((record.phone !== searchFiltersObj.phone)) comparsionResult = false;
          console.log(record.phone !== searchFiltersObj.phone);
          break;
        case 'description':
          if ((record.description !== searchFiltersObj.description)) comparsionResult = false;
          console.log(record.description !== searchFiltersObj.description);
          break;
        case 'empList':
          // search for substring in character name. Approve only if the substring is situated at the start.
          let recordNumberInList = 0;
          while (recordNumberInList < record.empList.length) {
            if (searchFiltersObj.empList[recordNumberInList].name !== record.empList[recordNumberInList].name ||
              searchFiltersObj.empList[recordNumberInList].phone !== record.empList[recordNumberInList].phone ||
              searchFiltersObj.empList[recordNumberInList].description !== record.empList[recordNumberInList].description) {
              console.log('false on list comparsion result');
              comparsionResult = false;
              break;
            }
            recordNumberInList++;
          }
          break;
        default:
          if (record[parameter] !== searchFiltersObj[parameter]) {
            comparsionResult = false;
            console.log('false on default comparsion result');
          }
          break;
      }
    }
    return !comparsionResult;
  });
  fs.writeFileSync(args.file + '.json', JSON.stringify(results, null, '\t'), 'utf8', () => {
  });
};

const findRecords = (args, requiredFile) => {
  let searchFiltersObj = {};
  if ('list' in args) {
    searchFiltersObj = new Organization(args.title, transformIntoListOfRecords(args.list));
  } else {
    if ('description' in args) {
      searchFiltersObj = new BuisnessRecord(args.title, args.phone, args.description);
    } else searchFiltersObj = new PersonalRecord(args.title, args.phone);
  }
  console.log(searchFiltersObj);
  const results = requiredFile.filter(record => {
    console.log(record);
    let comparsionResult = true;
    for (let parameter in record) {
      console.log(parameter);
      switch (parameter) {
        case 'name':
          if ((record.name !== searchFiltersObj.name)) comparsionResult = false;
          console.log(record.name !== searchFiltersObj.name);
          break;
        case 'phone':
          if ((record.phone !== searchFiltersObj.phone)) comparsionResult = false;
          console.log(record.phone !== searchFiltersObj.phone);
          break;
        case 'description':
          if ((record.description !== searchFiltersObj.description)) comparsionResult = false;
          console.log(record.description !== searchFiltersObj.description);
          break;
        case 'empList':
          // search for substring in character name. Approve only if the substring is situated at the start.
          let recordNumberInList = 0;
          while (recordNumberInList < record.empList.length) {
            if (searchFiltersObj.empList[recordNumberInList].name !== record.empList[recordNumberInList].name ||
              searchFiltersObj.empList[recordNumberInList].phone !== record.empList[recordNumberInList].phone ||
              searchFiltersObj.empList[recordNumberInList].description !== record.empList[recordNumberInList].description) {
              console.log('false on list comparsion result');
              comparsionResult = false;
              break;
            }
            recordNumberInList++;
          }
          break;
        default:
          if (record[parameter] !== searchFiltersObj[parameter]) {
            comparsionResult = false;
            console.log('false on default comparsion result');
          }
          break;
      }
    }
    return comparsionResult;
  });
  console.log(JSON.stringify(results, null, '\t'));
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
    writeRecord(argv, jsonObject);
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
    removeRecords(argv, jsonObject);
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
    const jsonObject = require('./' + argv.file + '.json');
    findRecords(argv, jsonObject);
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
