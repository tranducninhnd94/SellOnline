class Token {
    constructor(user, stories) {
        this.email = user.email;
        this.fullname = user.fullname;
        this.address = user.address;
        this.phone_number = user.phone_number;
        this.stories = stories;
    }

}
module.exports = Token;