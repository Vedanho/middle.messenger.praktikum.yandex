import Block from '../../core/block';
import { Dialog } from '../dialog';
import { InputField } from '../input';

class DialogBody extends Block {
  constructor() {
    super('div', {
      UserAddInput: new InputField({
        isNeedLabel: true,
        label: 'Логин',
        inputName: 'login',
        type: 'text',
        variant: 'underline',
      }),
    });
  }

  render(): string {
    return '{{{UserAddInput}}}';
  }
}

export default class UserAddModal extends Block {
  constructor(props) {
    super('div', {
      ...props,
      Dialog: new Dialog({
        title: 'Добавить пользователя',
        buttonLabel: 'Добавить',
        submitOnClick: props.onClick,
        Body: new DialogBody(),
      }),
    });
  }

  render(): string {
    return '{{{ Dialog }}}';
  }
}
