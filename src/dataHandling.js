const { Organization, PersonalRecord, BuisnessRecord } = require('./recordTypes');
const fs = require('fs');

const removeRecordsFromFile = (args, requiredFile) => {
  const results = filterRecords(createRecord(args), requiredFile, 'excludeMatches');
  fs.writeFileSync(`./testSamples/${args.file}.json`, JSON.stringify(results, null, '\t'), 'utf8', () => {
  });
};

const findRecordsInFile = (args, requiredFile) => {
  const results = filterRecords(createRecord(args), requiredFile);
  console.log(JSON.stringify(results, null, '\t'));
};

const writeRecordToFile = (args, requiredFile) => {
  requiredFile.push(createRecord(args));
  fs.writeFileSync(`./testSamples/${args.file}.json`, JSON.stringify(requiredFile, null, '\t'), 'utf8', () => {
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
  let recordNumberInList = 0;
  while (recordNumberInList < listToBeChecked.length) {
    if (requiredList[recordNumberInList].name !== listToBeChecked[recordNumberInList].name ||
      requiredList[recordNumberInList].phone !== listToBeChecked[recordNumberInList].phone ||
      requiredList[recordNumberInList].description !== listToBeChecked[recordNumberInList].description) {
      comparsionResult = false;
      break;
    }
    recordNumberInList++;
  }
  return comparsionResult;
};
// if 'exclude matches' key is set, found records will be excluded from results
const filterRecords = (searchFiltersObject, jsonArray, filterParameter = 'includeMatches') => {
  const resultsArray = jsonArray.filter(record => {
    let recordComparsionResult = true;
    for (let parameter in record) {
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
          // search for substring in character name. Approve only if the substring is situated at the start.
          if (compareEmployeeLists(searchFiltersObject.empList, record.empList) === false) {
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
