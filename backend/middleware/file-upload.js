// multer for file uploads
const multer = require('multer');
// Cloudinary for image uploads on cloud not locally
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
// used for creating unique images filename
// const uuid = require('uuid');

// the types we are going to accept
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpeg', 'jpg', 'png'],
    },
});

const fileUpload = multer({
    limits: { fileSize: 10000000 }, // 10 MB
    storage: storage,
    fileFilter: (req, file, cb) => {
        const isValid = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype);
        cb(isValid ? null : new Error('Invalid mime type'), isValid);
    },
});

module.exports = fileUpload;