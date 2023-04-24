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

it('should generate a string', async () => {
  const string = await generateImage(testPrompt);

  expect(typeof string).toBe('string');
})

it('should not respond with a url', async () => {
  const string = await generateImage(testPrompt);

  expect(string).not.toContain('https://')
})

it('should only call dalleAPI once', async () => {
  await generateImage(testPrompt);

  expect(openai.createImage).toHaveBeenCalledTimes(1);
})