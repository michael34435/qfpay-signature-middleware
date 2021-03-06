function stringify(body) {
  const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
  const jsonWithSpaces = JSON.stringify(body, null, ' ').replace(/,\n\s/gi, ', ').replace(/\n\s*/gi, '');
  const jsonWithUnicode = jsonWithSpaces
    .split('')
    .map((char) => (REGEX_CHINESE.test(char) ? `\\u${char.codePointAt(0).toString(16)}` : char))
    .join('');

  return jsonWithUnicode;
}

module.exports = stringify;
