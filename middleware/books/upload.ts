import multer from 'multer';

const storage = multer.diskStorage({
  destination(req:any, file:any, cb:any){
    cb(null, 'public/books');
  },
  filename(req:any, file:any, cb:any) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const allowedTypes = ['text/plain'];
const fileFilter = (req:any, file:any, cb:any) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

export default multer({ storage, fileFilter });