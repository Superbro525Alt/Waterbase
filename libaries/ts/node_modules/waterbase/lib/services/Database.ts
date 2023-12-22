import Collection from '../helpers/Collection';
import Service from '../Service';

class Database extends Service {
  collection = (name: string) => new Collection(this.client, name);
}
export = Database;
