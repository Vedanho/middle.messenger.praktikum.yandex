import Block from '../../core/block';

interface ButtonProps {
  onClick?: (event: MouseEvent) => void;
  label?: string;
  isIcon?: boolean;
  iconSrc?: string;
  iconWidth?: string;
  iconHeight?: string;
  type?: string;
  altText?: string;
  variant?: string;
  buttonClassName?: string;
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    const {
      type,
      label,
      variant,
      onClick,
      buttonClassName = 'button_default',
    } = props;

    super('button', {
      ...props,
      events: {
        click: onClick,
      },
      label,
    }, {
      className: `button${variant ? ` button_${variant}` : ''} ${buttonClassName}`,
      attrs: {
        type: type || '',
      },
    });
  }

  render() {
    return `
      {{#if isIcon}}
        <img src="{{iconSrc}}"
         alt="{{altText}}" 
         class="button__icon" 
         width="{{iconWidth}}px" 
         height="{{iconHeight}}px" />
      {{/if}}
     {{#if label}}<span>{{label}}</span>{{/if}}
    `;
  }
}
