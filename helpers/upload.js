const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "photo") {
      cb(null, "./public/uploads/photo");
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});
const imgFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only input jpg / jpeg / png"), false);
  }
}
const imgLimit = { fileSize: 5000000 }
const uploadPhoto = multer({ storage: storage, fileFilter: imgFilter, limits: imgLimit })

const uploadHandler = {
  uploadPhoto: (req, res, next) => {
    const upload = uploadPhoto.single('photo');
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(400).send({
          messages: err.message,
          statusCode: 400,
        });
      } else if (err) {
        res.status(400).send({
          messages: err.message,
          statusCode: 400,
        });
        // An unknown error occurred when uploading.
      } else if (req.file == undefined) {
        next();
      } else next();
    })
  }
}

module.exports = uploadHandler;