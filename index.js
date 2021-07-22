const crypto = require('crypto');
const { QFPaySignatureError } = require('./error');

module.exports = (clientKey) => (ctx, ...args) => {
  const signature = ctx?.request?.headers?.['x-qf-sign'] ?? ctx?.headers?.['x-qf-sign'] ?? '';
  const body = ctx?.request?.body ?? {};
  const payType = body?.pay_type;
  const key = clientKey?.[payType] ?? clientKey;

  // check signature
  const against = crypto.createHash('md5').update(JSON.stringify(body) + key).digest('hex').toUpperCase();

  if (signature !== against) {
    throw new QFPaySignatureError();
  }

  const [arg1, arg2] = args;

  if (arg2) {
    return arg2();
  }

  return arg1();
};
