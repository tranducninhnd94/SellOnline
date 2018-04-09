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
}

let b = new FileUploadDTO();
b.Id = 1;


console.log(b);