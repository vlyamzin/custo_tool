import {getDirname} from "./util.js";
import path from "path";
import {cookieValidator} from "./cookie-validator.js";

class FileSubstitutor {
  constructor(app, di) {
    this.app = app;
    this.di = di;

    this.init()
  }

  init() {
    this.app.get('/assets/custo/*.*', cookieValidator, (req, res) => {
      const user = req.session;
      const platform = req.platformId;
      const folderPath = path.join(getDirname(), 'public', 'users', user, platform);
      const fileNameToSubstitute = this.#getFilenameFromUrl(req.url);
      const options = {
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }

      return res.sendFile(path.join(folderPath, fileNameToSubstitute), options, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Sent: ', fileNameToSubstitute);
        }
      });

    })
  }

  #getFilenameFromUrl(url) {
    try {
      const noTimestamp = url.split('?').shift();
      return noTimestamp.split('/').pop();
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}


export default FileSubstitutor;
