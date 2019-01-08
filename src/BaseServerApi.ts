import { Config } from './Config';

export class BaseServerApi {
  protected projectId: string;
  protected projectToken: string;

  constructor(config: Config) {
    this.projectId = config.projectId;
    this.projectToken = config.projectToken;
  }
}
