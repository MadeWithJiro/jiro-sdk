import * as rp from 'request-promise-native';
import { Headers } from 'request';
import { StatusCodeError } from 'request-promise-native/errors';

import { Config } from '../Config';
import { BaseServerApi } from '../BaseServerApi';

export class DaemonApi {

  private readonly projectId: string;
  private readonly headers: Headers;

  constructor(
    config: Config,
  ) {
    this.projectId = config.projectId;
    this.headers = {
      Authorization: config.projectToken,
    };
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Store APIs

  async create(
      documentName: string,
      documentBody: any,
  ): Promise<boolean> {
    const options: rp.OptionsWithUri = {
      uri: this.buildUri(`/v1/projects/${this.projectId}/store`),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      },
      json: true,
      qs: {
        documentName,
      },
      body: {
        documentBody,
      },
    };
    try {
      await rp(options);
      return true;
    } catch (e) {
      return false;
    }
  }

  async read<T>(
      documentName: string,
  ): Promise<T> {
    const options: rp.OptionsWithUri = {
      uri: this.buildUri(`/v1/projects/${this.projectId}/store`),
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      },
      json: true,
      qs: {
        documentName,
      },
    };

    try {
      const response = await rp(options);
      return response.document;
    } catch (err) {
      if (err.statusCode === 404) {
        throw new Error('Document not found');
      } else {
        throw new Error('Service error');
      }
    }
  }

  async update(
      documentName: string,
      documentBody: any,
  ): Promise<boolean> {
    const options: rp.OptionsWithUri = {
      uri: this.buildUri(`/v1/projects/${this.projectId}/store`),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      },
      json: true,
      qs: {
        documentName,
      },
      body: {
        documentBody,
      },
    };
    try {
      await  rp(options);
      return true;
    } catch (e) {
      return false;
    }
  }

  async delete(
      documentName: string,
  ): Promise<boolean> {
    const options: rp.OptionsWithUri = {
      uri: this.buildUri(`/v1/projects/${this.projectId}/store`),
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      },
      json: true,
      qs: {
        documentName,
      },
    };
    try {
      await rp(options);
      return true;
    } catch (e) {
      return false;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Private helper functions

  private buildUri(path: string): string {
    return `https://daemon.jiro.app${path}`;
  }
}
