const { QFPaySignatureError } = require('./error');
const { hash } = require('./helpers');

module.exports = (clientKey) => (ctx, ...args) => {
  const signature = ctx?.request?.headers?.['x-qf-sign'] ?? ctx?.headers?.['x-qf-sign'] ?? '';
  const body = ctx?.request?.body ?? {};
  const payType = body?.pay_type;
  const key = clientKey?.[payType] ?? clientKey;

  // check signature
  const against = hash(key, body);

  if (signature !== against) {
    throw new QFPaySignatureError();
  }

  const [arg1, arg2] = args;

  if (arg2) {
    return arg2();
  }

  return arg1();
};
