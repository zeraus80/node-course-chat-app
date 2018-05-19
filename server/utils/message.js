var moment = require('moment');

var generateMessage = (from, text) => {
    const createdAt = moment().valueOf();
    return { from, text, createdAt };
};

var generateLocationMessage = (from, latitude, longitude) => {
    const createdAt = moment().valueOf();
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    return { from, url, createdAt };
};

module.exports = { generateMessage, generateLocationMessage };