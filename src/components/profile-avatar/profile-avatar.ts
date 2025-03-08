import Block from '../../core/block';
import { Button } from '../button';
import template from './profile-avatar.hbs?raw';

interface ProfileAvatarProps {
  onClick?: () => void;
  name?: string;
}

export default class ProfileAvatar extends Block {
  constructor(props: ProfileAvatarProps) {
    super('div', {
      ...props,
      Avatar: new Button({
        iconSrc: '../../../public/profile-avatar.png',
        iconWidth: '130',
        iconHeight: '130',
        altText: 'avatar',
        onClick: props.onClick,
        isIcon: true,
        buttonClassName: 'profile-avatar__button',
        variant: 'rounded',
        type: 'button',
      }),
    }, {
      className: 'profile-avatar',
    });
  }

  render(): string {
    return template;
  }
}
