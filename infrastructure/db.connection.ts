import { injectable } from "inversify";

@injectable()
export class DbConnection {
  query(query) {
    console.log(`query ${query}`);
    return [];
  }
}