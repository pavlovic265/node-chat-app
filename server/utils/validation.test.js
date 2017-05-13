const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should alawo string with non-space character', () => {
        var res = isRealString('  Marko   ');
            expect(res).toBe(true);
    })
    it('should reject non-string values', () => {
        var res = isRealString(9);
            expect(res).toBe(false);
    });
    it('should reject string with only spaces', () => {
        var res = isRealString('        ');
            expect(res).toBe(false);
    });
});

