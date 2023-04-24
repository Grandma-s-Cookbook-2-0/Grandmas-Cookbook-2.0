const openai = require('../utils/openAi');

const dalleService = {};

dalleService.generateImage = async (prompt) => {
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: '256x256',
    response_format: 'b64_json',
  });

  return response.data.data[0];
}

module.exports = dalleService;