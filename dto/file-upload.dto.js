class FileUploadDTO {
    constructor(path, mimetype, size, originalname, encoding, filename) {
        this.path = path;
        this.mimetype = mimetype;
        this.size = size;
        this.originalname = originalname;
        this.encoding = encoding;
        this.filename = filename;
    }
}

module.exports = FileUploadDTO;