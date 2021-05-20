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
     * Update the item of provided locale in the customization config
     * Body params:
     * type {string} - the config item name. E.g loginPageLogoUrl
     * locale {string} - the locale string that must be updated
     * value {string} - the value to apply
     * @returns - config
     */
    this.app.put('/api/v1/platform/update/customization', cookieValidator, async (req, res) => {
      try {
        const {session, platformId, body} = req;
        const config = await this.#readConfigFile(session, platformId);
        if (config) {
          if (!config[body.type]) {
            config[body.type] = [];
          }

          const item = config[body.type].find(item => item.locale === body.locale);
          if (!item) {
            config[body.type].push({locale: body.locale, value: body.value});
          } else {
            item.value = body.value;
          }

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
    });

    /**
     * Delete the item from the customization config
     * Body params:
     * type {string} - the config item name. E.g loginPageLogoUrl
     * locale {string} - the locale string that must be removed
     * @returns - status
     */
    this.app.delete('/api/v1/platform/update/customization', cookieValidator, async (req, res) => {
      try {
        const {session, platformId, body} = req;
        const config = await this.#readConfigFile(session, platformId);
        if (config) {
          const itemIndex = (config[body.type] || []).findIndex(item => item.locale === body.locale);
          if (itemIndex > -1 ) {
            config[body.type].splice(itemIndex, 1);
            this.#writeConfigFile(session, platformId, config)
              .then(() => {
                res.status(200).send('OK');
              })
              .catch((err) => {
                res.status(400).send(err.message);
              })
          } else {
            res.status(400).send('There is no such item in the config');
          }
        } else {
          throw Error('No customization config available');
        }
      } catch(err) {
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
