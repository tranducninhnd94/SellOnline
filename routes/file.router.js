const express = require("express");
const router = express.Router();

const validation = require("express-validation");
const entryDataValidate = require("./validation/entry.data.validate");

const FileUploadController = require("../controllers/file/file-upload.controller");
const fileUploadController = new FileUploadController();

const FileController = require("../controllers/file/file.controller");
const fileController = new FileController();

router
	.post("/file/upload", fileController.uploadFile, fileUploadController.createFileUpload)
	.get("/file/download", fileController.downloadFile);

module.exports = router;
