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

  async set(
    collection: string,
    documentName: string,
    documentBody: any,
  ): Promise<boolean> {
    const options: rp.OptionsWithUri = {
      uri: this.buildUri(`/v1/projects/${this.projectId}/store/set`),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      },
      json: true,
      body: {
        collection,
        documentName,
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

  async get<T>(
    collection: string,
    documentName?: string | null
  ): Promise<T> {
    const options: rp.OptionsWithUri = {
      uri: this.buildUri(`/v1/projects/${this.projectId}/store/get`),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      },
      json: true,
      body: {
        collection,
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

  async getWhere<T>(
    collection: string,
    predicateKey: string,
    predicateOperation: string,
    predicateValue: string,
  ): Promise<T> {
    const options: rp.OptionsWithUri = {
      uri: this.buildUri(`/v1/projects/${this.projectId}/store/get`),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      },
      json: true,
      body: {
        collection,
        predicate: {
          key: predicateKey,
          operation: predicateOperation,
          value: predicateValue,
        },
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
    collection: string,
    documentName: string,
    documentBody: any,
  ): Promise<boolean> {
    const options: rp.OptionsWithUri = {
      uri: this.buildUri(`/v1/projects/${this.projectId}/store/update`),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      },
      json: true,
      body: {
        collection,
        documentName,
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

  async arrayPush(
    collection: string,
    documentName: string,
    documentBody: any,
  ): Promise<boolean> {
    const options: rp.OptionsWithUri = {
      uri: this.buildUri(`/v1/projects/${this.projectId}/store/update/push`),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      },
      json: true,
      body: {
        collection,
        documentName,
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

  async arrayRemove(
    collection: string,
    documentName: string,
    documentBody: any,
  ): Promise<boolean> {
    const options: rp.OptionsWithUri = {
      uri: this.buildUri(`/v1/projects/${this.projectId}/store/update/remove`),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      },
      json: true,
      body: {
        collection,
        documentName,
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

  async delete(
    collection: string,
    documentName: string,
  ): Promise<boolean> {
    const options: rp.OptionsWithUri = {
      uri: this.buildUri(`/v1/projects/${this.projectId}/store/delete`),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      },
      json: true,
      body: {
        collection,
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
    if (process.env.NODE_TEST) {
      return `http://localhost:3128${path}`;
    }
    return `https://daemon.jiro.app${path}`;
  }
}
