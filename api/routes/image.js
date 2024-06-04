const express = require('express')
const db = require('../../database/index.js')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const publicPath = String(path.join(__dirname, "imgs"))

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
      cb(null, publicPath);
    },
    filename: function (req, file, cb) {
        let image = file.originalname
        cb(null, image)
    }
}) 
  
const upload = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 } })

router.get('/:fileName', (req, res) => {
    const fileName = req.params.fileName
    const filePath = path.join(publicPath, fileName)
    fs.exists(filePath, (exists) =>{
        if (exists){
            res.sendFile(filePath)
        } else{
            res.status(404).send('File not found')
        }
    })
})


module.exports = router