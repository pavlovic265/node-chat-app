class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);
        if(user){
            this.users.splice(this.users.indexOf(user), 1);
        }
        return user;
    }

    getUser(id) {
        var user = this.users.find((user) => user.id === id);
        return user;
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room).map((user) => user.name)
        return users;
    }
}

module.exports = {Users};