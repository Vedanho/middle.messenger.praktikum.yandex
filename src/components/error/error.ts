import Block from '../../core/block';
import { ROUTES } from '../../route/routes';
import { Button } from '../button';
import template from './error.hbs?raw';

export default class ErrorContent extends Block {
  constructor(props: { title: string, description: string }) {
    super('div', {
      ...props,
      title: props.title,
      description: props.description,
      LinkButton: new Button({
        label: 'Назад к чатам',
        onClick: () => {
          window.router.go(ROUTES.chat);
        },
      }),
    }, {
      className: 'error',
    });
  }

  render() {
    return template;
  }
}
