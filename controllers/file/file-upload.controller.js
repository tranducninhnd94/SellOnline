const fileUploadService = require("../../service/file-upload.service");

const StandardResponse = require("../../dto/standard.response");
const SuccessResponse = StandardResponse.SuccessResponse;
const ErrorResponse = StandardResponse.ErrorResponse;
const FileUploadService = require("../../service/file-upload.service");
const fileUploadService = new FileUploadService();

// var logger = require("../config/logger.config");
const TAG = "File_UPLOAD_CONTROLLER";

class FileUploadController {
	createFileUpload() {
		let arrFileUpload = req.body;
		if (arrFileUpload) {
			console.log(arrFileUpload);
			fileUploadService.createFileUpload(arrFileUpload).then(
				result => {
					console.log("result : ", result);
					let response = {};
					response.total = result.length;
					response.list = result;
					res.status(200);
					let successResponse = new SuccessResponse(200, "SUCCESS", response);
					return res.json(objRes);
				},
				error => {
					let errorResponse = new ErrorResponse(500, "INTERNAL_SERVER", error);
					res.status(500);
					return res.json(objectError);
				}
			);
		}
	}
}

module.exports = FileUploadController;