const expect = require('expect');

var {Users} = require('./users');



describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Pera',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Mika',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Zika',
            room: 'Node Course'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '1',
            name: 'Marko',
            room: 'Some room'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names for node coruse', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Pera', 'Zika']);
    });

    it('should return names for react coruse', () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Mika']);
    });

    it('should find a user', () => {
        var user = users.getUser('1');
        expect(user).toExist();
        expect(user.id).toBe('1');
        expect(user.name).toBe('Pera');
    });

    it('should not find a user', () => {
        var user = users.getUser('0');
        expect(user).toNotExist();
    });

    it('should remove a user', () => {
        var user = users.removeUser('1');
        expect(user).toExist();
        expect(user.name).toBe('Pera');
        expect(users).toExclude(user);
        expect(users.users.length).toEqual(2);
    });

    it('should not remove a user', () => {
        var user = users.removeUser('0');
        expect(user).toNotExist();
    });

});
