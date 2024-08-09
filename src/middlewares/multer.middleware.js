import multer from 'multer';

const upload = multer({ 
    dest: './public/temp' 
}).fields([
    { name: 'avatar', maxCount: 1 }, 
    { name: 'coverImage', maxCount: 1 }
]);

export default upload;
