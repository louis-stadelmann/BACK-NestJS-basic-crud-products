import { InjectConnection } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  getDbHandle(): Connection {
    return this.connection;
  }
}
