import {dirname} from "path";
import {fileURLToPath} from "url";
import fs from 'fs';
import https from 'https';
import archiver from 'archiver';

/**
 * @function nodeBTOA
 * @description encode string to hex
 * @param s
 * @returns {string}
 */
export function nodeBTOA(s) {
  return Buffer.from(s).toString('hex');
}

/**
 * Decode hex string into normal
 * @param s
 * @returns {string}
 */
export function nodeATOB(s) {
  return Buffer.from(s, 'hex').toString();
}

/**
 * @description get IP address from thhe request
 * @param req Express.Request
 * @returns {string}
 */
export function parseIp(req) {
  return (typeof req.headers['x-forwarded-for'] === 'string'
    && req.headers['x-forwarded-for'].split(',').shift())
    || req.connection?.remoteAddress
    || req.socket?.remoteAddress
    || req.connection?.socket?.remoteAddress
}

/**
 * @description return root folder of the app
 * @returns {string}
 */
export function getDirname() {
  return dirname(fileURLToPath(import.meta.url));
}


export function downloadFile(url, filePath) {
  const options = {
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36'
    },
    gzip: true
  }
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    let fileInfo = null;

    const request = https.get(url, options, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }

      fileInfo = {
        mime: response.headers['content-type'],
        size: parseInt(response.headers['content-length'], 10),
      };

      response.pipe(file);
    });

    // The destination stream is ended by the time it's called
    file.on('finish', () => resolve(fileInfo));

    request.on('error', err => {
      fs.unlink(filePath, () => reject(err));
    });

    file.on('error', err => {
      fs.unlink(filePath, () => reject(err));
    });

    request.end();
  })
}

export function saveFile(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (err) => {
      err ? reject(err) : resolve();
    });
  });
}

export async function createZipArchive(path, name, out) {
  const archive = archiver('zip', { zlib: { level: 9 }});
  const stream = fs.createWriteStream(`${out}/${name}`);

  return new Promise((resolve, reject) => {
    archive
      .directory(path, false)
      .on('error', err => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve(true));
    archive.finalize();
  });
}
