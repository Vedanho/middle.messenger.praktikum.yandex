import Block from '../../core/block';

interface ButtonProps {
  onClick?: (event: MouseEvent) => void;
  label?: string;
  isIcon?: boolean;
  iconSrc?: string;
  iconWidth?: number;
  iconHeight?: number;
  type?: string;
  altText?: string;
  variant?: string;
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    const {
      type,
      label,
      variant,
      onClick,
    } = props;

    super('button', {
      ...props,
      events: {
        click: onClick,
      },
      label,
    }, {
      className: `button${variant ? ` button_${variant}` : ''}`,
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
