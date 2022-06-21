const fs = require("fs");
const config = require("../../../pkg/config");
const cfgStorage = config.get("storage");
const strings = require("../../../pkg/strings");
const path = require("path");

const upload = async (req, res) => {
  try {
    if (req.files.document.size > cfgStorage.max_filesize) {
      return res.status(400).send("File exceeds max file size");
    }

    if (!cfgStorage.allowed_filetypes.includes(req.files.document.mimetype)) {
      return res.status(400).send("File type not allowed");
    }

    let userDir = `user_${req.user.uid}`;
    let userDirPath = path.join(
      __dirname,
      "/../../../",
      `${cfgStorage.upload_dir}/${userDir}`
    );

    if (!fs.existsSync(userDirPath)) {
      fs.mkdirSync(userDirPath);
    }

    let fileId = strings.makeID(6);
    let fileName = `${fileId}_${req.files.document.name}`;

    let filePath = path.join(`${userDirPath}/${fileName}`);

    req.files.document.mv(filePath, (err) => {
      if (err) {
        return res.status(500).send(error);
      }
    });
    let fileUrl = `/api/v1/storage/${userDir}/${fileName}`;
    res.status(200).send({ fileUrl });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  upload,
};
