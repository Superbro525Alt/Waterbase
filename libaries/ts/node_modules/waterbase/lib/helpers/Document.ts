import Client from '../Client';
import { Documents } from '../models/Documents';

class Document implements Documents {
  id: string = '';

  data: object;

  #collection: string = '';

  #client: Client;

  constructor(client: Client, collection: string, id: string = '', data: object = {}) {
    this.#client = client;
    this.#collection = collection;
    this.id = id;
    this.data = data;
  }

  /**
   * Updates the selected doc
   *
   * @param update object
   *
   * @return Promise<any>
   */
  update = (update: object) =>
    new Promise((res, rej) => {
      this.#client
        .call(
          'put',
          `/database/update/${this.#collection}`,
          {
            'content-type': 'application/json',
          },
          { query: { _id: this.id }, update: { $set: update } }
        )
        .then((value) => {
          res(value);
        })
        .catch(rej);
    });

  /**
   * Deletes the selected doc
   *
   * @return Promise<any>
   */
  delete = () =>
    new Promise((res, rej) => {
      this.#client
        .call(
          'delete',
          `/database/delete/${this.#collection}`,
          {
            'content-type': 'application/json',
          },
          { query: { _id: this.id } }
        )
        .then((value) => {
          res(value);
        })
        .catch(rej);
    });
}

export = Document;
