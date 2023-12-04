import { Container } from "inversify";
const container = new Container();
import { DbConnection } from './infrastructure/db.connection';

container.bind(DbConnection).toSelf();