var expect = require('expect');

var { generateMessage } = require('./message');

describe('generateMessage', () => {

    it('should generate correct message object', () => {
        const from = 'Javier';
        const text = 'Hi everyone';
        const message = generateMessage(from, text);
        expect(message).toMatchObject({from, text});
        expect(typeof message.createdAt).toBe('number');
    });

});