import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/img`)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({ storage })

export function extractFile(fieldName) {
    return uploader.single(fieldName)
}
