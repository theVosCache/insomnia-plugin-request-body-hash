const crypto = require('crypto');

const replacementContent = 'Will be replaced with HMAC of request body';
const settings = {
  salt: ''
};

function sha512(content) {
  const hash = crypto.createHash('sha512');
  hash.update(content, 'utf8');
  return hash.digest('hex');
}

module.exports.templateTags = [{
  name: 'requestbodysha512',
  displayName: 'Request body sha512',
  description: 'sha512 of the request body',
  args: [
    {
      displayName: 'salt',
      type: 'string',
      placeholder: 'salt'
    }
  ],
  async run(context, salt = '') {
    settings.salt = salt
    let request = await context.util.models.request.getById(context.meta.requestId);
    console.log(request.body.text);
    return sha512(request.body.text+salt);
  }
}];