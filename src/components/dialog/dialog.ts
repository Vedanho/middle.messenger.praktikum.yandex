import Block from '../../core/block';
import { Button } from '../button';

interface DialogProps {
  title: string;
  buttonLabel: string;
  submitOnClick: () => void;
  Body: Block;
}

export default class Dialog extends Block {
  constructor(props: DialogProps) {
    const { buttonLabel, submitOnClick } = props;
    super('div', {
      ...props,
      className: 'dialog-container',
      SubmitButton: new Button({
        label: buttonLabel,
        variant: 'primary',
        onClick: submitOnClick,
      }),
    }, {
      className: 'dialog-overflow',
    });
  }

  render(): string {
    return `
      <dialog open class="dialog">
        <div class="dialog__header">
          <h2 class="dialog__title">{{title}}</h2>
        </div>
        <div class="dialog__body">
         {{{Body}}}
        </div>
        <div class="dialog__footer">
          {{{SubmitButton}}}
        </div>
      </dialog>
  `;
  }
}
