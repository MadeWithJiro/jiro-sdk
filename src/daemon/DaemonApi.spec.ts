
import { Config } from '../Config';
import { DaemonApi } from './DaemonApi';
import { expect } from 'chai';
import 'mocha';

describe('Daemon API', () => {
  const testCollectionName = 'TEST_COLLECTION';
  const testDocumentName = 'TEST_DOCUMENT';

  const testDocument = {
    stringKey: 'testValue',
    numericKey: 100,
    booleanKey: true,
    arrayKey: ['one', 'two', 'three'],
  };

  const daemonApi = new DaemonApi({
    projectId: 'JIRO_SDK_TEST',
    projectToken: '',
  });

  it('should throw if a document does not exist', () => {
    daemonApi
      .get(testCollectionName, testDocumentName);
  });

  it('should create a document', () => {
    return daemonApi.set(testCollectionName, testDocumentName, testDocument)
      .then((success) => {
        expect(success).to.be.true;
      });
  });

  it('should read a document', () => {
    return daemonApi
      .get(testCollectionName, testDocumentName)
      .then((document) => {
        expect(document).to.deep.equal(testDocument);
      });
  });

  it('should read a document with a predicate', () => {
    return daemonApi
      .getWhere(testCollectionName, 'stringKey', '==', 'testValue')
      .then((document: any) => {
        expect(document[0]).to.deep.equal(testDocument);
      });
  });

  it('should update a document', () => {
    return daemonApi.update(testCollectionName, testDocumentName, {
      stringKey: 'newValue',
    })
      .then(() => daemonApi.get(testCollectionName, testDocumentName))
      .then((document: any) => {
        expect(document.stringKey).to.eq('newValue');
      });
  });

  it('should append a field to an array', () => {
    return daemonApi.arrayPush(testCollectionName, testDocumentName, {
      arrayKey: 'four',
    })
      .then(() => daemonApi.get(testCollectionName, testDocumentName))
      .then((document: any) => {
        expect(document.arrayKey.length).to.eq(4);
      });
  });

  it('should remove a field from an array', () => {
    return daemonApi.arrayRemove(testCollectionName, testDocumentName, {
      arrayKey: 'four',
    })
      .then(() => daemonApi.get(testCollectionName, testDocumentName))
      .then((document: any) => {
        expect(document.arrayKey.length).to.eq(3);
      });
  });

  it('should delete a document', () => {
    return daemonApi.delete(testCollectionName, testDocumentName)
      .then((success) => {
        expect(success).to.be.true;
      });
  });

});
