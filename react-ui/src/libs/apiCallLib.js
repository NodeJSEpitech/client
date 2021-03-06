import http from 'http';
import https from 'https';
import LocalStorage from 'localStorage';

const querystring = require('querystring');

let globalHeaders = {};
const RequestHandler = (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) ? https : https;

class ApiCallLib {

  /**
   * Ajoute des header pour toutes les requêtes envoyées
   * @param {string} key - le nom du header
   * @param {string} value - la valeur du header
   */
  static setGlobalHeader (key, value) {
    globalHeaders[key] = value;
  }

  /**
   * requête DELETE
   * @param {string} path - le chemin
   * @returns {Promise.<Object>}
   */
  destroy (path) {
    return this._request(path, 'DELETE');
  }

  /**
   * requête GET
   * @param {string} path - le chemin
   * @returns {Promise.<Object>}
   */
  get (path) {
    return this._request(path, 'GET');
  }

  /**
   * requête POST
   * @param {string} path - le chemin
   * @returns {Promise.<Object>}
   */
  post (path, data) {
    return this._request(path, 'POST', data);
  }

  /**
   * requête PUT
   * @param {string} path - le chemin
   * @returns {Promise.<Object>}
   */
  put (path, data) {
    return this._request(path, 'PUT', data);
  }

  /**
   * renvoie les header à ajouter à la requête
   * @param {object} data - le corps de la requête
   * @param multipart
   * @returns {*}
   * @private
   */
  _getHeaders (data) {
    let token = LocalStorage.getItem('token');
    let headers = {};
    if (data) {
      let postData = querystring.stringify(data);
      headers['Content-Length'] = Buffer.byteLength(postData);
    }
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if (token) {
      headers['X-Access-Token'] = token;
    }
    return Object.assign(headers, globalHeaders);
  }

  /**
   * envoie une requête vers une url distante
   * @param {string} path - le chemin
   * @param {string} method - la méthode http
   * @param {object} [dataToSend] - le corps de la requête si besoin
   * @returns {Promise.<object>} - renvoie la réponse
   * @private
   */
  _request (path, method, dataToSend) {
    const options = {
      headers: this._getHeaders(dataToSend),
      protocol: 'https',
      host: "https://epiblog-api.herokuapp.com/",
      port: 440,
      path: path,
      method: method
    };

    return new Promise((resolve, reject) => {
      const req = RequestHandler.request(options, (response) => {
        let fullData = "";
        response.on('data', (chunk) => {
          if (!/^20\d$/.test(response.statusCode)) {
            
            //if (ApiCallLib._IsJsonString(chunk)) {
              return reject(JSON.parse(chunk));
            // } else {
            //   console.log(chunk);
            //   return (reject(true));
            // }
          }

          fullData += chunk;
        });

        response.on('end', () => {
          if (!/^20\d$/.test(response.statusCode)) {
            return reject(response.statusCode === 0 ? new Error("Error got an http status 0") : response.statusCode);
          }

          return resolve(ApiCallLib._tryParseJSON(fullData));
        });
      });

      req.on('error', (e) => reject(e));
      if (dataToSend) {
        req.write(querystring.stringify(dataToSend));
      }

      req.end();
    });
  }

  /**
   * parse du JSON
   * @param {string} data - les données à parser
   * @returns {object|string} - renvoie la valeur en string ou l'objet JSON
   * @private
   */
  static _tryParseJSON (data) {

    console.log(data);

    let result = data;
    try {
      result = JSON.parse(data);
    }
    catch (ex) {
      return (result || "").toString();
    }

    return result;
  }

  static _IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
}

export default ApiCallLib;
