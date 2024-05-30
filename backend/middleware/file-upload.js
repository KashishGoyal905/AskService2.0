const multer = require('multer');
// used for creating unique images filename
// const uuid = require('uuid');

// the types we are going to accept
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}

const fileUpload = multer({
    // size of the image in bytes
    limits: { fileSize: 1000000 },  // 1 mb
    storage: multer.diskStorage({
        // destination of images
        destination: (req, file, cb) => {
            cb(null, 'uploads/images');
        },
        // filename of the images
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, Date.now() + '.' + ext);
        },
    }),
    // for just validation that we do not recieve other type of files
    fileFilter: (req, file, cb) => {
        const isValid =  !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error('Invalid mime type!');
        cb(error, isValid);
    }
});

module.exports = fileUpload;