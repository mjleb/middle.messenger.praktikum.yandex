import { expect } from 'chai';
import { describe } from 'mocha';

import { hello } from '../src/services/helpers';

describe('Typescript test hello', () => {
  it('Should return string correctly', () => {
    expect(hello('mocha'), 'Hello mocha');
  });
});
