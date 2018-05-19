var expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {

    it('should generate correct message object', () => {
        const from = 'Javier';
        const text = 'Hi everyone';
        const message = generateMessage(from, text);
        expect(message).toMatchObject({from, text});
        expect(typeof message.createdAt).toBe('number');
    });

});

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        const from = 'Javier';
        const latitude = 1;
        const longitude = 2;
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const locationMessage = generateLocationMessage(from, latitude, longitude);
        expect(locationMessage).toMatchObject({ from, url });
        expect(typeof locationMessage.createdAt).toBe('number');
    });
})