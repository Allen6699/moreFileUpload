var express = require('express');
var router = express.Router();

const multer = require('multer');
const fs = require('fs');

/* GET home page. 测试启动是否正常 */
router.get('/', function(req, res, next) {
  res.send({
    success: true
  })
});

/**
 * 单个文件上传接口  
 *               这个单文件上传地址一样，不能同时使用，请注释一个
 */
router.post('/upload', multer({
  dest: 'upload'
}).single('file'), (req, res) => {
  console.log(req.file)

  fs.renameSync(req.file.path, `upload/${req.file.originalname}`)

  // 返回回去
  res.send(req.file)
})

/**
 * 多文件上传功能
 */
router.post('/upload', multer({
  dest: 'upload'
}).array('file', 10), (req, res) => {
  console.log(req)
  const files = req.files
  const fileList = []
  for(var i in files) {
    var file = files[i]
    fs.renameSync(file.path, `upload/${file.originalname}`)
    file.path = `upload/${file.originalname}`
    fileList.push(file)
  }
  res.send(fileList)
})

/**
 * 下载文件的接口返回
 */
router.get('/download', (req, res) => {
  console.log(req)
  console.log(res)
  req.query.url ? res.download(`upload/${req.query.url}`) : res.send({
    success: false
  })
})

module.exports = router;
