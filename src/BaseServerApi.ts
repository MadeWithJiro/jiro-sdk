import { Config } from './Config';

export class BaseServerApi {
  protected config: Config;

  constructor(config: Config) {
    this.config = config;
  }
}
