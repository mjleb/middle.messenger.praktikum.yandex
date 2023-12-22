// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import { beforeEach } from 'mocha';
import router from './router';
import PageLogin from '../pages/auth/login';
import PageSignUp from '../pages/auth/signup';
/*
  .use('/sign-in', PageLogin)
  .use('/sign-up', PageSignUp)
*/

describe('Test router.ts', () => {
  beforeEach(() => {
    router.use('/sign-in', PageLogin).use('/sign-up', PageSignUp);
    router.start();
  });

  it('Initialization works', () => {
    expect(window.location.pathname).to.eq('/');
  });

  it('The router.go method works', () => {
    router.go('/sign-in');
    expect(window.location.pathname).to.eq('/sign-in');
  });
});
