import { Config } from '../Config';
import { BaseServerApi } from '../BaseServerApi';
import { DaemonApi } from '../daemon/DaemonApi';

export class JiroStoreAdapter extends BaseServerApi {

  private readonly daemonApi: DaemonApi;

  constructor(config: Config, daemonApi: DaemonApi) {
    super(config);
    this.daemonApi = daemonApi;
  }

  async set(collection: string, documentName: string, documentBody: any) {
    return this.daemonApi.set(collection, documentName, documentBody);
  }

  async get(collection: string, documentName?: string | null) {
    return this.daemonApi.get(collection, documentName);
  }

  async getWhere(collection: string, predicateKey: string, predicateOperation: string, predicateValue: string) {
    return this.daemonApi.getWhere(collection, predicateKey, predicateOperation, predicateValue);
  }

  async getAll(collection: string, documentNames: string[]) {
    return this.daemonApi.getAll(collection, documentNames);
  }

  async update(collection: string, documentName: string, documentBody: any): Promise<boolean> {
    return this.daemonApi.update(collection, documentName, documentBody);
  }

  async arrayPush(collection: string, documentName: string, documentBody: any): Promise<boolean> {
    return this.daemonApi.arrayPush(collection, documentName, documentBody);
  }

  async arrayRemove(collection: string, documentName: string, documentBody: any): Promise<boolean> {
    return this.daemonApi.arrayRemove(collection, documentName, documentBody);
  }

  async delete(collection: string, documentName: string): Promise<boolean> {
    return this.daemonApi.delete(collection, documentName);
  }
}
