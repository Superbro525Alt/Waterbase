import axios, { AxiosRequestConfig } from 'axios';
import { WaterbaseConfig } from './models/Config';

class Client {
  endpoint: String = '';

  headers: any = {};

  constructor(config: WaterbaseConfig) {
    this.headers = config.defaultHeaders || {
      'content-type': '',
    };
    this.setEndpoint(config.endpoint);
    this.setKey(config.secretKey);
  }

  /**
   * Set secret key
   *
   * @param string value
   *
   * @return self
   */
  setKey(value: string) {
    this.addHeader('x-waterbase-key', value);
    return this;
  }

  /**
   * Set the endpoint
   *
   * @param endpoint
   *
   * @return this
   */
  setEndpoint(endpoint: string) {
    this.endpoint = endpoint;

    return this;
  }

  /**
   * Adds a header for the http request
   *
   * @param key string
   *
   * @param value string
   */
  addHeader(key: string, value: string) {
    this.headers[key] = value;
    return this;
  }

  /**
   * Makes the call to the server a lot easier
   *
   * @param method string
   *
   * @param path string
   *
   * @param headers object
   *
   * @param params object
   */
  async call(method: string, path: string = '', headers: object = {}, params = {}) {
    this.headers = { ...this.headers, ...headers };
    const options = {
      method: method.toUpperCase(),
      url: this.endpoint + path,
      headers: this.headers,
      data: method.toUpperCase() === 'GET' ? null : params,
    } as AxiosRequestConfig;
    const response = await axios(options);

    return response.data;
  }
}

export default Client;
