const { Organization, PersonalRecord, BuisnessRecord } = require('./recordTypes');
const fs = require('fs');

const removeRecordsFromFile = (args, requiredFile) => {
  const results = filterRecords(createRecord(args), requiredFile, 'excludeMatches');
  fs.writeFileSync(`./phonebooks/${args.file}.json`, JSON.stringify(results, null, '\t'), 'utf8', () => {
  });
};

const findRecordsInFile = (args, requiredFile) => {
  const results = filterRecords(createRecord(args), requiredFile);
  console.log(JSON.stringify(results, null, '\t'));
};

const writeRecordToFile = (args, requiredFile) => {
  requiredFile.push(createRecord(args));
  fs.writeFileSync(`./phonebooks/${args.file}.json`, JSON.stringify(requiredFile, null, '\t'), 'utf8', () => {
  });
};

const listRecords = (args, requiredFile) => {
  requiredFile.forEach((node) => {
    console.log(node);
  });
};

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

const createRecord = (args) => {
  if ('list' in args) {
    return new Organization(args.title, transformIntoListOfRecords(args.list));
  } else {
    if ('description' in args) {
      return new BuisnessRecord(args.title, args.phone, args.description);
    } else return new PersonalRecord(args.title, args.phone);
  }
};

const compareEmployeeLists = (requiredList, listToBeChecked) => {
  let comparsionResult = true;
  listToBeChecked.forEach((recordInCheckedList, index) => {
    if (requiredList[index].name !== recordInCheckedList.name ||
          requiredList[index].phone !== recordInCheckedList.phone ||
          requiredList[index].description !== recordInCheckedList.description) {
      comparsionResult = false;
    }
  });
  return comparsionResult;
};

// if 'exclude matches' key is set, found records will be excluded from results
const filterRecords = (searchFiltersObject, jsonArray, filterParameter = 'includeMatches') => {
  const resultsArray = jsonArray.filter(record => {
    let recordComparsionResult = true;
    for (let parameter in searchFiltersObject) {
      switch (parameter) {
        case 'name':
          if ((record.name !== searchFiltersObject.name)) recordComparsionResult = false;
          break;
        case 'phone':
          if ((record.phone !== searchFiltersObject.phone)) recordComparsionResult = false;
          break;
        case 'description':
          if ((record.description !== searchFiltersObject.description)) recordComparsionResult = false;
          break;
        case 'empList':
          if (!(`empList` in record)) {
            recordComparsionResult = false;
          } else if (compareEmployeeLists(searchFiltersObject.empList, record.empList) === false) {
            recordComparsionResult = false;
          }
          break;
      }
    }
    // if 'exclude matches' key is set, matching records will be deleted to perform removeRecordsFromFile func
    return (filterParameter === 'excludeMatches') ? (!recordComparsionResult) : (recordComparsionResult);
  });
  return resultsArray;
};

module.exports = {
  createRecord,
  transformIntoListOfRecords,
  filterRecords,
  writeRecordToFile,
  removeRecordsFromFile,
  findRecordsInFile,
  listRecords
};
