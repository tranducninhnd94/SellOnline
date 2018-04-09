class FileUploadDTO {
  constructor(file) {}

  set Id(id) {
    this.id = id;
  }

  get Id() {
    return id;
  }

  set Path(path) {
    this.path = path;
  }

  get Path() {
    return this.path;
  }

  set Mimetype(mimetype) {
    this.mimetype = mimetype;
  }

  get Mimetype() {
    return this.mimetype;
  }

  set Size(size) {
    this.size = size;
  }

  get Size() {
    return this.size;
  }

  set Originalname(originalname) {
    this.originalname = originalname;
  }

  get Originalname() {
    return this.originalname;
  }

  set Encoding(encoding) {
    this.encoding = encoding;
  }

  get Encoding() {
    return this.encoding;
  }

  set Filename(filename) {
    this.filename = filename;
  }

  get Filename() {
    return this.filename;
  }

  set CreateAt(created_at) {
    this.created_at = created_at;
  }

  get CreateAt() {
    return this.created_at;
  }

  set UpdatedAt(updated_at) {
    this.updated_at = updated_at;
  }

  get UpdatedAt() {
    return this.updated_at;
  }

  setTime(created_at, updated_at) {
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  setInfoCreate(file) {
    this.path = file.path.substring(7);
    this.mimetype = file.mimetype;
    this.size = file.size;
    this.originalname = file.originalname;
    this.encoding = file.encoding;
    this.filename = file.filename;
  }

  setInfoResponse(file) {
    this.path = file.path;
    this.mimetype = file.mimetype;
    this.size = file.size;
    this.originalname = file.originalname;
    this.encoding = file.encoding;
    this.filename = file.filename;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

module.exports = FileUploadDTO;
