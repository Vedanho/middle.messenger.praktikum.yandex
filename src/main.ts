import Handlebars from 'handlebars';
import './styles/main.scss';
import * as Components from './components';
import * as Pages from './pages';
import Router from './route/Router';
import { Store, StoreEvents } from './core/Store';
import { ROUTES } from './route/routes';
import { getUser } from './services/auth';

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return;
  }

  Handlebars.registerPartial(name, template);
});

window.store = new Store({
  isLoading: false,
  user: null,
  chats: [],
  activeChat: {},
});

store.on(StoreEvents.Updated, (prevState, nextState) => {
  console.log('Prev state: ', prevState);
  console.log('Next state: ', nextState);
});
getUser();
const APP_ROOT_ELEMENT = '#app';

window.router = new Router(APP_ROOT_ELEMENT);
window.router.use(ROUTES.login, Pages.LoginPage);
window.router.use(ROUTES.registration, Pages.RegistPage);
window.router.use(ROUTES.chat, Pages.ChatPage);
window.router.use(ROUTES.profile, Pages.ProfilePage);
window.router.use(ROUTES.notFound, Pages.NotFoundPage);
window.router.start();
