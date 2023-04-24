const { generateImage } = require('../../../server/services/dalleService');
const openai = require('../../../server/utils/openAi');

jest.mock('openai');

openai.createImage.mockResolvedValue({
  data: {
    data: [
      {
        b64_json: 'base 64 encoded string'
      }
    ]
  }
});

const testPrompt = 'test recipe'

afterEach(() => {
  jest.clearAllMocks();
});

it('should respond with a base64 encoded string', async () => {
  const responseObj = await generateImage(testPrompt);

  expect(responseObj).toHaveProperty('b64_json')
})

it('should only call dalleAPI once', async () => {
  await generateImage(testPrompt);

  expect(openai.createImage).toHaveBeenCalledTimes(1);
})