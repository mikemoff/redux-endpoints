import { assert } from 'chai';
import resourceJson from '../mock-api/json/resource.json';

import { basicEndpoint } from 'fixtures';

describe('An endpoint request action creator', function() {

  let requestActionCreator, requestAction;

  beforeEach(function() {
    requestActionCreator = basicEndpoint.actionCreators.request;
    requestAction = basicEndpoint.actionCreators.request(1776, { foo: 'bar' });
  });

  it('is a function', function() {
    assert.isFunction(requestActionCreator);
  });

  it('has a `toString` method which returns the correct action type', function() {
    const expected = 'mockApi/MAKE_MOCK_API_REQUEST';
    assert.strictEqual(requestActionCreator.toString(), expected);
  });

  context('returns an action object that', function() {

    it('is a plain object', function() {
      assert.isObject(requestAction);
    });

    it('has a type derived from its name property', function() {
      assert.strictEqual(requestAction.type, 'mockApi/MAKE_MOCK_API_REQUEST');
    });

    it('has a payload containing the url', function() {
      assert.deepEqual(requestAction.payload.url, 'http://localhost:1111/api/1776');
    });

    it('has a payload containing the options passed as the last parameter', function() {
      assert.deepEqual(requestAction.payload.options, { foo: 'bar' });
    });

    it('defaults the options key of the payload to an empty object', function() {
      requestAction = basicEndpoint.actionCreators.request(1776);
      assert.deepEqual(requestAction.payload.options, {});
    });

    it('has a meta property containing the named parameters', function() {
      assert.deepEqual(requestAction.meta.params, { id: 1776 });
    });

    it('has a meta property containing a derived path', function() {
      assert.strictEqual(requestAction.meta.path, 1776);
    });

  });

});

describe('An endpoint ingest action creator', function() {

  let ingestActionCreator, ingestPayload, ingestAction, requestMeta;

  beforeEach(function() {
    ingestActionCreator = basicEndpoint.actionCreators.ingest;
    ingestPayload = resourceJson;
    requestMeta = {
      params: { id: 1776 },
      path: 1776,
    };
    ingestAction = ingestActionCreator(ingestPayload, requestMeta);
  });

  it('has a `toString` method which returns the correct action type', function() {
    const expected = 'mockApi/INGEST_MOCK_API_RESPONSE';
    assert.strictEqual(ingestActionCreator.toString(), expected);
  });

  context('returns an object that', function() {

    it('is a plain object', function() {
      assert.isObject(ingestAction);
    });

    it('has a type derived from its name property', function() {
      assert.strictEqual(ingestAction.type, 'mockApi/INGEST_MOCK_API_RESPONSE');
    });

  });

  it('returns the data passed to it as its payload', function() {
    assert.deepEqual(ingestAction.payload, ingestPayload);
  });

  it('returns the second argument as its meta property', function() {
    assert.deepEqual(ingestAction.meta, requestMeta);
  });

  it('sets the payload to the error if the payload is an error', function() {
    const error = new Error('Something went wrong with the request');
    const action = ingestActionCreator(error, requestMeta);

    assert.strictEqual(action.payload, error);
  });

  it('sets the error property to true if the payload is an error', function() {
    const action = ingestActionCreator(
      new Error('Something went wrong with the request'),
      requestMeta
    );

    assert.strictEqual(action.error, true);
  });

  it('sets the error property to false if the payload is not an error', function() {
    assert.strictEqual(ingestAction.error, false);
  });

});
