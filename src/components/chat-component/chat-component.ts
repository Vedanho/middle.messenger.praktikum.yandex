import Block from '../../core/block';
import template from './chat-component.hbs?raw';

interface Props {
  onClick: () => void;
}

export default class ChatComponent extends Block {
  constructor(props: Props) {
    const { onClick } = props;
    super('li', {
      ...props,
      events: {
        click: onClick,
      },
    }, {
    });
  }

  render(): string {
    return template;
  }
}
