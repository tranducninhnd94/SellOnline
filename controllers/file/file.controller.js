const multer = require("multer");
const path = require("path");
const constants = require("../../common/constants");
const fs = require("fs");
const mime = require("mime");

const StandardResponse = require("../../dto/standard.response");
const SuccessResponse = StandardResponse.SuccessResponse;
const ErrorResponse = StandardResponse.ErrorResponse;
// logger = require("../config/logger.config");

// mongoose

const TAG = "FILE_CONTROLLER";

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let mimetype = file.mimetype;
        if (
            mimetype == "image/gif" ||
            mimetype == "image/png" ||
            mimetype == "image/jpeg" ||
            mimetype == "image/bmp" ||
            mimetype == "image/webp"
        ) {
            callback(null, constants.IMAGE_PATH);
        } else {
            callback(null, constants.DOCUMENT_PATH);
        }
    },
    filename: (req, file, callback) => {
        console.log("file 2", file.originalname);
        callback(null, Date.now() + "_" + file.originalname);
    }
});

class FileController {
    uploadFile(req, res, next) {
        let upload = multer({
            storage: storage,
            fileFilter: (req, file, callback) => {
                let ext = path.extname(file.originalname);
                callback(null, true);
            },
            limits: {
                fileSize: 50 * 1024 * 1024
            }
        }).array("fileUpload", 5);

        upload(req, res, err => {
            if (err) {
                if (err.code) {
                    res.status(400);
                    let errorResponse = new ErrorResponse(400, err.code, {});
                    return res.json(errorResponse);
                }
                res.status(500);
                let errorResponse = new ErrorResponse(500, "ERROR_UPLOAD_FILE", err);
                return res.json(errorResponse);
            }

            let tmp = [];
            // node : if single type --> req.file : array --> req.files
            req.files.forEach(function (file) {
                let fileRes = standardRes.fileResponse(file);
                tmp.push(fileRes);
                console.log("file :", file);
            }, this);

            // tmp.url = req.file.path;
            if (tmp.length > 0) {
                // next  to middware
                req.body = tmp;
                next();
                // let arrResponse = standardRes.arrResponse(tmp.length, tmp);
                // let objecSuccess = standardRes.objectSuccess(200, "SUCCESS", arrResponse);
                // res.status(200);
                // return res.json(objecSuccess);
            } else {
                let objecSuccess = new SuccessResponse(200, "NO_OBJECT", {});
                res.status(200);
                return res.json(objecSuccess);
            }
        });
    }

    downloadFile(req, res, next) {
        let filePath = req.query.filePath.trim();
        logger.log("info", TAG, "Download file with path :{}", filePath);
        // don't know different beween  \ and /
        // public\document\15135624379463.png   --> not ok
        // public/document/15135624379572.png   --> ok

        // check file exist
        if (!fs.existsSync(filePath)) {
            let errorResponse = new ErrorResponse(400, `File path '${filePath}' not exist`, {});
            res.status(400);
            return res.json(errorResponse);
        }
        res.download(filePath);
    }
}


module.exports = FileController;
