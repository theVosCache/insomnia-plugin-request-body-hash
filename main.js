const crypto = require('crypto');

const settings = {
  salt: '',
  encoding: '',
};

function sha512(content) {
  const hash = crypto.createHash(settings.encoding);
  hash.update(content, 'utf8');
  return hash.digest('hex');
}

module.exports.templateTags = [{
  name: 'requestbodyhash',
  displayName: 'Request body hash',
  description: 'crete hash of the request body',
  args: [
    {
      displayName: 'Encoding',
      type: 'string',
      placeholder: 'sha512'
    },
    {
      displayName: 'Salt',
      type: 'string',
      placeholder: 'salt'
    }
  ],
  async run(context, encoding ='', salt = '') {
    settings.encoding = encoding
    settings.salt = salt

    let request = await context.util.models.request.getById(context.meta.requestId);
    return sha512(request.body.text+settings.salt);
  }
}];
