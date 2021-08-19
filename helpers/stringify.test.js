const stringify = require('./stringify');

describe('stringify', () => {
  // has a space after colon
  describe('object with one property', () => {
    test('number', () => {
      const body = { a: 1 };
      expect(stringify(body)).toBe('{"a": 1}');
    });
    test('string', () => {
      const body = { a: '1' };
      expect(stringify(body)).toBe('{"a": "1"}');
    });
  });

  // has a space after colon and comma
  describe('object with multiple properties', () => {
    test('multiple properties', () => {
      const body = { a: 1, b: '2', c: 'abc d -- e' };
      expect(stringify(body)).toBe('{"a": 1, "b": "2", "c": "abc d -- e"}');
    });
  });

  // handle Chinese characters, convert to unicode
  describe('object with Chinese characters', () => {
    test('Chinese characters', () => {
      const body = {
        a: 1, b: '2', c: 'abc d -- e', d: '中文字 -= abc 一二三',
      };
      expect(stringify(body)).toBe('{"a": 1, "b": "2", "c": "abc d -- e", "d": "\\u4e2d\\u6587\\u5b57 -= abc \\u4e00\\u4e8c\\u4e09"}');
    });
  });
});
