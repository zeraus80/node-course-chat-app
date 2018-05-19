var generateMessage = (from, text) => {
    const createdAt = new Date().getTime();
    return { from, text, createdAt };
};

var generateLocationMessage = (from, latitude, longitude) => {
    const createdAt = new Date().getTime();
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    return { from, url, createdAt };
};

module.exports = { generateMessage, generateLocationMessage };