import Block from '../../core/block';
import { Button } from '../button';

export default class NavBack extends Block {
  constructor() {
    super('div', {
      NavBackButton: new Button({
        buttonClassName: 'arrow-button',
        variant: 'rounded',
        isIcon: true,
        iconWidth: '28',
        iconHeight: '28',
        iconSrc: '../../../arrow.svg',
      }),
    }, {
      className: 'nav-back',
    });
  }

  render(): string {
    return '{{{NavBackButton}}}';
  }
}
