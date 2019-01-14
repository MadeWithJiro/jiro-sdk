
import { Config } from '../Config';
import { DaemonApi } from './DaemonApi';
import { expect } from 'chai';
import 'mocha';

describe('Daemon API', () => {
  const testCollectionName = 'TEST_COLLECTION';
  const testDocumentName = 'TEST_DOCUMENT';

  const daemonApi = new DaemonApi({
    projectId: 'JIRO_SDK_TEST',
    projectToken: '',
  });

  it('should throw if a document does not exist', () => {
    daemonApi
      .get(testCollectionName, testDocumentName);
  });

  it('should create a document', () => {
    daemonApi.set(testCollectionName, testDocumentName, {
      stringKey: 'testValue',
      numericKey: 100,
      booleanKey: true,
    })
      .then((success) => {
        expect(success).to.be.true;
      });
  });

  it('should read a document', () => {
    daemonApi
      .get(testCollectionName, testDocumentName)
      .then((document) => {
        expect(document).to.eq({
          stringKey: 'testValue',
          numericKey: 100,
          booleanKey: true,
        });
      });
  });

  it('should update a document', () => {
    daemonApi.update(testCollectionName, testDocumentName, {
      stringKey: 'newValue',
      numericKey: 100,
      booleanKey: true,
    })
      .then(() => daemonApi.get(testCollectionName, testDocumentName))
      .then((document) => {
        expect(document).to.eq({
          stringKey: 'newValue',
          numericKey: 100,
          booleanKey: true,
        });
      });
  });

  it('should delete a document', () => {
    daemonApi.delete(testCollectionName, testDocumentName)
      .then((success) => {
        expect(success).to.be.true;
      });
  });

});
