import {cookieValidator} from "./cookie-validator.js";
import fs from "fs";
import path from "path";

class PlatformUpdate {

  constructor(app, di) {
    this.app = app;
    this.di = di;

    this.init();
  }

  init() {
    /**
     * Update the whole customization config
     * Body params:
     * config {object} - customization file in json format
     * @returns - status
     */
    this.app.post('/api/v1/platform/update/customization', cookieValidator, (req, res) => {
      try {
        const {session, platformId, body} = req;
        this.#writeConfigFile(session, platformId, body.config)
          .then(() => {
            res.status(200).send('OK');
          })
          .catch((err) => {
            res.status(400).send(err.message);
          })
      } catch (err) {
        res.status(500).send(err.message || 'Unknown error');
      }
    });

    /**
     * Update the item in the customization config
     * Body params:
     * type {string} - the config item name. E.g loginPageLogoUrl
     * locale {string} - the locale string that must be udpated
     * value {string} - the value to apply
     * @returns - config
     */
    this.app.put('/api/v1/platform/update/customization', cookieValidator, async (req, res) => {
      try {
        const {session, platformId, body} = req;
        const config = await this.#readConfigFile(session, platformId);
        if (config) {
          const item = (config[body.type] || []).find(item => item.locale === body.locale);
          item.value = body.value;
          this.#writeConfigFile(session, platformId, config)
            .then(() => {
              res.json(config);
            })
            .catch((err) => {
              res.status(400).send(err.message);
            })
        } else {
          throw Error('No customization config available');
        }
      } catch (err) {
        res.status(500).send(err.message || 'Unknown error');
      }
    })
  }

  #readConfigFile(session, platform) {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(this.di.userService.getUserFolderPath(session), platform, 'custo.json'), (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      })
    })
  }

  #writeConfigFile(session, platformId, config) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(this.di.userService.getUserFolderPath(session), platformId, 'custo.json'),
        JSON.stringify(config),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(config);
          }
        });
    })
  }
}

export default PlatformUpdate;
