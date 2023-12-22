import { expect } from 'chai';
import { describe } from 'mocha';

import { hello } from '../services/helpers';

describe('Typescript usage suite', () => {
  it('should return string correctly', () => {
    expect(hello('mocha'), 'Hello mocha');
  });
});
