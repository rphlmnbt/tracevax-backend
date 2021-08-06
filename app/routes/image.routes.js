module.exports = app => {
    var idName;
    const multer  = require('multer')
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'public/images/uploads')
        },
        filename: (req, file, cb) => {
          cb(null, file.fieldname + '-' + req.body.uuid + Date.now() + ".jpg")
        }
    });
    var upload = multer({storage: storage});
    
    var router = require("express").Router();
    
    router.post('/id', upload.single('id'), function (req, res) {
      idName = req.body.uuid;
      res.send(console.log("Image Uploaded"))
    })

    router.post('/vaccinecard', upload.single('vaccinecard'), function (req, res) {
      res.send(console.log("Image Uploaded"))
    })
    

    app.use('/api/image', router);
}
