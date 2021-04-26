import {nodeBTOA, parseIp, downloadFile, saveFile} from "./util.js";
import axios from "axios";
import fs from 'fs';

class Platform {
  constructor(app, di) {
    this.app = app;
    this.di = di;

    this.init();
  }

  init() {
    this.app.post('/api/v1/platform/config', async (req, res) => {
      try {
        const [params, custo] = await this.fetchConfig(req.body.url);
        const user = req.header('user-token') || await this.di.userService.createUserFolder(parseIp(req));
        const platformFolder = await this.createPlatformFolder(req.body.url, user);
        const response = Object.assign({}, params.data, {custo: custo.data});
        const filesToDownload = this.parseCustomization(response.custo);
        await Promise.all([
          saveFile(`${platformFolder}/custo.json`, JSON.stringify(custo.data)),
          saveFile(`${platformFolder}/params.json`, JSON.stringify(params.data))
        ]);
        await Promise.all(filesToDownload.map(f => downloadFile(`${req.body.url}/${f.path}/${f.name}`, `${platformFolder}/${f.name}`)));
        res.cookie('session', user);
        res.cookie('platformId', nodeBTOA(platformFolder.split('/').pop()));
        res.json(response);
      } catch (err) {
        res.send('ERROR');
      }
    });
  }

  fetchConfig(url) {
    return Promise.all([
      axios.get(`${url}/assets/custo/params.json`),
      axios.get(`${url}/assets/custo/custo.json`)
    ]);
  }

  createPlatformFolder(platform, user) {
    return new Promise((resolve, reject) => {
      try {
        const platformName = platform.replace(/[\.-]/g, '').split('//')[1];
        const folderPath = this.di.userService.getUserFolderPath(user) + `/${platformName}`;
        fs.mkdir(folderPath, {recursive: true}, (err) => {
          if (err) {
            debugger;
            console.log(err);
          }
          resolve(folderPath);
        })
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  parseCustomization(file) {
    let itemsToDownload = [];
    const regExGlobal = /assets\/custo\/[\w\d\._-]+\.[\w\d]+/gm;
    const regEx = /assets\/custo\/[\w\d\._-]+\.[\w\d]+/m;

    for (const [, locales] of Object.entries(file)) {
      itemsToDownload = (locales || [])
        .filter(i => regEx.test(i.value))
        .map(i => i && i.value)
        .reduce((acc, cur) => {
          const fileName = cur.match(regExGlobal);
          return fileName.length > 0 ? acc.concat(fileName) : acc;
        }, itemsToDownload);
    }
    const uniq = new Set(itemsToDownload);
    return [...uniq].map(f => {
      const uri = f.split('/');
      return {
        name: uri.pop(),
        path: uri.join('/')
      }
    });
  }


}

export default Platform
