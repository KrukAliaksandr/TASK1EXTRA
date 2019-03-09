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

module.exports = {
  Record,
  Organization,
  PersonalRecord,
  BuisnessRecord
};
