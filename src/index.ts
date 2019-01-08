import { BaseServerApi } from './BaseServerApi';
import { Config } from './Config';
import { JiroStoreAdapter } from './store/JiroStoreAdapter';
import { DaemonApi } from './daemon/DaemonApi';

export class Jiro extends BaseServerApi {

  private readonly daemonApi: DaemonApi;
  public readonly Store: JiroStoreAdapter;

  constructor(customConfig: Config | undefined) {
    if (customConfig) {
      super(customConfig);
    } else {
      if (!process.env.JIRO_PROJECT_ID || !process.env.JIRO_PROJECT_TOKEN) {
        throw new Error(`
          Couldn't find a JIRO_PROJECT_ID or JIRO_PROJECT_TOKEN in your environment.
          If you are accessing the SDK from outside of a Jiro project, you need to either
          supply a custom configuration object, or export the JIRO_PROJECT_ID and
          JIRO_PROJECT_TOKEN in your script.
        `);
      }

      super({
        projectId: process.env.JIRO_PROJECT_ID,
        projectToken: process.env.JIRO_PROJECT_TOKEN,
      });
    }

    this.daemonApi = new DaemonApi(this.config);
    this.Store = new JiroStoreAdapter(this.config, this.daemonApi);
  }
}
