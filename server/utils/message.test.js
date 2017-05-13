const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'admin';
        var text = 'This is a wellcome message';
        var message = generateMessage(from, text);
        expect(message.createdAt).toExist().toBeA('number');
        expect(message).toInclude( {from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate location function', () => {
        var from = 'Jake';
        var latitude = 15;
        var longitude = 19;
        var url = 'https://www.google.com/maps?q=15,19';
        var message = generateLocationMessage(from, latitude, longitude);
        expect(message.createdAt).toExist().toBeA('number');
        expect(message).toInclude({from, url});
        expect(message.from).toBe(from);
        expect(message.url).toBe(url);
    });
})