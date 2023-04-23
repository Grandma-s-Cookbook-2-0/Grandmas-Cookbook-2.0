const { uploadeFileToS3 } = require('../utils/awsS3Connection');
const convertStrToFileName = require('../utils/convertStrToFileName');
const { generateImage } = require('../services/dalleService');

const dalleImageController = {};

dalleImageController.getImageUrl = async (req, res, next) => {
  const { imagePath } = req.body;
  if (!imagePath) {
    try {
      const { title } = req.body;
      const imageFileName = convertStrToFileName(title);
      const b64Image = await generateImage(title);
      const buffer = Buffer.from(b64Image, 'base64');

      const s3result = await uploadeFileToS3(imageFileName, buffer);
      res.locals.awsimagePath = s3result.Location;

      return next();
    } catch (error) {
      return next({
        log: `Error encountered in dalleImageController.getImageUrl, ${error}`,
        message: 'Error encountered when generating image via the DallE AI.',
      });
    }
  } else {
    return next();
  }
};

module.exports = dalleImageController;