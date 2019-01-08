import { Config } from '../Config';
import { BaseServerApi } from '../BaseServerApi';
import { DaemonApi } from '../daemon/DaemonApi';

export class JiroStoreAdapter extends BaseServerApi {

  private readonly daemonApi: DaemonApi;

  constructor(config: Config, daemonApi: DaemonApi) {
    super(config);
    this.daemonApi = daemonApi;
  }

  async create(documentName: string, documentBody: any): Promise<boolean> {
    return this.daemonApi.create(documentName, documentBody);
  }

  async read<T>(documentName: string): Promise<T> {
    return this.daemonApi.read<T>(documentName);
  }

  async update(documentName: string, documentBody: any): Promise<boolean> {
    return this.daemonApi.update(documentName, documentBody);
  }

  async delete(documentName: string): Promise<boolean> {
    return this.daemonApi.delete(documentName);
  }
}
