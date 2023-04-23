const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.DALLE_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = openai;