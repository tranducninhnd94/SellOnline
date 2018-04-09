class Tag {
  constructor() {}

  set Id(value) {
    this.id = value;
  }

  get Id() {
    return id;
  }

  set Name(value) {
    this.name = value;
  }

  get Name() {
    return this.name;
  }

  set Description(value) {
    this.description = value;
  }

  get Description() {
    return this.description;
  }
}

module.exports = Tag;
