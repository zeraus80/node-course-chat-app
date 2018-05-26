const expect = require('expect');

const {isRealString} = require('./validation');

describe('validations', () => {
    it('should reject non-string values', () => {
        const numberValue = 10;
        const result = isRealString(numberValue);
        expect(result).toBeFalsy();
    });
    
    it('should reject string with only spaces', () => {
        const stringWithSpaces = '      ';
        const result = isRealString(stringWithSpaces);
        expect(result).toBeFalsy();
    });

    it('should allow string with non-space characters', () => {
        const validString = 'This is a test';
        const result = isRealString(validString);
        expect(result).toBeTruthy();
    });

});