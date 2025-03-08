import Block from '../../core/block';
import template from './profile-info.hbs?raw';

export default class ProfileInfo extends Block {
  constructor() {
    super('div', {
      email: 'pochta@yandex.ru',
      login: 'ivanivanov',
      name: 'Badruddi',
      secondName: 'Badruddi',
      displayName: 'Badr',
      phone: '+7 (909) 967 30 30',
    }, {
      className: 'profile-info',
    });
  }

  render(): string {
    return template;
  }
}
