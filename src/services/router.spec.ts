// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import { beforeEach } from 'mocha';
import router from './router';
import PageLogin from '../pages/auth/login';
import PageSignUp from '../pages/auth/signup';

describe('Test Router', () => {
  it('Going to a new page should change the state of the history entity', () => {
    window.history.pushState({ page: 'login' }, 'Login', '/login');
    window.history.pushState({ page: 'register' }, 'Register', '/register');

    expect(window.history.length).to.eq(3);
    window.history.replaceState({ page: 'chats' }, 'Chats', '/chats');
    window.history.back();
    window.history.back();
    window.history.go(1);
  });
});
/*

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
*/
