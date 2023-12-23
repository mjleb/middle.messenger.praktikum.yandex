/* eslint-disable no-unused-expressions */
import sinonChai from 'sinon-chai';
import { use, expect } from 'chai';
import Sinon, { createSandbox } from 'sinon';
import HTTPTransport from './http';

describe('Test class HTTPTransport', () => {
  use(sinonChai);
  const sandbox = createSandbox();
  let request: Sinon.SinonStub<any[], any>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let http: HTTPTransport;

  beforeEach(() => {
    http = new HTTPTransport();
    request = sandbox.stub(http, 'request' as keyof typeof http).callsFake(async () => {
      await Promise.resolve();
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('The "GET" method. Called correctly.', async () => {
    const req = Sinon.stub(http, 'get').resolves();
    await http.get('someUrl');
    expect(req.called).to.be.true;
  });

  it('The "GET" method. Called correctly. Query params: string, number', () => {
    const data = encodeURI('?key1=1&key2=val2');
    http.get('', { data: { key1: 1, key2: 'val2' } });
    expect(request).calledWithMatch(data, { method: 'GET' });
  });

  it('The "GET" method. Called correctly. Query params with spaces', () => {
    const data = encodeURI('?key1=val1 val2 val3');
    http.get('', { data: { key1: 'val1 val2 val3' } });
    expect(request).calledWithMatch(data, { method: 'GET' });
  });

  it('The "GET" method. Called correctly. Query params with Cyrillic characters', () => {
    const data = encodeURI(`?key1=Пора попить чайку ...`);
    http.get('', { data: { key1: 'Пора попить чайку ...' } });
    expect(request).calledWithMatch(data, { method: 'GET' });
  });

  it('The "POST" method. Called correctly.', async () => {
    const req = Sinon.stub(http, 'post');
    await http.post('someUrl');
    expect(req.called).to.be.true;
  });

  it('The "PUT" method. Called correctly.', async () => {
    const req = Sinon.stub(http, 'put').resolves();
    await http.put('someUrl');
    expect(req.called).to.be.true;
  });

  it('The "DELETE" method. Called correctly.', async () => {
    const req = Sinon.stub(http, 'delete').resolves();
    await http.delete('someUrl');
    expect(req.called).to.be.true;
  });
});
