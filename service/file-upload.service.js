const models = require("../models/index");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;

class FileUploadService {
    createFileUpload(obj) {
        return models.FileUpload.bulkCreate(obj);
    }

    updateIsUser(arrFilename) {
        return models.FileUpload.upload({ is_used: true }, { where: { [Op.or]: arrFilename } });
    }

}

module.exports = FileUploadService;