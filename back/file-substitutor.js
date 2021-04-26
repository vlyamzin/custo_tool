import {parseCookie, nodeATOB, getDirname} from "./util.js";
import path from "path";

class FileSubstitutor {
  constructor(app, di) {
    this.app = app;
    this.di = di;

    this.init()
  }

  init() {
    this.app.get('/assets/custo/*.*', (req, res) => {
      const cookies = parseCookie(req.headers.cookie);

      if (this.#validateCookie(cookies)) {
        const user = cookies.session;
        const platform = nodeATOB(cookies.platformId);
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
      }
    })
  }

  #validateCookie(obj) {
    return obj && obj.hasOwnProperty('session') && obj.hasOwnProperty('platformId');
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
