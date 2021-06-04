import {nodeBTOA, getDirname} from "./util.js";
import fs from 'fs';
import path from 'path';

class User {

  async createUserFolder(ip) {
    const userhash = nodeBTOA(ip);

    return new Promise((resolve, reject) => {
      try {
        fs.mkdir(this.getUserFolderPath(userhash) + '/zips', {recursive: true}, (err) => {
          if (err) {
            console.log('The folder already exist');
          }
          resolve(userhash);
        });
      } catch (err) {
        console.log('Unknown error');
        reject(err);
      }
    })
  }

  getUserFolderPath(userhash) {
    return path.join(getDirname(), 'public', 'users', userhash);
  }
}

export default User;
