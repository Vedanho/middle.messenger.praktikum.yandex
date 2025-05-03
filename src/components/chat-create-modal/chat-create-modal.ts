import Block from '../../core/block';
import { Dialog } from '../dialog';
import { InputField } from '../input';

interface DialogProps {
  onClick: () => void;
}

class DialogBody extends Block {
  constructor() {
    super('div', {
      CreateChatInput: new InputField({
        isNeedLabel: true,
        label: 'Название чата',
        inputName: 'login',
        type: 'text',
        variant: 'underline',
      }),
    });
  }

  render(): string {
    return '{{{CreateChatInput}}}';
  }
}

export default class ChatCreateModal extends Block {
  constructor(props: DialogProps) {
    super('div', {
      ...props,
      Dialog: new Dialog({
        title: 'Создать чат',
        buttonLabel: 'Создать',
        submitOnClick: props.onClick,
        Body: new DialogBody(),
      }),
    });
  }

  render(): string {
    return '{{{ Dialog }}}';
  }
}
