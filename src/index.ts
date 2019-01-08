import { BaseServerApi } from './BaseServerApi';
import { Config } from './Config';
import { JiroStoreAdapter } from './store/JiroStoreAdapter';
import { DaemonApi } from './daemon/DaemonApi';

export class Jiro extends BaseServerApi {

  private readonly daemonApi: DaemonApi;
  public readonly Store: JiroStoreAdapter;

  constructor(config: Config) {
    super(config);

    this.daemonApi = new DaemonApi(config);
    this.Store = new JiroStoreAdapter(config, this.daemonApi);
  }
}
