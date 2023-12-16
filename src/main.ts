import InputValidator from '@/services/validator';
import './style.css';

import PageNav from '@/components/nav/nav';
import PageLogin from '@/pages/auth/login';
import PageSignUp from '@/pages/auth/signup';
import PageChat from '@/pages/chat/chat';
import Page404 from '@/pages/errors/error404';
import Page500 from '@/pages/errors/error500';
import PageProfile from '@/pages/profile/profile';
import PageProfileEdit from '@/pages/profile/profileEdit';
import PageProfileEditPassw from '@/pages/profile/profileEditPassw';
import router from '@/services/router';

router
  .use('/', PageNav)
  .use('/sign-in', PageLogin)
  .use('/sign-up', PageSignUp)
  .use('/settings', PageProfile, 'private')
  .use('/settings/edit', PageProfileEdit, 'private')
  .use('/settings/password', PageProfileEditPassw, 'private')
  .use('/messenger', PageChat, 'private')
  .use('/error-500', Page500, 'public')
  .use('/error-400', Page404, 'public')
  .start();

window.addEventListener('popstate', () => {
  router.init();
});

// Создаем экземпляр класса при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const inputValidator = new InputValidator();
  //console.log(inputValidator);
});
