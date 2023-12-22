import Client from './Client';

class Service {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}

export default Service;
