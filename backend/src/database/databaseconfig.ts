
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import entities from ".";

export const typeormconfig :TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'admin',
    password: 'harshyadav',
    database: 'bikerental',
    entities: entities,
    synchronize: true,
  }