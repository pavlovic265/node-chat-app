const expect = require('expect');

var {generateMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'admin';
        var text = 'This is a wellcome message';
        var message = generateMessage(from, text);
        expect(message.createdAt).toExist().toBeA('number');
        expect(message).toInclude({from, text});
    });
});