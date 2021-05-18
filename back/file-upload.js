import {cookieValidator, parseCookie} from "./cookie-validator.js";
import multer from 'multer';
import {nodeATOB} from "./util.js";


class FileUpload {
  constructor(app, di) {
    this.app = app;
    this.di = di;
    this.upload = multer({
      fileFilter: (req, file, cb) => {
        if (!file || (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png')) {
          cb(new Error(`Not a valid file`));
        } else {
          cb(null, true);
        }
      },
      storage: this.#initStorage()
    }).single('file');

    this.init();
  }

  init() {
    this.app.post('/api/v1/file-upload', cookieValidator, (req, res) => {
      this.upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          res.status(415).send(err.message);
        } else if (err) {
          res.status(500).send(`Something went wrong`);
        }

        res.json({path: 'assets/custo/'+ req.file.originalname});
      });
    });
  }

  #initStorage() {
    return multer.diskStorage({
      destination: (req, file, next) => {
        const cookie = parseCookie(req.headers.cookie);
        const folderPath = this.di.userService.getUserFolderPath(cookie.session);
        next(null, `${folderPath}/${nodeATOB(cookie.platformId)}`);
      },
      filename: (req, file, next) => { 
        next(null, file.originalname);
      }
    });
  }
}

export default FileUpload
