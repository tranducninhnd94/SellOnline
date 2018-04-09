"use strict";
class UserDTO {
  constructor() {}

  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setEmail(email) {
    this.email = email;
  }

  getEmail() {
    return this.email;
  }

  setPassword(password) {
    this.password = password;
  }

  getPassword() {
    return this.password;
  }

  setFullname(fullname) {
    this.fullname = fullname;
  }

  getFullname(fullname) {
    return this.fullname;
  }

  setPhoneNumber(phone_number) {
    this.phone_number = phone_number;
  }

  getPhoneNumber() {
    return this.phone_number;
  }

  setAddress(address) {
    this.address = address;
  }

  getAddress() {
    return this.address;
  }

  setRoles(roles) {
    this.roles = roles;
  }

  setInfoCreate(obj) {
    this.email = obj.email;
    this.password = obj.password;
    this.fullname = obj.fullname;
    this.phone_number = obj.phone_number;
    this.address = obj.address;
  }

  setInfoResponse(obj) {
    this.id = obj.id;
    this.email = obj.email;
    this.fullname = obj.fullname;
    this.phone_number = obj.phone_number;
    this.address = obj.address;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;
    // this.roles = obj.roles;
  }

  setInfoUpdate(obj) {
    this.fullname = obj.fullname;
    this.phone_number = obj.phone_number;
    this.address = obj.address;
  }
}

module.exports = UserDTO;
