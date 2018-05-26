const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node course'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Javier',
            room: 'The Office'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Node course');
        expect(userList).toEqual(['Mike', 'Julie'])
    });

    it('should return names for react course', () => {
        var userList = users.getUserList('React course');
        expect(userList).toEqual(['Jen'])
    });

    it('should remove a user', () => {
        var userId = '2';
        var user = users.removeUser(userId);
        expect(user).toBeDefined;
        expect(users.users.length).toBe(2);
    });
    
    it('should not remove user', () => {
        var userId = '4';
        var user = users.removeUser(userId);
        expect(user).not.toBeDefined;
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(user).toBeDefined;
        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = '4';
        var user = users.getUser(userId);
        expect(user).not.toBeDefined();
    });

});