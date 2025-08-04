const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, 'uploads/')
    },
    filename: function (req,file,cb) {
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }

})

const fileFilter = (req,file,cb) =>{
    const allowedList = ['image/png', 'image/jpeg']
    if(!allowedList.includes(file.mimetype)){
        return cb(new Error('Only PNGS & JPGS are allowed'), false)
    }
    cb(null, true)
}

const upload = multer({ storage, fileFilter })
module.exports = upload