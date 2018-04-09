"use strict";
class StoreDTO {
  constructor() {}

  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setNameUnique(name_unique) {
    this.name_unique = name_unique;
  }

  getNameUnique() {
    return this.name_unique;
  }

  setDescription(description) {
    this.description = description;
  }

  getDescription() {
    return this.description;
  }

  setUsers(users) {
    this.users = users;
  }

  getUsers() {
    return this.users;
  }

  setInfoCreate(obj) {
    this.name = obj.name;
    this.name_unique = obj.name_unique;
    this.description = obj.description;
    this.address = obj.address;
  }

  setInfoUpdate(obj) {
    this.name = obj.name;
    this.description = obj.description;
    this.address = obj.address;
  }

  setInfoResponse(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.name_unique = obj.name_unique;
    this.description = obj.description;
    this.address = obj.address;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;
  }

  setOwner(owner) {
    this.owner = owner;
  }

  setInfoDetailsResponse(obj) {}
}
module.exports = StoreDTO;
