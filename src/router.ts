import PageLogin from './pages/auth/login.ts';
import PageSignin from './pages/auth/signup';
import Page404 from './pages/errors/error404.ts';
import Page500 from './pages/errors/error500.ts';
import PageNav from './components/nav/nav';
import PageProfile from './pages/profile/profile';
import PageChat from './pages/chat/chat';
import PageProfileEdit from './pages/profile/profileEdit';
import PageProfileEditPassw from './pages/profile/profileEditPassw';

function render(query: string, block: any) {
  const root = document.querySelector(query);
  if (root) {
    root.appendChild(block.getContent());
  }
  return root;
}

function router(): void {
  console.log('window.location.href', window.location.href);
  console.log('window.location.pathname', window.location.pathname);
  // const template = new pageLogin();
  switch (window.location.pathname) {
    case '/':
      render('#app', new PageNav());
      break;
    case '/login':
      render('#app', new PageLogin());
      break;
    case '/signin':
      render('#app', new PageSignin());
      break;
    case '/profile':
      render('#app', new PageProfile());
      break;
    case '/profile-edit':
      render('#app', new PageProfileEdit());
      break;
    case '/profile-edit-password':
      render('#app', new PageProfileEditPassw());
      break;
    case '/chat':
      render('#app', new PageChat());
      break;
    case '/errors-500':
      render('#app', new Page500());
      break;
    default:
      render('#app', new Page404());
  }
}
export default router;
