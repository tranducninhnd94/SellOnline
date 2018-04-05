"use strict";
class RoleDTO {
  constructor() {}

  setId(id) {
    this.id = id;
  }

  setName(name) {
    this.name = name;
  }

  setAll(obj) {
    this.id = obj.id;
    this.name = obj.name;
  }
}

module.exports = RoleDTO;
