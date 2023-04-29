const {uploadeFileToS3} = require('../../../server/utils/awsS3Connection')
const dalleImageController = require ('../../../server/controller/dalleImageController')

jest.mock('../../../server/utils/awsS3Connection')

test('it uploads the file image to s3', async () => {
    // const data = await uploadeFileToS3('eggsandbacon', 'testfilebody')
    await uploadeFileToS3('testName', 'testBody')
    expect(uploadeFileToS3).toHaveBeenCalledTimes(1)

})