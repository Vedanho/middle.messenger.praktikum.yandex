import Handlebars from 'handlebars';
import './styles/main.scss';
import * as Pages from './pages';
import * as Components from './components';
import { Chats } from './constants';
import renderDOM from './core/renderDom';

const pages = {
  login: [Pages.LoginPage],
  regist: [Pages.RegistPage],
  chat: [Pages.ChatPage, {
    chats: Chats,
    isShowModal: false,
  }],
  'chat-modal': [Pages.ChatPage, {
    chats: Chats,
    isShowModal: true,
  }],
  profile: [Pages.ProfilePage],
  'change-password': [Pages.PasswordChangePage],
  'profile-modal': [Pages.ProfilePage],
  'not-found': [Pages.NotFoundPage],
  'error-page': [Pages.ErrorPage],
};

const pathName = window.location.pathname.replace('/', '');

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return;
  }

  Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
  // @ts-expect-error fix later
  const [source, context] = pages[page] || pages['not-found'];

  const container = document.getElementById('app')!;

  if (typeof source === 'function') {
    renderDOM(new source());
    return;
  }

  const temlpatingFunction = Handlebars.compile(source);

  container.innerHTML = temlpatingFunction(context);
}
document.addEventListener('DOMContentLoaded', () => navigate(pathName));
document.addEventListener('click', (e) => {
  // @ts-expect-error fix later
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
