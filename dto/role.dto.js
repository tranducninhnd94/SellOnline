"use strict";
class RoleDTO {
    constructor() {
    }

    setId() {
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

    setAll(obj) {
        this.id = obj.id;
        this.name = obj.name;
    }
}

module.exports = RoleDTO;