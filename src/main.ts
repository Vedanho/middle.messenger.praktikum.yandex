import Handlebars from 'handlebars';
import './styles/main.scss';
import * as Pages from './pages';
import * as Components from './components';
import { MESSAGES, PROFILE_INFO } from './constants';

const pages = {
  login: [Pages.LoginPage],
  regist: [Pages.RegistPage],
  chat: [Pages.ChatPage, {
    messages: MESSAGES,
    isShowModal: false,
  }],
  'chat-modal': [Pages.ChatPage, {
    messages: MESSAGES,
    isShowModal: true,
  }],
  profile: [Pages.ProfilePage, {
    profileInfo: PROFILE_INFO,
  }],
  'profile-change': [Pages.ProfileChangePage, {
    profileInfo: PROFILE_INFO,
    isChangeProfile: true,
  }],
  'change-password': [Pages.PasswordChangePage],
  'profile-modal': [Pages.ProfilePage, {
    profileInfo: PROFILE_INFO,
    isShowModal: true,
  }],
  'not-found': [Pages.NotFoundPage],
  'error-page': [Pages.ErrorPage],
};

const pathName = window.location.pathname.replace('/', '');

Object.entries(Components).forEach(([name, template]) => {
  Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
  // @ts-expect-error fix later
  const [source, context] = pages[page] || pages['not-found'];

  const container = document.getElementById('app')!;

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
