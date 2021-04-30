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
    this.app.post('/api/v1/platform-builder/config', async (req, res) => {
      try {
        const [params, custo] = await this.fetchConfig(req.body.url);
        const user = req.header('user-token') || await this.di.userService.createUserFolder(parseIp(req));
        const platformFolder = await this.createPlatformFolder(req.body.url, user);
        const platformId = nodeBTOA(this.#getPlatformId(req.body.url));
        const response = Object.assign({}, {params: params.data}, {customization: custo.data});
        const filesToDownload = this.parseCustomization(response.customization);
        await Promise.all([
          saveFile(`${platformFolder}/custo.json`, JSON.stringify(custo.data)),
          saveFile(`${platformFolder}/params.json`, JSON.stringify(params.data))
        ]);
        await Promise.all(filesToDownload.map(f => downloadFile(`${req.body.url}/${f.path}/${f.name}`, `${platformFolder}/${f.name}`)));
        res.cookie('session', user);
        res.cookie('platformId', platformId);
        res.json(response);
      } catch (err) {
        res.json({
          type: 'error',
          code: 500,
          message: err.message || 'Unknown error'
        });
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
        const platformName = this.#getPlatformId(platform);
        const folderPath = this.di.userService.getUserFolderPath(user) + `/${platformName}`;
        fs.mkdir(folderPath, {recursive: true}, (err) => {
          if (err) {
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

  #getPlatformId(platform) {
    return platform.replace(/[\.-]/g, '').split('//')[1]
  }


}

export default Platform
